import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 h-screen gap-7">
      <h1 className="text-center text-8xl font-mono text-black">
        The Message Board
      </h1>
      <h2 className="text-center text-xl font-mono text-gray-800">
        Click on{' '}
        <Link href={'/messages'} className="underline">
          messages
        </Link>{' '}
        to start...
      </h2>
    </div>
  );
}
