import { GetStaticProps } from 'next';
import Layout from '../../src/layouts/Layout';
import TopAttachments from '../../src/components/TopAttachments/TopAttachments';
import TopAttachmentsStaticProps from '../../src/components/TopAttachments/TopAttachmentsStaticProps';

const WithStaticProps = (props: any) => {
  return (
    <Layout title="Top Attachments">
      <TopAttachments {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const topAttachmentsStaticProps = await TopAttachmentsStaticProps();
  return {
    props: {
      ...(await TopAttachmentsStaticProps()),
    },
  };
};

export default WithStaticProps;
