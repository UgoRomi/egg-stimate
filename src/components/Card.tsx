import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { cn } from '@/lib/utils';

interface CardProps {
  value: number;
  size?: 'medium' | 'large';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  value,
  size = 'medium',
  className,
}) => {
  const sizeVariants = {
    medium: 'w-[93px] h-[146px]',
    large: 'w-[150px] h-[234px]',
  };
  return (
    <div className={cn(sizeVariants[size], className)}>
      <AspectRatio.Root ratio={93 / 146}>
        <Image
          src={`/cards/${value}.svg`}
          alt={`Scrum poker card ${value}`}
          fill
        />
      </AspectRatio.Root>
    </div>
  );
};
