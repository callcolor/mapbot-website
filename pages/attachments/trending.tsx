import { GetStaticProps } from 'next';
import { attachmentsTabs } from '.';
import TrendingAttachments from '../../src/components/TrendingAttachments/TrendingAttachments';
import TrendingAttachmentsStaticProps from '../../src/components/TrendingAttachments/TrendingAttachmentsStaticProps';
import TabLayout from '../../src/layouts/TabLayout';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Trending Attachments" tabs={attachmentsTabs}>
      <TrendingAttachments {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await TrendingAttachmentsStaticProps()),
    },
  };
};

export default WithStaticProps;
