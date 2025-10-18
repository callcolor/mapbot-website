import { GetStaticProps } from 'next';
import { lindenHomesTabs } from '.';
import TabLayout from '../../src/layouts/TabLayout';
import LindenHomeSummary from '../../src/components/LindenHomes/LindenHomeSummary';
import LindenHomeSummaryStaticProps from '../../src/components/LindenHomes/LindenHomeSummaryStaticProps';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout tabs={lindenHomesTabs} title="Linden Homes Summary">
      <p></p>
      <p>We are no longer able to provide this feature. For more information see:</p>
      <p>
        <a href="https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832">
          https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832
        </a>
      </p>
      <LindenHomeSummary {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await LindenHomeSummaryStaticProps()),
    },
  };
};

export default WithStaticProps;
