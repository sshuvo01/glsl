// Author: @patriciogv
// Title: 4 cells voronoi

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
	st = st *2.0 - 1.0;
    vec3 color = vec3(1.0);

    // Cell positions
    const int size = 55;
    vec2 point[size];
    
    const float TWOPI = 2.0 * 3.1416;
    const int bA = 30;
    float interval = TWOPI / float(bA);
    float angle = 0.0;
    float r = 0.940 ;
    for(int i = 0; i < bA; i++)
    {
        point[i].x = r *sin(angle );
        point[i].y = r *cos(angle);
        angle += interval;
    }
    // 
    const int bB = 20;
    interval = TWOPI / float(bB);
    angle = 0.344;
    r = 0.80;
    for(int i = bA; i < bA + bB; i++)
    {
        point[i].x = r *sin(angle);
        point[i].y = r *cos(angle);
        angle += interval;
    }
    // random points
    point[50] = vec2(0.170,0.380);
    point[51] = vec2(-0.130,-0.370);
    point[52] = vec2(-0.120,0.330);
    point[53] = vec2(0.410,-0.100);
    point[54] = vec2(0.140,0.220);

    float m_dist = 1.;  // minimum distance
    vec2 m_point;        // minimum position

    // Iterate through the points positions
    bool equalDist = false;
    int minDistIdx = 0;
    for (int i = 0; i < size; i++) {
        float dist = distance(st, point[i]);
        if ( dist < m_dist ) {
            // Keep the closer distance
            m_dist = dist;

            // Kepp the position of the closer point
            m_point = point[i];
            minDistIdx = i;
        }
    }
    float threshold = 0.02;
    for(int i = 0; i < size; i++)
    {
    	for(int j = 0; j < size; j++)
        {
            if(i == j) continue;
            float d1 = distance(point[i], st);
            float d2 = distance(point[j], st);
            
            if(abs(d1 - d2) < threshold)
            {
                if(minDistIdx == i || minDistIdx == j)
                {
                	equalDist = true;   
                    break;
                }
                
            }
            
        }
    }

    // Add distance field to closest point center
    color += m_dist*0.584;
    // Draw point center
    color -= 1.-step(.02, m_dist);
	
    if(equalDist)
    {
        color = vec3(0.);
    }
    
    gl_FragColor = vec4(color,1.0);
}
