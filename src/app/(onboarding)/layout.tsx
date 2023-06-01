import Image from 'next/image';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <span className='w-full flex items-center justify-center mb-12'>
        <Image
          className='pt-4'
          src='/***REMOVED***.svg'
          alt='Logo ***REMOVED***'
          width={26}
          height={31}
        />
      </span>
      <span className='w-full flex items-center justify-center'>
        <Image src='/logo.svg' alt='Logo' width={180} height={160} />
      </span>
      <main className='flex flex-col flex-grow'>
        <div className='flex-grow'>{children}</div>
        <span className='w-full flex items-center justify-center mt-7'>
          <Image
            src='/table.svg'
            alt='Table illustration'
            className='hidden md:block'
            width={638}
            height={377}
            priority
          />
        </span>
      </main>
    </>
  );
}
