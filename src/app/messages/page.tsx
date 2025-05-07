import React from 'react';
import Messages from './messages';

function page() {
  return (
    <div className="bg-amber-100 h-screen">
      <header>
        <h1 className="text-center text-4xl font-mono p-5 text-black">
          Mensajes recientes
        </h1>
        <h2 className="text-lg text-wrap font-mono text-center text-gray-500 p-2 mt-2">
          *La base de datos entra en descanso después de una hora sin
          peticiones, sí no recibes los datos vuelve a intentarlo dentro de
          varios minutos.
        </h2>
      </header>
      <Messages />
      <h2 className="text-center m-5"></h2>
    </div>
  );
}

export default page;
