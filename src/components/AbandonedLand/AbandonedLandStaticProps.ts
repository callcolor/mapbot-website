import contextPromise from '../../../utils/contextPromise';

export interface AbandonedLand {
  region_name: string;
  hard_max_objects: number;
  region_access: number;
  access_name: string;
  parcel_center_x: number;
  parcel_center_y: number;
  abandoned_area: number;
  region_x: number;
  region_y: number;
  continent_name: string;
  abandoned_at: string;
}

enum AccessFlags {
  'Unknown' = 0,
  'Trial' = 7,
  'General' = 13,
  'Moderate' = 21,
  'Adult' = 42,
  'Offline' = 254,
  'Deleted' = 255,
}

const AbandonedLandStaticProps = async () => {
  const { prisma } = await contextPromise;
  const response = await prisma.$queryRaw<Omit<AbandonedLand, 'access_name'>[]>` 
    select 
      r.region_name, r.region_x, r.region_y, hard_max_objects, region_access, 
      (min(parcel_center_x) + max(parcel_center_x)) / 2 as parcel_center_x, 
      (min(parcel_center_y) + max(parcel_center_y)) / 2 as parcel_center_y, 
      sum(parcel_area)::int as abandoned_area, 
      max(c.continent_name) as continent_name, 
      regexp_replace(max(p.parcel_name), '[^0-9\-]+', '', 'g')  as abandoned_at 
    from parcel p 
    left join region r 
      on r.region_name = p.region_name 
    left join avatar a 
      on a.avatar_uuid = p.parcel_owner_id 
    left join continent c 
      on r.region_x < c.continent_max_x 
      and r.region_x >= c.continent_min_x 
      and r.region_y < c.continent_max_y 
      and r.region_y >= c.continent_min_y 
    where 1=1 
      and a.last_name = 'Linden' 
      and p.parcel_name_abandoned = true 
      and p.parcel_deleted is not true 
      and r.deleted_at is null
    group by r.region_name 
    ;
  `;

  const abandonedLands: AbandonedLand[] = response.map((r) => {
    return {
      ...r,
      access_name: AccessFlags[r.region_access],
    };
  });

  return {
    abandonedLands,
  };
};

export default AbandonedLandStaticProps;
