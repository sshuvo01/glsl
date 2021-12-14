#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 rainbowColors[7];

void InitRainbowColors()
{
 	rainbowColors[0] = vec3(255., 0., 0.) / 255.; // red
    rainbowColors[1] = vec3(255., 127., 0.) / 255.; // orange
    rainbowColors[2] = vec3(255., 255., 0.) / 255.; // yellow
    rainbowColors[3] = vec3(0., 255., 0.) / 255.; // green
    rainbowColors[4] = vec3(0., 0., 255.) / 255.; // blue
    rainbowColors[5] = vec3(75., 0., 130.) / 255.; // indigo
    rainbowColors[6] = vec3(148., 0., 211.) / 255.; // violet
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    InitRainbowColors();
    
    vec3 color = vec3(0.0);
    float ss = -0.200;
    float dist = distance(vec2(ss), st);

    for(int i = 0; i < 7; i++)
    {
        dist = distance(vec2(ss), st);
        dist = smoothstep(0.8, 0.9, dist) - smoothstep(0.9, 1.0, dist);
    
    color += dist * rainbowColors[i];
        ss += 0.045;
    }
    
    gl_FragColor = vec4(color,1.0);
}
