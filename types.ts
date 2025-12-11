
import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface BentoItemProps extends BaseProps {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  image?: string;
  dark?: boolean;
  color?: string; // Added for colorful accents
}
