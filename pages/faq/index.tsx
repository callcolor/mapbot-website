import { GetStaticProps } from 'next';
import Faq from '../../src/components/About/Faq';
import TabLayout from '../../src/layouts/TabLayout';
import { aboutTabs } from '../about';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="FAQ" tabs={aboutTabs}>
      <Faq />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default WithStaticProps;
