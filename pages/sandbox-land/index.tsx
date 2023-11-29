import { GetStaticProps } from 'next';
import SandboxParcels from '../../src/components/SandboxParcels/SandboxParcels';
import SandboxParcelsStaticProps from '../../src/components/SandboxParcels/SandboxParcelsStaticProps';
import TabLayout from '../../src/layouts/TabLayout';
import { landTabs } from '../land';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Sandbox Land" tabs={landTabs}>
      <SandboxParcels {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await SandboxParcelsStaticProps()),
    },
  };
};

export default WithStaticProps;
