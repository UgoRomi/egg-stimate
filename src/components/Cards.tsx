'use client';
import { vote } from '@/app/_actions';
import { PropsWithChildren, useTransition } from 'react';

interface CardProps extends PropsWithChildren {
  value: number;
}

const Card: React.FC<CardProps> = ({ children, value }) => {
  let [isPending, startTransition] = useTransition();
  return (
    <div
      className='bg-slate-200 w-full h-full rounded-md flex items-center justify-center'
      onClick={() => startTransition(() => vote(value))}
    >
      {children}
    </div>
  );
};

export function Cards() {
  return (
    <div className='bg-slate-100 grid grid-cols-3 gap-8 p-4'>
      <Card value={0}>Card 1</Card>
      <Card value={1}>Card 2</Card>
      <Card value={2}>Card 3</Card>
      <Card value={3}>Card 4</Card>
      <Card value={4}>Card 5</Card>
      <Card value={5}>Card 6</Card>
      <Card value={6}>Card 7</Card>
      <Card value={7}>Card 8</Card>
      <Card value={8}>Card 9</Card>
    </div>
  );
}
