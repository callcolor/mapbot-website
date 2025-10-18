import { GetStaticProps } from 'next';
import LindenHomesListView from '../../src/components/LindenHomes/LindenHomesListView';
import LindenHomesStaticProps from '../../src/components/LindenHomes/LindenHomesStaticProps';
import TabLayout from '../../src/layouts/TabLayout';

export const lindenHomesTabs = [
  {
    href: '/linden-homes',
    label: 'Linden Homes',
  },
  {
    href: '/linden-homes/map',
    label: 'Linden Homes Map View',
  },
  {
    href: '/linden-homes/summary',
    label: 'Linden Homes Summary',
  },
];

const WithStaticProps = (props: any) => {
  return (
    <TabLayout tabs={lindenHomesTabs} title="Linden Homes">
      {/* <p></p>
      <p>We are no longer able to provide this feature. For more information see:</p>
      <p>
        <a href="https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832">
          https://community.secondlife.com/forums/topic/435708-the-new-linden-homes-update-post/page/2/#comment-2576832
        </a>
      </p> */}
      <LindenHomesListView {...props} />
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
