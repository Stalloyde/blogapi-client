import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from '../layout/layout';
import styles from './targetPost.module.css';
import formatDate from '../../formatDate';
import '../../index.css';

function TargetPost({ token, setToken }) {
  const [targetPostData, setTargetPostData] = useState();
  const [newComment, setNewComment] = useState();
  const targetPostId = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      });

      const responseData = await response.json();
      if (
        responseData.usernameError ||
        responseData.passwordError ||
        responseData.confirmPasswordError
      ) {
        setErrorMessage(responseData);
      } else {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setToken(token);
        setSignupSuccess(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchTargetPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${targetPostId.id}`,
          {
            headers: {
              Authorization: token,
            },
          },
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
    <Layout token={token}>
      {loading && <div className='loading'>Loading...</div>}
      {error && !loading && <div className='error'>{error}</div>}

      {!error && !loading && (
        <>
          <div className={styles.contentContainer}>
            <h2>{targetPostData.title}</h2>
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
            {!token ? (
              <div>
                Please{' '}
                <Link to='/signup'>
                  <em className={styles.commentLink}>sign up</em>
                </Link>{' '}
                or
                <Link to='/login'>
                  <em className={styles.commentLink}>login</em>
                </Link>{' '}
                to add a comment
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor='newComment'>Add Comment:</label>
                <textarea
                  value={newComment}
                  id='newComment'
                  name='newComment'
                  placeholder='Write a comment...'
                  required
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    console.log(newComment);
                  }}
                />
                <button value='Post'>Post</button>
              </form>
            )}
            {targetPostData.comments.length > 0 ? (
              <>
                {targetPostData.comments.map((comment) => (
                  <div key={comment._id} className={styles.comment}>
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
