type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

type MousePosition = {
  x: number;
  y: number;
};

export const createParticles = (width: number, height: number, count = 100): Particle[] => {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * width;
    const y = Math.random() * height;
    const speedX = Math.random() * 0.5 - 0.25;
    const speedY = Math.random() * 0.5 - 0.25;
    const opacity = Math.random() * 0.5 + 0.2;
    const colors = ['rgba(255, 255, 255,', 'rgba(245, 243, 255,', 'rgba(236, 226, 255,'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particles.push({
      x,
      y,
      size,
      speedX,
      speedY,
      opacity,
      color
    });
  }
  
  return particles;
};

export const animateParticles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: Particle[],
  mouse: MousePosition
) => {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(particle => {
    // Calculate distance from mouse
    const dx = mouse.x - particle.x;
    const dy = mouse.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;
    
    // Move particles away from mouse slightly
    if (distance < maxDistance && mouse.x !== 0 && mouse.y !== 0) {
      const force = (maxDistance - distance) / maxDistance;
      const directionX = dx / distance || 0;
      const directionY = dy / distance || 0;
      
      particle.x -= directionX * force * 1;
      particle.y -= directionY * force * 1;
    }
    
    // Update position
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Wrap around edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `${particle.color} ${particle.opacity})`;
    ctx.fill();
    
    // Connect nearby particles with lines
    particles.forEach(p2 => {
      const dx = particle.x - p2.x;
      const dy = particle.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });
};