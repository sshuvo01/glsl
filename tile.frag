#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec2 st2 = st;
	
    float nx = 3.0;
    float ny = 3.0;
    st *= vec2(nx, ny);
    st = fract(st);
    
    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*1.7;
    float a = atan(pos.y, pos.x);
    
    float f = abs(cos(a*2.5 + sin(u_time)))*.5+.3;
    float lul = 1.0 - step(f, r);
    float kek = step(0.108, r);
    float foo = kek * lul;
    
    color = vec3( foo  , abs(sin(u_time + st2.x)  ), abs(cos(u_time + st2.y))  );
    
  if(foo <= 0.)
    {
        color = vec3(0.029,0.102,1.000);
    }
    
    gl_FragColor = vec4(color, 1.0);
}
