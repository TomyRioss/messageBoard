import React from 'react';
import Messages from './messages';
import Link from 'next/link';

function page() {
  return (
    <div>
      <h1 className="text-center">Mensajes recientes</h1>
      <Messages />

      <h2 className="text-center m-5"></h2>
    </div>
  );
}

export default page;
