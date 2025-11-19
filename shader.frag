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