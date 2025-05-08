import { useEffect, useRef } from 'react';
import { createParticles, animateParticles } from '../utils/particles';

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize particles
    const particles = createParticles(canvas.width, canvas.height);
    
    // Animation loop
    const animate = () => {
      animateParticles(ctx, canvas.width, canvas.height, particles, { x: mouseX, y: mouseY });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2563] via-[#1e47a8] to-[#3b82f6] animate-gradient-slow bg-gradient-size"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-3xl animate-float-delay"></div>
      <div className="absolute top-[30%] right-[5%] w-[25%] h-[25%] rounded-full bg-purple-500/10 blur-2xl animate-float-slow"></div>
      
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
    </div>
  );
};

export default Background;