#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st, in vec2 randVec, in float randFloat) {
    return fract(sin(dot(st.xy,
                         randVec))
                 * randFloat);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st, in vec2 randVec, in float randFloat) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    
    float a = random(i, randVec, randFloat);
    float b = random(i + vec2(1.0, 0.0),  randVec, randFloat);
    float c = random(i + vec2(0.0, 1.0), randVec, randFloat);
    float d = random(i + vec2(1.0, 1.0), randVec, randFloat);

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st01 = st;
	st.x *= 3.0;
    st = fract(st);
    
    // Scale the coordinate system to see
    // some noise in action
    float xx = 1.544, yy = 3.296;
    vec2 pos = vec2(st* vec2(xx, yy));
    pos.x += 3.216;
    pos.y += 1.360;
	
    vec3 color = vec3(1.);
    // Use the noise function
    float n = 1.0 - noise(pos, vec2(0.250,0.660), 43758.649);
	
    vec2 bl = smoothstep(vec2(0.0), vec2(0.220,0.070)  ,st);
    float pct = bl.x * bl.y;

    vec2 tr = smoothstep(vec2(0.0), vec2( noise(st, vec2(0.250,0.660), 43758.649) *0.212 ),1.0-st);
    tr = smoothstep(vec2(0.0), vec2(0.120,0.150), 1.0-st);
    pct *= tr.x * tr.y;
    
    vec3 red1 = vec3(1.0, 0.0, 0.0);
    vec3 red2 = vec3(0.900,0.172,0.095);
    vec3 yellow = vec3(0.925,0.691,0.191);
    vec3 background = vec3(0.900,0.172,0.095);
    vec3 baseColor = red1;
    float tile = 1.0/3.0;
    
	float noisy = n;
    noisy *= 1.0;
    if(st01.x > tile*1.0 && st01.x < tile*2.0 ) 
    {
        baseColor = red2;
        noisy = 1.0 - noise(pos, vec2(0.370,0.600), 43758.745);
        noisy *= 0.908;
    }
    
    if(st01.x > tile*2.0) 
    {
        baseColor = yellow;
        noisy = 1.0 - noise(pos, vec2(0.370,0.350), 43758.857);
        noisy *= 1.244;
    }
    
    color = vec3(pct*noisy)*baseColor;
    float th = 0.2;
    if(color.r <= th && color.g <= th && color.b <= th)
    {
        color = mix(background, color, 0.604*noise(st01*7.664, vec2(8.450,19.640), 43758.537));
    }
    gl_FragColor = vec4( color, 1.0);
}
