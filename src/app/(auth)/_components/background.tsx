import { LiquidChrome } from '@/components/liquid-chrome';

export function Background() {
  return (
    <>
      <div className="absolute inset-0">
        <LiquidChrome
          className="overflow-hidden rounded-xl"
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.3}
          amplitude={0.5}
          interactive={false}
        />
      </div>

      <div className="relative">
        <p className="font-medium text-lg">zoincas</p>
        <p className="text-sm">Rich mindset manage their money.</p>
      </div>
    </>
  );
}
