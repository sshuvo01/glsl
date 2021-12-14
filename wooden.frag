// Author @kyndinfo - 2016
// http://www.kynd.info
// Title: Wood

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitud = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitud * noise(st);
        st *= 2.;
        amplitud *= 0.628;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    
    float v0 = smoothstep(-1.0, 2.000, sin(st.x * .616 + fbm(st.xx * vec2(100.0, 12.0)) * 8.0));
    float v1 = random(st);
    float v2 = noise(st * vec2(200.0, 14.0)) - noise(st * vec2(1000.0, 64.0));
    vec3 col1 = vec3(0.860,0.806,0.574);
    col1 = mix(col1, vec3(0.390,0.265,0.192), v0);
    col1 = mix(col1, vec3(0.930,0.493,0.502), v1 * 0.5);
    col1 -= v2 * 0.2;
    
    st *= 2.0;
    v0 = smoothstep(-1.0, 1.0, sin(st.y * 14.376 + fbm(st.xx * vec2(100.0, 12.0)) * 8.0));
    v1 = random(st);
    v2 = noise(st * vec2(200.0, 14.0)) - noise(st * vec2(0.990,0.890));

    vec3 col = vec3(0.860,0.806,0.574);
    col = mix(col, vec3(0.390,0.265,0.192), abs(sin(v0 * 0.340)) );
    col = mix(col, vec3(0.930,0.493,0.502), v1 * 0.5);
    col -= v2 * 0.264;
    
    gl_FragColor = vec4( mix(col1, col, 0.516) , 1.0);
}
