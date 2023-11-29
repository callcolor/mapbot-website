import { GetStaticProps } from 'next';
import Auctions from '../../src/components/Auctions/Auctions';
import AuctionsStaticProps from '../../src/components/Auctions/AuctionsStaticProps';
import TabLayout from '../../src/layouts/TabLayout';
import { landTabs } from '../land';

const WithStaticProps = (props: any) => {
  return (
    <TabLayout title="Auction History" tabs={landTabs}>
      <Auctions {...props} />
      <p>
        Land auction history from{' '}
        <a target="_blank" href="https://places.secondlife.com/auctions" rel="noreferrer">
          https://places.secondlife.com/auctions
        </a>
        .
      </p>
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await AuctionsStaticProps()),
    },
  };
};

export default WithStaticProps;
