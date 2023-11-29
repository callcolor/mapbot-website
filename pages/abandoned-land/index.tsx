import { GetStaticProps } from 'next';
import AbandonedLand from '../../src/components/AbandonedLand/AbandonedLand';
import AbandonedLandStaticProps from '../../src/components/AbandonedLand/AbandonedLandStaticProps';
import TabLayout from '../../src/layouts/TabLayout';
import { landTabs } from '../land';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Abandoned Land" tabs={landTabs}>
      <AbandonedLand {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await AbandonedLandStaticProps()),
    },
  };
};

export default WithStaticProps;
