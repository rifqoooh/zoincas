import { cn } from '@/lib/utilities';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  isDisabled?: boolean;
}

export const ShinyText = ({
  text,
  className,
  speed = 5,
  isDisabled = false,
}: ShinyTextProps) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn(
        'inline-block bg-clip-text text-[#b5b5b5a4]',
        !isDisabled && 'animate-shine',
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};
