import { GetStaticProps } from "next";
import Layout from "../../src/layouts/Layout";
import TrendingAttachments from "../../src/components/TrendingAttachments/TrendingAttachments";
import TrendingAttachmentsStaticProps from "../../src/components/TrendingAttachments/TrendingAttachmentsStaticProps";

const WithStaticProps = (props: any) => {
  return (
    <Layout title="Trending Attachments">
      <TrendingAttachments {...props} />
    </Layout>
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
