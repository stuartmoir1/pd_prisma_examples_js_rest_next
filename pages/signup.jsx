import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import Layout from '../components/Layout';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submitData = async e => {
    e.preventDefault();
    const url = 'http://localhost:3000/api/user';
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    };

    try {
      const res = await fetch(url, init);
      const data = await res.json();
      Router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className='page'>
        <form onSubmit={submitData}>
          <h1>Signup</h1>
          <input
            autoFocus
            onChange={e => setName(e.target.value)}
            placeholder='Name'
            type='text'
            value={name}
          />
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder='Email address'
            type='text'
            value={email}
          />
          <input
            disabled={!name || !email}
            type='submit'
            value='Signup'
          />
          <a className='back' href='#' onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }

        input[type='text'] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default Signup;
