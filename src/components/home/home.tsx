import { useState, useEffect } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import Layout from '../layout/layout';
import styles from './home.module.css';
import formatDate from '../../formatDate';

type PropsType = {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSignUpUrl: React.Dispatch<React.SetStateAction<string>>;
};

type PostsType = {
  _id: string;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: Number;
  };

  author: string;
  title: string;
  content: string;
  date: Date;
  isPublished: Boolean;
  comments: [];
}[];

function Home({ token, setToken, setSignUpUrl }: PropsType) {
  const [posts, setPosts] = useState<PostsType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          'https://blog-api-stalloyde.fly.dev/posts',
          {
            mode: 'cors',
          },
        );

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }

        const responseData = await response.json();
        setPosts(responseData);
        setSignUpUrl('');
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <Layout token={token} setToken={setToken}>
      {loading && <div className='loading'>Loading...</div>}
      {error && !loading && <div className='error'>{error}</div>}

      {!error && !loading && (
        <>
          <div className={styles.mainHeader}>
            <h2>All Posts</h2>
          </div>

          <div className={styles.cardContainer}>
            {posts.map((post, index) => (
              <div className={styles.card} key={index}>
                <Link to={`./${post._id}`}>
                  <div>
                    <h3>{post.title}</h3>
                    <em>{formatDate(post.date)}</em>
                  </div>

                  <LinesEllipsis
                    text={post.content}
                    maxLine='4'
                    ellipsis='..'
                    trimRight
                    basedOn='letters'
                    className={styles.content}
                  />

                  <div className={styles.comments}>
                    <em>{post.comments.length} Comments </em>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}

export default Home;
