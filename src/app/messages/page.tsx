import React from 'react';
import Messages from './messages';

function page() {
  return (
    <div className="bg-amber-100 h-screen">
      <div>
        <h1 className="text-center text-4xl font-mono p-5 ">
          Mensajes recientes
        </h1>
        <Messages />
        <h2 className="text-center m-5"></h2>
      </div>
    </div>
  );
}

export default page;
