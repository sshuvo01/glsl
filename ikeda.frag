#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 st01 = st;
    
    st.x *= 50.832; 
    st.x += sin(u_time) * 10.0 ;
    vec2 ipos = floor(st);  
	float noise = random(ipos);
    float c = step(noise, 0.508);

    if(st01.y < 0.5)
    {
        st.x *= 3.0 * abs(sin(u_time));
    	st.x += u_time * 10.696 ;
    	ipos = floor(st);
    	noise = random(ipos);
    	c = step(noise,  0.5);
    }
    vec3 color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}
