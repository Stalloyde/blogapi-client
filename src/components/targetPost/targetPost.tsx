import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/layout';
import './targetPost.module.css';

function TargetPost() {
  const [targetPostData, setTargetPostData] = useState([]);
  const targetPostId = useParams();

  useEffect(() => {
    const fetchTargetPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${targetPostId.id}`,
        );

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
        <h2>{targetPostData.title}</h2>
        {targetPostData.content}
      </>
    </Layout>
  );
}

export default TargetPost;
