# Shader: Flor Cósmica Radiante

## Autor

Carlos Ruano Ramos

## Descripción

Shader de fragmentos generativo que crea un patrón de flor radial animada con ondas concéntricas y colores dinámicos. Optimizado para tiny code (< 512 bytes).

## Código
```glsl
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){
vec2 p=gl_FragCoord.xy/u_resolution-.5;
p.x*=u_resolution.x/u_resolution.y;
float t=u_time*.3,d=length(p);
float a=atan(p.y,p.x);
float r=.3+.1*sin(a*5.+t);
float c=smoothstep(r+.02,r,d);
vec3 col=vec3(.5+.5*sin(t+a),.3+.3*cos(t*1.5),d);
col*=c+.2*sin(d*20.-t*3.);
gl_FragColor=vec4(col,1.);
}
```

**Tamaño:** ~370 bytes

## Motivación

La motivación detrás de este shader surge de la fascinación por los patrones orgánicos que se encuentran en la naturaleza, específicamente las estructuras radiales presentes en flores, estrellas de mar y mandalas.

Se buscó demostrar cómo principios matemáticos simples (coordenadas polares, funciones trigonométricas) pueden producir resultados complejos y estéticamente atractivos, creando un patrón generativo visual y eficiente en código.

## Desarrollo Técnico

### 1. Sistema de Coordenadas Polares

El primer paso fundamental fue transformar las coordenadas cartesianas del espacio de pantalla a coordenadas polares:
```glsl
vec2 p=gl_FragCoord.xy/u_resolution-.5;
p.x*=u_resolution.x/u_resolution.y;
float d=length(p);
float a=atan(p.y,p.x);
```

**Proceso:**
- **Normalización y centrado:** `gl_FragCoord.xy/u_resolution-.5` centra el origen en el medio de la pantalla
- **Corrección de aspecto:** `p.x*=u_resolution.x/u_resolution.y` evita distorsión en pantallas no cuadradas
- **Distancia radial:** `d=length(p)` calcula la distancia desde el centro
- **Ángulo:** `a=atan(p.y,p.x)` obtiene el ángulo polar, fundamental para la simetría radial

Esta transformación es clave según *The Book of Shaders, capítulo sobre Formas* [1], donde se explica cómo las coordenadas polares simplifican la creación de patrones circulares y radiales.

### 2. Generación del Patrón de Pétalos

El corazón del diseño es la función que define los pétalos:
```glsl
float t=u_time*.3;
float r=.3+.1*sin(a*5.+t);
```

**Componentes:**
- **Modulación temporal:** `t=u_time*.3` ralentiza la animación para un efecto más contemplativo
- **Función de radio variable:** `sin(a*5.+t)` crea 5 pétalos (el multiplicador `5` define el número de lóbulos)
- **Amplitud:** `.3+.1*sin(...)` establece un radio base de 0.3 con variación de ±0.1

Esta técnica está inspirada en los ejemplos de *funciones de modelado de Iñigo Quilez* [2], quien demuestra cómo las funciones sinusoidales pueden modular formas geométricas básicas para crear patrones orgánicos.

### 3. Sistema de Difuminado Suave (Anti-aliasing)

Para evitar bordes duros y pixelados:
```glsl
float c=smoothstep(r+.02,r,d);
```

La función `smoothstep` crea una transición suave entre el interior y exterior de la forma. Según la documentación de GLSL y ejemplos en Shadertoy [3], esta función es esencial para anti-aliasing en shaders basados en funciones de distancia, proporcionando bordes suaves sin necesidad de técnicas costosas de muestreo múltiple.

### 4. Esquema de Color Dinámico

El sistema de color combina tres elementos:
```glsl
vec3 col=vec3(.5+.5*sin(t+a),.3+.3*cos(t*1.5),d);
col*=c+.2*sin(d*20.-t*3.);
```

**Análisis por canal:**
- **Canal Rojo:** `.5+.5*sin(t+a)` varía según el ángulo y tiempo, creando gradientes radiales que rotan
- **Canal Verde:** `.3+.3*cos(t*1.5)` oscila a diferente frecuencia temporal para variedad cromática
- **Canal Azul:** `d` usa directamente la distancia, creando profundidad desde el centro hacia afuera
- **Ondas concéntricas:** `.2*sin(d*20.-t*3.)` añade textura con 20 anillos que se mueven radialmente hacia afuera

Esta técnica de color procedimental está documentada en *The Book of Shaders, capítulo sobre Color* [4], donde se explica cómo combinar funciones periódicas para generar paletas dinámicas sin necesidad de texturas precalculadas.

### 5. Optimización para Tiny Code

Para cumplir con el límite de 512 bytes, se aplicaron las siguientes técnicas de compresión:

- **Nombres de variables cortos:** uso de un solo carácter (`p`, `t`, `d`, `a`, `c`)
- **Eliminación de espacios:** densificación del código sin afectar legibilidad del compilador
- **Reutilización de cálculos:** el valor `d` sirve tanto para la máscara de forma como para el canal azul del color
- **Constantes literales abreviadas:** notación `.3` en lugar de `0.3`
- **Declaraciones múltiples:** `float t=u_time*.3,d=length(p);` agrupa declaraciones
- **Eliminación de paréntesis opcionales:** en operaciones con precedencia clara

Estas técnicas son estándar en la comunidad de *size coding* [5], especialmente en competiciones como las Tiny Code competitions de Shadertoy y demoscene.

## Características Visuales

- Patrón de flor con 5 pétalos que rotan suavemente
- Gradientes de color que evolucionan en el tiempo
- Ondas concéntricas animadas que se expanden desde el centro
- Paleta de colores cálidos (rojos, naranjas) a fríos (azules)
- Animación fluida y continua sin repeticiones obvias

## Requisitos Técnicos

- Compatible con GLSL ES (WebGL)
- Uniforms requeridos:
  - `u_resolution` (vec2): resolución de la pantalla
  - `u_time` (float): tiempo en segundos
- Ejecutable en [The Book of Shaders Editor](https://thebookofshaders.com/edit.php)

## Ejecución

1. Acceder a [The Book of Shaders Editor](https://thebookofshaders.com/edit.php)
2. Copiar el código completo del shader
3. Pegar en el editor
4. El patrón se renderizará automáticamente

## Resultado Final

El shader produce un patrón generativo de aproximadamente **400 bytes** que cumple con los requisitos establecidos:

- Menos de 512 bytes
- Ejecutable en The Book of Shaders
