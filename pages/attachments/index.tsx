import { GetStaticProps } from 'next';
import TopAttachments from '../../src/components/TopAttachments/TopAttachments';
import TopAttachmentsStaticProps from '../../src/components/TopAttachments/TopAttachmentsStaticProps';
import TabLayout from '../../src/layouts/TabLayout';

export const attachmentsTabs = [
  {
    href: '/attachments',
    label: 'Top Attachments',
  },
  {
    href: '/attachments/trending',
    label: 'Trending Attachments',
  },
];

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Top Attachments" tabs={attachmentsTabs}>
      <TopAttachments {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await TopAttachmentsStaticProps()),
    },
  };
};

export default WithStaticProps;
