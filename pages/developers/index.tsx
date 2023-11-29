import { GetStaticProps } from 'next';
import Api from '../../src/components/About/Api';
import TabLayout from '../../src/layouts/TabLayout';
import { aboutTabs } from '../about';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="API" tabs={aboutTabs}>
      <Api />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default WithStaticProps;
