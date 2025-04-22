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

  useEffect(() => {
    // GET TO THE ENDPOINT
    fetch('https://messageboard-back.onrender.com/messages')
      // ERROR ? STORE IT : PARSE IT && STORE IT
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://messageboard-back.onrender.com/messages',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) throw new Error('Error al enviar');

      alert('Mensaje enviado correctamente');
      setFormData({ message: '', date: '' });
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el mensaje');
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <ul>
          {messages.map(message => (
            <li
              key={message.id}
              className="m-10 flex-col gap-5 justify-items-center items-center"
            >
              <p>{message.message}</p>
              <p>{message.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
          <textarea
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Fecha"
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Messages;
