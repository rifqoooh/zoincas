import { cn } from '@/lib/utilities';
import { Poppins, Space_Grotesk } from 'next/font/google';

const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' });

export const poppins = cn(
  poppinsFont.className,
  'touch-manipulation font-sans antialiased'
);

const spaceGroteskFont = Space_Grotesk({ subsets: ['latin'], weight: '400' });

export const spaceGrotesk = cn(
  spaceGroteskFont.className,
  'touch-manipulation font-sans antialiased'
);
