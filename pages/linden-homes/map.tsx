import { GetStaticProps } from 'next';
import { lindenHomesTabs } from '.';
import LindenHomesStaticProps from '../../src/components/LindenHomes/LindenHomesStaticProps';
import TabLayout from '../../src/layouts/TabLayout';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(
  () => import('../../src/components/LindenHomes/LindenHomeMap') as any,
  {
    ssr: false,
  }
);

const WithStaticProps = (props: any) => {
  return (
    <TabLayout tabs={lindenHomesTabs} title="Linden Homes Map View">
      {/* <p></p>
      <p>We are no longer able to provide this feature. For more information see:</p>
      <p>
        <a href="https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832">
          https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832
        </a>
      </p> */}
      <div style={{ height: '640px' }}>
        <MapWithNoSSR {...props} />
      </div>
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await LindenHomesStaticProps()),
    },
  };
};

export default WithStaticProps;
