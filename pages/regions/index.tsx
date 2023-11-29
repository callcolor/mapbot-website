import { GetStaticProps } from "next";
import Layout from "../../src/layouts/Layout";
import RegionList from "../../src/components/RegionList";
import RegionListStaticProps from "../../src/components/RegionListStaticProps";

const WithStaticProps = (props: any) => {
  return (
    <Layout title="Region List">
      <RegionList {...props} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await RegionListStaticProps()),
    },
  };
};

export default WithStaticProps;
