'use client';
import { useState, useEffect } from 'react';
import React from 'react';

type Message = {
  id: number;
  message: string;
  date: string;
};

function Messages() {
  // GET MESSAGE || ERROR => STORE IT HERE ⤵
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    message: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5173/messages');
      if (!res.ok) throw new Error('Algo salió mal al obtener los mensajes');
      const data = await res.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5173/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al enviar');

      setFormData({ message: '', date: '' });
      setSuccessMessage('¡Mensaje envíado con éxito!');
    } catch (error) {
      setSuccessMessage(null);
      setError(String(error)); // POSSIBLY REDUNDANT, INSPECT LATER
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search')?.toString().trim();

    if (!search) return;

    try {
      const res = await fetch(
        `http://localhost:5173/messages?search=${encodeURIComponent(search)}`,
      );
      if (!res.ok) throw new Error('Error al buscar');

      const data = await res.json();
      console.log('Mensajes similares:', data);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-amber-100 h-full">
      <div>
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center"
        >
          <input
            type="text"
            name="search"
            placeholder="Buscar mensaje..."
            className="border-2 border-black rounded-lg p-3 m-5"
          />
          <button
            type="submit"
            className="border-2 border-black rounded-lg p-3"
          >
            Buscar
          </button>
          <button
            type="button"
            className="border-2 border-black rounded-lg p-3 m-3"
            onClick={fetchMessages}
          >
            Reset
          </button>
        </form>

        <ul className="border-2 border-black rounded-lg p-5  mx-36">
          {messages.map(message => (
            <li
              key={message.id}
              className="m-10 flex-col gap-5 justify-items-center items-center bg-amber-200 border-2 border-amber-300 p-5 rounded-lg"
            >
              <p>{message.message}</p>
              <p>{message.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="mb-10 text-2xl font-mono text-black">
          Envía tú mensaje
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 border-2 border-black rounded-lg p-10  mx-36 text-black"
        >
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensaje..."
            className="border-2 border-black p-3 rounded-lg text-black"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Fecha"
            className="border-2 border-black p-3 rounded-lg text-black"
            required
          />
          {error && (
            <h2 className="text-red-500 font-extralight drop-shadow-2xl text-black">
              {error}
            </h2>
          )}
          {successMessage && (
            <h2 className="text-green-600 font-extralight">{successMessage}</h2>
          )}
          <button type="submit" className="border-2 border-black rounded-2xl ">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
