import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import Layout from '../components/Layout';
import Post from '../components/Post';

const Search = props => {
  const [searchString, setSearchString] = useState('');

  const submitData = e => {
    e.preventDefault();
    Router.push(`/search?searchString=${searchString}`);
  }

  return (
    <div>
      <Layout>
        <div className='page'>
          <form onSubmit={submitData}>
            <h1>Search</h1>
            <input
              autoFocus
              onChange={e => setSearchString(e.target.value)}
              placeholder='Enter text'
              type='text'
              value={searchString}
            />
            <input
              disabled={!searchString}
              type='submit'
              value='Search'
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
            margin-bottom: 2rem;
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
      <Layout noHeader={true}>
        <div className='page'>
          <main>
            {props.posts.map(post => (
              <div key={post.id} className='post'>
                <Post post={post} />
              </div>
            ))}
          </main>
        </div>
        <style jsx>{`
          .post {
            background: white;
            transition: box-shadow 0.1s ease-in;
          }

          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }

          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    </div>
  )
}

export const getServerSideProps = async context => {
  const searchString = context.req.url.split('=')[1];
  const res = await fetch(`http://localhost:3000/api/filterPosts?searchString=${searchString}`);
  const posts = await res.json();
  return { props: { posts } };
}

export default Search;
