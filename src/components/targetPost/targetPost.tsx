import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvide } from 'react-router-dom';
import Layout from '../layout/layout';
import './targetPost.module.css';

function TargetPost({ targetPost, setTargetPost }) {
  const [targetPostData, setTargetPostData] = useState([]);

  useEffect(() => {
    const fetchTargetPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${targetPost}`);

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }

        const responseData = await response.json();
        setTargetPostData(responseData);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchTargetPost();
  }, []);

  return (
  <Layout>
    <>
    {targetPostData.content}
    </>
  </Layout>
  );
}

export default TargetPost;
