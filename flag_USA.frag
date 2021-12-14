#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

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

vec3 stars(vec2 st)
{
     float d = 0.0;
    float nx = 12.5;
    float ny = 19.136;
    st *= vec2(nx, ny);
    st = fract(st);
  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = 3;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
    
  a += atan(st.x, st.y) + TWO_PI;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
float foo = 1.0-step(0.480,d);
  return vec3(1.0-step(0.480,d));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float width = 0.0;
    
    vec3 colorRed = vec3(178, 34, 52) / 255.;
    vec3 colorBlue = vec3(60, 59, 110) / 255.;
    vec3 colorBG = vec3(1.0);
    vec3 color = colorBG;
    
    // USA flag
    float d = 1.0/13.0;
    float y1 = 0.0;
    float y2 = y1 + d;
    float pct;
	
    for(int i = 0; i < 7; i++)
    {
    	pct = rect(st, 0.0, 1.0, y1, y2, width);
    	if(pct >= 0.0)
    	{
        	color = pct * colorRed;
    	}
        
        y1 += d * 2.0;
        y2 = y1 + d;
    }
    
    vec3 color2 = stars(st);
    if(st.x < 0.400 && st.y > d*6.0)
    {
		color = color2;
		if(color == vec3 (0.0) )
		{
			color = colorBlue;
		}
    }
    
    gl_FragColor = vec4(color,1.0);
}
