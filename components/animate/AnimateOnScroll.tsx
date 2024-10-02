import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  styles?: any;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, delay = 0, styles, y = 50, x = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ overflow: "hidden", ...styles }}>
      <AnimatePresence>
        {isInView && (
          <motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0, y: y , x: x}}
            animate={{ opacity: 1, y: 0 , x: 0}}
            exit={{ opacity: 0, y: y , x: x}}
            transition={{ duration: 0.3, delay }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AnimateOnScroll;