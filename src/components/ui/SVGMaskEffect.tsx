import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SVGMaskEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const SVGMaskEffect: React.FC<SVGMaskEffectProps> = ({ 
  children, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    if (isHovered && containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* SVG Mask Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="black" />
              <motion.circle
                cx={mousePosition.x}
                cy={mousePosition.y}
                r={isHovered ? 150 : 0}
                fill="white"
                animate={{ r: isHovered ? 150 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </mask>
            
            {/* Gradient definitions */}
            <radialGradient id="spotlight-gradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
            </radialGradient>
            
            <radialGradient id="spotlight-border" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          {/* Spotlight effect */}
          <motion.circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r={isHovered ? 120 : 0}
            fill="url(#spotlight-gradient)"
            mask="url(#spotlight-mask)"
            animate={{ r: isHovered ? 120 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Spotlight border */}
          <motion.circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r={isHovered ? 150 : 0}
            fill="none"
            stroke="url(#spotlight-border)"
            strokeWidth="2"
            animate={{ r: isHovered ? 150 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Additional ripple effect */}
          {isHovered && (
            <motion.circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r={0}
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              animate={{ r: [0, 200], opacity: [0.5, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut" 
              }}
            />
          )}
        </svg>
      </div>
      
      {/* Content with mask effect overlay */}
      <div className="relative z-20">
        {children}
      </div>
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>
    </motion.div>
  );
};