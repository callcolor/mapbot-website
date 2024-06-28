import contextPromise from '../../../utils/contextPromise';
import extractUrls from '../../../utils/getUrls';

export interface TopLandRentalData {
  name: string;
  uuid: string;
  rank: number;
  region_count: number;
  url: string | null;
}

interface TopLandRentalModel {
  region_owner: string;
  region_count: number;
  first_name: string;
  last_name: string;
  avatar_description: string;
}

const TopLandRentalStaticProps = async () => {
  const { prisma } = await contextPromise;

  const topLandRentals = await prisma.$queryRaw<TopLandRentalModel[]>`
    select 
      sum(region_count)::int4 as region_count,
      region_owner,
      first_name,
      last_name,
      a.opt_out,
      avatar_description,
      avatar_fl_description
    from (
      select
        case
        when region_owner in ( -- Anshex
          '23d84ed6-9c6b-4f1d-9c57-4e7669cde61d',
          'cd1d6682-c1dd-4211-9f29-d6f5cb964a96',
          'e4f6857f-8ccc-47fd-8de9-f0338ee229a1',
          '2dcb0108-7ba7-4a59-a0ff-d376625fcd8a',
          'eacde2da-67e7-48ba-9749-e5644486aa13',
          '9cc46bdd-7a82-4c99-8f4b-10ac27d6a229',
          '2b2f2f9a-6193-459a-ad46-357121ae1079',
          'da6654ab-7df5-4a95-bd15-8feacb507512'
        ) then 'cd1d6682-c1dd-4211-9f29-d6f5cb964a96' 
        when region_owner in ( -- ZoHa
          'cdb35787-2f15-4ad9-854a-1d03e1fccb4c',
          '853588b3-9bd3-49eb-a20e-d512fa8797bd',
          '8213af12-d5f3-4cfc-9221-90d01c93dbdd'
        ) then 'cdb35787-2f15-4ad9-854a-1d03e1fccb4c' 
        when region_owner in ( -- AM Estate
          '9395b1af-573a-4246-8990-f16e708f9651',
          '24a8026f-2cd8-468b-bceb-ac6ec8eb71cb',
          '5c976ae2-156b-4fe0-bef5-d73fcedbd47c'
        ) then '9395b1af-573a-4246-8990-f16e708f9651' 
        when region_owner in ( -- Virtual Dream
          '85f58e6a-8bfa-49c6-b108-7bbf63796f69',
          '9a9ed404-be72-4ace-aca1-046ee22b44b9'
        ) then '85f58e6a-8bfa-49c6-b108-7bbf63796f69' 
        else region_owner end,
        count(*) as region_count
      from region 
      where 1=1
        and deleted_at is null
        and region_owner != '00000000-0000-0000-0000-000000000000'
      group by region_owner 
    ) r
    left join avatar a 
      on region_owner = a.avatar_uuid 
    where 1=1
      and a.last_name != 'Linden'
      and region_count > 35
    group by 
      region_owner,
      first_name,
      last_name,
      a.opt_out,
      avatar_description,
      avatar_fl_description
    order by region_count desc
    limit 100 
    ;
  `;

  const topLandRentalStaticProps: TopLandRentalData[] = topLandRentals.map((d, i) => {
    const urls = extractUrls(d.avatar_description)
      .map((u) => {
        u = u.replaceAll(']', '');
        return u;
      })
      .sort((a, b) => {
        const weight = (s: string): number => {
          let weight = 0;
          if (s.includes('.secondlife.com')) weight += 1000;
          if (s.includes('facebook.com')) weight += 2000;
          if (s.includes('youtube.com')) weight += 8000;
          if (s.includes('gmail.com')) weight += 9000;
          weight += s.length;
          return weight;
        };

        return weight(a) - weight(b);
      });

    return {
      uuid: d.region_owner,
      rank: i + 1,
      name: `${d.first_name} ${d.last_name}`,
      region_count: d.region_count,
      url: urls[0] || null,
    };
  });

  return {
    topLandRentalStaticProps,
  };
};

export default TopLandRentalStaticProps;
