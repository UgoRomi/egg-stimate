'use client';

import { useStore } from '@/lib/zustand';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LottiePlayer() {
  const lottie = useStore((state) => state.lottie);
  const setLottie = useStore((state) => state.setLottie);
  if (!lottie) return null;
  return (
    <Player
      onEvent={(e) => {
        if (e === 'complete') {
          setLottie(undefined);
        }
      }}
      autoplay
      src={lottie}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
