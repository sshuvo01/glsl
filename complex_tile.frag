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
    
    const float PI = 3.1416;
    float pct1 = step(-PI/2., -a) * step(-PI/2., a);
    color = vec3(pct1);
    
    float radius = 0.4;
    float pct2 = 1.0 - step(radius, r);
    float pct3 = step(radius, r) * step(-PI/2., a) *  step(-PI/2., -a);
    
    color = vec3( pct1 + pct2 );
    
    if(a >= -PI/2. && a <= PI/2.0)
    {
        color = vec3(step(radius, r));
    }
    
    gl_FragColor = vec4(color, 1.0);
}
