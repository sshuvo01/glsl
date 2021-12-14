#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 st, float x1, float x2, float y1, float y2, float width)
{
    float ax = step(x1, st.x) - step(x2, st.x);
    float bx = step(x2 + width, st.x);
    float cx = step(0.0, st.x) - step(x1-width, st.x);
    float pctx = ax + bx + cx ;
    
    float ay = step(y1, st.y) - step(y2, st.y);
    float by = step(y2 + width, st.y);
    float cy = step(0.0, st.y) - step(y1-width, st.y);
    float pcty = ay + by + cy ;
    
    float pct = pctx * pcty;
    pct += step(x2 + width, st.x);
	pct += step(y2 + width, st.y);
    pct += step(0.0, st.x) - step(x1-width, st.x);
    pct += step(0.0, st.y) - step(y1-width, st.y);
    
    // return a negative value if st is outside the rect
    if(st.x > x2 + width)
        return -1.0;
    if(st.x < x1 -width)
        return -1.0;
    if(st.y > y2 + width)
        return -1.0;
    if(st.y < y1 - width)
        return -1.0;
    
    return pct;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float width = 0.025;
    
    vec3 colorRed = vec3(1.000,0.040,0.049);
    vec3 colorYellow = vec3(1.0,1.0,0.0);
    vec3 colorBlue = vec3(0.033,0.110,1.000);
    vec3 colorBG = vec3(1.000,0.779,0.442);
    vec3 color = colorBG;
    
	float pct = rect(st, -0.072, 0.05, 0.772, 1.012, width);
    if(pct >= 0.0)
    {
        color = pct * colorRed;
    }
    pct = rect(st, -0.072, 0.05, 0.5, 0.75, width);
    if(pct >= 0.0)
    {
    	color = pct * colorRed;
    }
    pct = rect(st, 0.076, 0.232, 0.780, 1.060, width);
    if(pct >= 0.0)
    {
    	color = pct * colorRed;
    }
    pct = rect(st, 0.076, 0.232, 0.500, 0.748, width);
    if(pct >= 0.0)
    {
    	color = pct * colorRed;
    }
    pct = rect(st, 0.964, 1.128, 0.500, 0.748, width);
    if(pct >= 0.0)
    {
    	color = pct * colorYellow;
    }
    pct = rect(st, 0.964, 1.096, 0.780, 1.060, width);
    if(pct >= 0.0)
    {
    	color = pct * colorYellow;
    }
    pct = rect(st, 0.964, 1.096, -0.100, 0.108, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBlue;
    }
    pct = rect(st, 0.820, 0.936, -0.100, 0.108, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBlue;
    }
    pct = rect(st, 0.820, 0.936, 0.132, 1.092, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBG;
    }
    pct = rect(st, 0.228, 0.800, 0.132, 1.092, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBG;
    }
    pct = rect(st, 0.228, 0.800, 0.500, 0.748, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBG;
    }
    pct = rect(st, 0.828, 0.936, 0.500, 0.748, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBG;
    }
    pct = rect(st, -0.076, 0.200, -0.036, 0.476, width);
    if(pct >= 0.0)
    {
    	color = pct * colorBG;
    }

    gl_FragColor = vec4(color,1.0);
}
