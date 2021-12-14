#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 colorA = vec3(0.985,0.644,0.268); // yellowish
    vec3 colorB = vec3(0.368,0.161,1.000); // bluish
    vec3 colorC = mix(0.3*colorA, colorA, st.x);
    
    float clmp1 = clamp(st.y + -0.172, 0., 1.);
    float clmp2 = clamp(st.x + 0.320, 0., 1.);
    vec3 color = mix(colorC, colorB, clmp2 * clmp1);
    clmp1 = clamp(st.y + 0.132, 0., 1.);
    clmp2 = clamp(st.x + 0.144, 0., 1.);
	color = mix(color, vec3(0.960,0.960,0.960), (1.0-clmp1) *(clmp2));
    
	gl_FragColor = vec4(color,1.0);
}
