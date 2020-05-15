import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/Layout';

async function publish(id) {
  const res = await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT'
  });
  const data = await res.json();
  await Router.push('/');
}

async function destroy(id) {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  Router.push('/');
}

const Post = props => {
  let title = props.title;
  if (!props.published) title = `${title} (Draft)`;
  const authorName = props.author ? props.author.name : 'Unknown author';

  return (
    <Layout>
      <div className='page'>
        <h2>{title}</h2>
        <small>By {authorName}</small>
        <ReactMarkdown source={props.content} />
        <div className='actions'>
          {!props.published && (
            <button onClick={() => publish(props.id)}>Publish</button>
          )}
          <button onClick={() => destroy(props.id)}>Delete</button>
        </div>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps = async context => {
  const res = await fetch(`http://localhost:3000/api/post/${context.params.id}`);
  const data = await res.json();
  return { props: { ...data } };
}

export default Post;
