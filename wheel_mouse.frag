#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(1.0);

    vec2 st2 = st;
    st *= 2.0;
    float dist = distance(vec2(1.0), st);
    vec2 toCenter = vec2(1.0) - st;
    float angle = atan(toCenter.y, toCenter.x);
    angle = (angle / TWO_PI) + 0.5;
    
    if(dist <= 1.0)
    {
        vec3 hsb = vec3(1.0, angle, dist);
        color = hsb2rgb(hsb);
    }
    
    vec2 mouseSt = u_mouse / u_resolution;
    mouseSt *= 2.0;
    float mouseDist = distance(vec2(1.0), mouseSt);
    
    if(mouseDist <= 1.0 )
    {
        vec3 hsb = vec3(1.0, angle -  mouseSt.x * mouseSt.y, mouseDist);
        color = hsb2rgb(hsb);
    }
    
    
    gl_FragColor = vec4(color,1.0);
}
