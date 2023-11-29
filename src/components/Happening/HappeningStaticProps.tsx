import { region } from '@prisma/client';
import contextPromise from '../../../utils/contextPromise';

export const getHappenings = async ({ limit }: { limit: number }) => {
  const { prisma, scan_id } = await contextPromise;

  return await prisma.$queryRaw<Partial<region>[]>`
    select 
      mi.region_name 
      ,mi.avatar_count 
      ,r.region_x
      ,r.region_y
      ,mi.avatar_count - mi2.avatar_count as diff 
    from map_info mi 
    left join (
      select * from map_info
      where scan_id = ${scan_id - 1}
    ) mi2 
      on mi.region_name = mi2.region_name 
    left join region r 
      on r.region_name = mi.region_name 
    where mi.scan_id = ${scan_id}
      and mi.avatar_count > 10
    order by mi.avatar_count - mi2.avatar_count desc nulls last 
    limit ${limit}
    ;
  `;
};
const HappeningStaticProps = async () => {
  const regions = await getHappenings({ limit: 12 });

  return {
    happeningStaticProps: {
      regions,
    },
  };
};

export default HappeningStaticProps;
