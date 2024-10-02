import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimateOpacityProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimateOpacity = ({ children, delay }: AnimateOpacityProps) => (
  <section style={{ overflow: "hidden", width: '100%'  }}>
  <AnimatePresence>
    <motion.div
      style={{width: '100%' }}
      initial={{ opacity: 0 , y : 50}}
      animate={{ opacity: 1 , y : 0}}
      transition={{ duration: 0.4, delay, delayChildren: delay }}      
      exit={{ opacity: 0 , y : 50}}
    >
      {children}
    </motion.div>
  </AnimatePresence>
  </section>
);

export default AnimateOpacity;