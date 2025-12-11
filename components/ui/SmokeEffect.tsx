
import React, { useRef, useEffect } from 'react';

export const SmokeEffect: React.FC<{ opacity?: number }> = ({ opacity = 0.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Premium "Ink Plume" Effect
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // --- Noise Functions ---
      float random (in vec2 _st) {
        return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      #define NUM_OCTAVES 5

      float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        
        // Correct Aspect Ratio to ensure circular shapes
        vec2 p = st;
        p.x = (p.x - 0.5) * (u_resolution.x / u_resolution.y); 

        // --- Flow Dynamics ---
        vec2 flow = p;
        
        // Slower, majestic upward movement
        flow.y -= u_time * 0.05; 
        
        // --- Domain Warping (The Ink Swirl) ---
        // Warping the coordinate space itself creates the fluid look
        vec2 q = vec2(0.);
        q.x = fbm( flow + 0.1 * u_time );
        q.y = fbm( flow + vec2(1.0) );

        vec2 r = vec2(0.);
        r.x = fbm( flow + 1.0*q + vec2(1.7,9.2) + 0.15*u_time );
        r.y = fbm( flow + 1.0*q + vec2(8.3,2.8) + 0.126*u_time );

        float f = fbm(flow + r);

        // --- Shape Masking (The Plume) ---
        // Let's use raw 'p' where y goes from 0 to 1.
        
        float yRel = st.y; 
        
        // Plume Shape Calculation
        // INCREASED SPREAD: Base 3.0 to cover FULL WIDTH
        float spread = 3.0 + (yRel * 1.0); 
        
        // Distance calc
        float dist = length(vec2(p.x / spread, (yRel * 0.5) + 0.05));
        
        // Mask Logic
        // smoothstep to 1.5 allows edges to be very soft and far out
        float mask = 1.0 - smoothstep(0.0, 1.5, dist);
        
        // Fade out at the very top
        mask *= smoothstep(1.0, 0.4, st.y);
        
        // Add noise turbulence to the mask edges so it looks wispy
        mask += (f - 0.5) * 0.5 * st.y; // More turbulence higher up
        mask = clamp(mask, 0.0, 1.0);
        
        // --- Composition ---
        float density = f * mask;
        
        // High Contrast for "Ink" look
        density = smoothstep(0.1, 0.6, density);

        // --- Colors ---
        vec3 bg = vec3(1.0); // Pure White
        
        // Premium "Half White / Light Orange" Palette
        vec3 inkDeep = vec3(0.35, 0.35, 0.4);    // Slate Grey (Shadows/Structure)
        vec3 inkLight = vec3(0.9, 0.92, 0.95);   // Silver/White (The "Half White")
        vec3 inkAccent = vec3(1.0, 0.65, 0.2);   // Vibrant Light Orange (Accent)
        
        // Gradient mixing based on noise values
        vec3 smokeColor = mix(inkDeep, inkLight, r.x);
        smokeColor = mix(smokeColor, inkAccent, r.y);
        
        // Final Mix: White BG blending into Ink based on density
        vec3 finalColor = mix(bg, smokeColor, density * 0.95);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const timeUniformLocation = gl.getUniformLocation(program, "u_time");

    let startTime = Date.now();

    const render = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, (Date.now() - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
      style={{ opacity }}
    />
  );
};
