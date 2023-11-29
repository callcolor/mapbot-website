import { GetStaticProps } from 'next';
import TopLandRental from '../../src/components/TopLandRental/TopLandRental';
import TopLandRentalStaticProps from '../../src/components/TopLandRental/TopLandRentalStaticProps';
import TabLayout from '../../src/layouts/TabLayout';

export const landTabs = [
  {
    href: '/land',
    label: 'Top Land Rental Companies',
  },
  {
    href: '/abandoned-land',
    label: 'Abandoned Land',
  },
  {
    href: '/sandbox-land',
    label: 'Sandbox Land',
  },
  {
    href: '/auctions',
    label: 'Auction History',
  },
];

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Top Land Rental Companies" tabs={landTabs}>
      <TopLandRental {...props} />
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await TopLandRentalStaticProps()),
    },
  };
};

export default WithStaticProps;
