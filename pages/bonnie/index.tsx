import { GetStaticProps } from 'next';
import Layout from '../../src/layouts/Layout';
import dynamic from 'next/dynamic';
import ContinentStaticProps from '../../src/components/ContinentsStaticProps';

const MapWithNoSSR = dynamic(() => import('../../src/components/LeafletMap') as any, {
  ssr: false,
});

const WithStaticProps = (props: any) => {
  return (
    <Layout title="Bonnie">
      <h1>Bonnie</h1>
      <p>
        BonnieBelle and her sisters are roaming bots who travel the grid collecting data. You can
        follow their progress on the map below.
      </p>
      <p>
        For more info about roaming bots in general, Lou Netizen maintains an excellent 3rd-party
        website at{' '}
        <a target="_blank" href="https://www.lounetizen.com/botdata" rel="noreferrer">
          https://www.lounetizen.com/botdata
        </a>
      </p>
      <div style={{ height: '640px' }}>
        <MapWithNoSSR {...props} />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { ...(await ContinentStaticProps()) },
  };
};

export default WithStaticProps;
