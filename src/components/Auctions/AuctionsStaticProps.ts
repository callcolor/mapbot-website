import { auction } from '@prisma/client';
import contextPromise from '../../../utils/contextPromise';

export type Auction = auction & {
  continent_name: string;
  region_x: number;
  region_y: number;
  created_at: any;
  l_per_sqm: any;
};

const AuctionsStaticProps = async () => {
  const { prisma } = await contextPromise;
  const auctions = await prisma.$queryRaw<Auction[]>` 
    select 
      c.continent_name,
      r.region_x,
      r.region_y,
      a.*
    from auction a 
    left join region r 
      on r.region_name = a.region 
    left join continent c 
        on r.region_x < c.continent_max_x 
      and r.region_x >= c.continent_min_x 
      and r.region_y < c.continent_max_y 
      and r.region_y >= c.continent_min_y 
    order by a.end_date desc, a.id desc 
    ;
  `;

  auctions.map((a) => {
    a.created_at = a.created_at.getTime();
    a.l_per_sqm = (a.winning_bid || 0) / (a.size || 1);
  });

  return {
    auctions,
  };
};

export default AuctionsStaticProps;
