import { useState, useEffect, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layout/layout';
import styles from './targetPost.module.css';
import formatDate from '../../formatDate';
import '../../index.css';

type HeadersType = {
  'Content-Type': string;
  Authorization?: string; // Authorization header is optional
};

type PropsType = {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSignUpUrl: React.Dispatch<React.SetStateAction<string>>;
};

type TargetPostsType = {
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: Number;
    url: string;
  };

  author: { username: string };
  title: string;
  content: string;
  date: Date;
  isPublished: Boolean;
  comments: [];
};

type CommentType = {
  _id: string;
  author: {
    id: string;
    username: string;
    isMod: Boolean;
  };
  content: string;
  date: Date;
};

function TargetPost({ token, setToken, setSignUpUrl }: PropsType) {
  const [targetPostData, setTargetPostData] = useState<
    TargetPostsType | undefined
  >();
  const [newComment, setNewComment] = useState('');
  const [rerender, setRerender] = useState(false);
  const targetPostId = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const headers: HeadersType = {
        'Content-Type': 'application/json',
      };

      if (token) headers.Authorization = token;

      const response = await fetch(
        `http://blog-api-stalloyde.fly.dev/${targetPostId.id}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            newComment,
          }),
        },
      );

      const responseData = await response.json();
      if (responseData.errors) {
        setErrorMessage(responseData.errors[0].msg);
      } else {
        setNewComment('');
        setRerender(true);
        setErrorMessage('');
        setSubmitting(false);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchTargetPost = async () => {
      try {
        const headers: HeadersType = {
          'Content-Type': 'application/json',
        };

        if (token) headers.Authorization = token;

        const response = await fetch(
          `http://blog-api-stalloyde.fly.dev/${targetPostId.id}`,
          { headers },
        );

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }

        const responseData = await response.json();
        setSignUpUrl('');
        setTargetPostData(responseData);
        setRerender(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTargetPost();
  }, [token, rerender]);

  return (
    <Layout token={token} setToken={setToken}>
      {loading && <div className='loading'>Loading...</div>}
      {error && !loading && <div className='error'>{error}</div>}

      {!error && !loading && targetPostData !== undefined && (
        <>
          <div className={styles.contentContainer}>
            <h2>{targetPostData.title}</h2>
            <em>
              Written by: {targetPostData.author.username} | Date:{' '}
              {formatDate(targetPostData.date)}
            </em>
            {targetPostData.image && <img src={targetPostData.image.url}></img>}
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
                {errorMessage && (
                  <p className={styles.errorMessage}>*Input required</p>
                )}
                <textarea
                  value={newComment}
                  id='newComment'
                  name='newComment'
                  placeholder='Write a comment...'
                  required
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                {submitting ? (
                  <button value='Post' disabled>
                    Posting..
                  </button>
                ) : (
                  <button value='Post'>Post</button>
                )}
              </form>
            )}
            {targetPostData.comments.length > 0 ? (
              <>
                {targetPostData.comments.map((comment: CommentType) => (
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
