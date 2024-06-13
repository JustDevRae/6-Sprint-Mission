import React, { ReactNode } from 'react';
import styles from '@/components/layout/Container/Container.module.css';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
