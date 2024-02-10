import Header from '../header/header';
import Footer from '../footer/footer';

type PropsType = {
  children?: any;
  token?: string | undefined;
  setToken?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function layout({ children, token, setToken }: PropsType) {
  return (
    <>
      <Header token={token} setToken={setToken} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default layout;
