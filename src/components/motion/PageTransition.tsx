'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Soft cross-fade + lift between routes, keyed on the pathname. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {children}
    </motion.main>
  );
}
