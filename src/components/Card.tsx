import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface CardProps {
  value: number;
}

export const Card: React.FC<CardProps> = ({ value }) => {
  return (
    <div className='w-[93px] h-[146px]'>
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
