import { cn } from '@/lib/utilities';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' });

export const poppins = cn(
  poppinsFont.className,
  'touch-manipulation font-sans antialiased'
);
