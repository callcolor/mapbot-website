import { GetStaticProps } from 'next';
import Layout from '../../src/layouts/Layout';

import ActiveUserSummary from '../../src/components/Avatars/ActiveUserSummary';
import ActiveUserSummaryStaticProps from '../../src/components/Avatars/ActiveUserSummaryStaticProps';
import MostPopularLastNames from '../../src/components/Avatars/PopularLastNames';
import PopularLastNamesStaticProps from '../../src/components/Avatars/PopularLastNamesStaticProps';

const WithStaticProps = (props: any) => {
  return (
    <Layout title="Avatars">
      <h1>Avatars</h1>
      <ActiveUserSummary {...props} />
      <MostPopularLastNames {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await ActiveUserSummaryStaticProps()),
      ...(await PopularLastNamesStaticProps()),
    },
  };
};

export default WithStaticProps;
