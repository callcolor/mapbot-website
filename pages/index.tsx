import { GetStaticProps } from 'next';
import Happening from '../src/components/Happening/Happening';
import HappeningStaticProps from '../src/components/Happening/HappeningStaticProps';
import { appTitle } from '../src/layouts/DrawerAppBar';
import Layout from '../src/layouts/Layout';

const WithStaticProps = (props: any) => {
  return (
    <Layout title="">
      <h1 style={{ marginBottom: '14px' }}>{appTitle}</h1>

      <h2>{`Mission`}</h2>

      <p>{`The worst part of Second Life is finding where everyone else is at.`}</p>

      <p>{`BonnieBots is an attempt to find new ways for residents to connect and navigate their second life. Our goal is to support and promote the Second Life community while encouraging more active participation. We believe the continued success of Second Life lies with the residents.`}</p>

      <p>{`Information about Second Life should be freely accessible by all. We intend to make previously obscured information available to all residents, enable open use of the information, and expand available toolsets to further content creation.`}</p>

      <p>{`All information collected and made available is publicly accessible and is not, and never will be, utilized for any monetary gain. We support individual privacy and will never attempt to obtain information not contained within or relevant to Second Life.`}</p>

      <h2>{`Happening Now`}</h2>
      <Happening {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await HappeningStaticProps()),
    },
  };
};

export default WithStaticProps;
