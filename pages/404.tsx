import { NextPage } from 'next';
import Layout from '../src/layouts/Layout';
import Img from '../utils/Img';

const Error: NextPage = () => {
  return (
    <Layout>
      <h1>Not Found</h1>
      <p>
        <Img
          style={{ display: 'block', width: '100%', margin: 'auto' }}
          src="/images/creation_of_dog.jpg"
        />
        <caption style={{ width: '100%' }}>{`The Creation of Dog`}</caption>
      </p>
      <p></p>
    </Layout>
  );
};

export default Error;
