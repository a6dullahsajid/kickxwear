"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }} 
      // Add the delay prop here (defaults to 0 if not provided)
      transition={{ duration: 0.6, ease: "easeOut", delay: delay }} 
    >
      {children}
    </motion.div>
  );
}