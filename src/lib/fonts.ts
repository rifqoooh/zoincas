import { cn } from '@/lib/utilities';
import { Poppins, Roboto_Mono, Space_Grotesk } from 'next/font/google';

const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' });
const spaceGroteskFont = Space_Grotesk({ subsets: ['latin'], weight: '400' });
const robotoMonoFont = Roboto_Mono({ subsets: ['latin'], weight: '400' });

export const poppins = cn(
  poppinsFont.className,
  'touch-manipulation font-sans antialiased'
);

export const spaceGrotesk = cn(
  spaceGroteskFont.className,
  'touch-manipulation font-sans antialiased'
);

export const robotoMono = cn(
  robotoMonoFont.className,
  'touch-manipulation font-mono antialiased'
);
