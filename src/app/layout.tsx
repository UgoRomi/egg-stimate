import LottiePlayer from '@/components/LottiePlayer';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'egg-stimate',
  description: 'Delightfully fun planning poker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='bg-[#FCF9F7] text-gray-800 min-h-screen'>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        <Toaster position='bottom-right' />
        <LottiePlayer />
      </body>
    </html>
  );
}
