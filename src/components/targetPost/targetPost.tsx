import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/layout';
import styles from './targetPost.module.css';
import formatDate from '../../formatDate';
import '../../index.css';

function TargetPost() {
  const [targetPostData, setTargetPostData] = useState();
  const targetPostId = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTargetPost();
  }, []);

  return (
    <Layout>
      {loading && <div className='loading'>Loading...</div>}
      {error && !loading && <div className='error'>{error}</div>}

      {!error && !loading && (
        <>
          <h2>{targetPostData.title}</h2>

          <div className={styles.contentContainer}>
            <em>
              Written by: {targetPostData.author.username} | Date:{' '}
              {formatDate(targetPostData.date)}
            </em>
            <div className={styles.postContainer}>
              <div>{targetPostData.content}</div>
            </div>
          </div>

          <hr></hr>

          <div className={styles.commentsContainer}>
            <h3>Comments</h3>
            {targetPostData.comments.length > 0 ? (
              <>
                {targetPostData.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className={styles.comment}
                  >
                    <div>{comment.content}</div>
                    <em>
                      {comment.author.username} | {formatDate(comment.date)}
                    </em>
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.comment}> No Comments </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default TargetPost;
