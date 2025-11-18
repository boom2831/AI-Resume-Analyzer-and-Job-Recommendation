// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/utils/cn"; // If you don’t have cn() function, I’ll provide one below.

// export const PinContainer = ({
//   children,
//   title,
//   href,
//   className,
//   containerClassName,
// }: {
//   children: React.ReactNode;
//   title?: string;
//   href?: string;
//   className?: string;
//   containerClassName?: string;
// }) => {
//   const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

//   const onMouseEnter = () => setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
//   const onMouseLeave = () => setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");

//   return (
//     <a
//       className={cn("relative group/pin z-50 cursor-pointer", containerClassName)}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       href={href || "#"}
//     >
//       <div style={{ perspective: "1000px", transform: "rotateX(70deg)" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div style={{ transform }} className="absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/10 transition duration-700 overflow-hidden">
//           <div className={cn("relative z-50", className)}>{children}</div>
//         </div>
//       </div>
//       <PinPerspective title={title} href={href} />
//     </a>
//   );
// };

// export const PinPerspective = ({ title, href }: { title?: string; href?: string }) => (
//   <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
//     <div className="absolute top-0 inset-x-0 flex justify-center">
//       <a href={href} target="_blank" className="relative z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
//         <span className="text-white text-xs font-bold">{title}</span>
//       </a>
//     </div>
//     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//       {[0, 2, 4].map((delay) => (
//         <motion.div
//           key={delay}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }}
//           transition={{ duration: 6, repeat: Infinity, delay }}
//           className="absolute h-[11.25rem] w-[11.25rem] rounded-full bg-sky-500/10 shadow-[0_8px_16px_rgb(0_0_0/0.4)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//         />
//       ))}
//     </div>
//   </motion.div>
// );
import React, { useState } from "react";
import { motion } from "framer-motion";

interface PinContainerProps {
  children: React.ReactNode;
  title: string;
  href?: string;
  className?: string;
}

export const PinContainer: React.FC<PinContainerProps> = ({ 
  children, 
  title, 
  href = "#", 
  className = "" 
}) => {
  const [transform, setTransform] = useState<string>(
    "translate(-50%,-50%) rotateX(0deg) rotateY(0deg) scale(1)"
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onMouseEnter = (): void => {
    setTransform("translate(-50%,-50%) rotateX(10deg) rotateY(-5deg) scale(0.98)");
    setIsHovered(true);
  };
  
  const onMouseLeave = (): void => {
    setTransform("translate(-50%,-50%) rotateX(0deg) rotateY(0deg) scale(1)");
    setIsHovered(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = (e.clientX - centerX) / 10;
    const rotateX = -(e.clientY - centerY) / 10;
    
    if (isHovered) {
      setTransform(
        `translate(-50%,-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`
      );
    }
  };

  return (
    <div
      className={`relative group/pin z-50 cursor-pointer ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0_/_0.4)] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          {children}
        </div>
      </div>
      
      {/* Pin */}
      <motion.div
        className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500"
        initial={{ opacity: 0, scale: 0 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </motion.div>

      {/* Floating label */}
      <motion.div
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 opacity-0 group-hover/pin:opacity-100 transition duration-500"
        initial={{ y: 10, opacity: 0 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
      >
        <div className="bg-black/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
          {title}
        </div>
      </motion.div>

      {/* Animated rings */}
      <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1.5, 3].map((delay) => (
            <motion.div
              key={delay}
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? { 
                opacity: [0, 0.6, 0.3, 0], 
                scale: [0.5, 1.2, 1.5, 2] 
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay,
                ease: "easeOut"
              }}
              className="absolute h-32 w-32 rounded-full bg-blue-500/10 border border-blue-500/20"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};