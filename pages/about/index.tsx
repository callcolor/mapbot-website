import { GetStaticProps } from 'next';
import Bonnie from '../../src/components/About/Bonnie';
import ContinentStaticProps from '../../src/components/ContinentsStaticProps';
import TabLayout from '../../src/layouts/TabLayout';

export const aboutTabs = [
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/developers',
    label: 'API',
  },
];

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="About" tabs={aboutTabs}>
      <Bonnie {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await ContinentStaticProps()),
    },
  };
};

export default WithStaticProps;
