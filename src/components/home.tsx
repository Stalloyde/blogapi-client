import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import LinesEllipsis from 'react-lines-ellipsis';
import Layout from './layout';
import styles from './home.module.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts', { mode: 'cors' });

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }

        const responseData = await response.json();
        setPosts(responseData);
      } catch (err) {
        throw new Error(err);
      }
    };
    getPosts();
  }, []);

  const formatDate = (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

  return (
  <Layout>
    <main>
      <>
        <h2>
          All Posts
        </h2>

        <div className={styles.cardContainer}>
          {posts.map((post) => (
            <div className={styles.card}>
              <div>
                <h3>{post.title}</h3>
                <em>{formatDate(post.date)}</em>
              </div>

              <LinesEllipsis text={post.content} maxLine='4' ellipsis='...' trimRight basedOn='letters' className={styles.content}/>

              <div className={styles.comments}>
              <em>{post.comments.length} Comments</em>
              </div>
            </div>
          ))}
        </div>
      </>
    </main>
  </Layout>
  );
}

export default App;
