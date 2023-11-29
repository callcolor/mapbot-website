import contextPromise from '../../../utils/contextPromise';

interface LindenHome {
  parcel_id: string;
  parcel_center_x: number;
  parcel_center_y: number;
}

export interface LindenHomeRegion {
  region_name: string;
  region_x: number;
  region_y: number;
  continent_name: string;
  parcel_area: number;
  parcel_max_prims: number;
  linden_homes: LindenHome[];
}

const LindenHomesStaticProps = async () => {
  const { prisma } = await contextPromise;
  const response = await prisma.$queryRaw<(LindenHomeRegion & LindenHome)[]>` 
    select
      r.region_name,
      r.region_x,
      r.region_y,
      p.parcel_id,
      p.parcel_area,
      p.parcel_center_x,
      p.parcel_center_y,
      p.parcel_max_prims,
      c.continent_name
    from region r 
    left join parcel p 
      on r.region_name = p.region_name 
    left join continent c 
      on r.region_x < c.continent_max_x 
      and r.region_x >= c.continent_min_x 
      and r.region_y < c.continent_max_y 
      and r.region_y >= c.continent_min_y 
    where 1=1
      and r.region_product_name = 'Linden Homes / Full Region'
      and r.region_owner = '3d6181b0-6a4b-97ef-18d8-722652995cf1'
      and r.region_product_sku = '131'
      and r.deleted_at is null
      and p.parcel_owner_id = '3d6181b0-6a4b-97ef-18d8-722652995cf1' -- Governor Linden
      and p.parcel_group_id in (
        'dc7b21cd-3c89-fcaa-31c8-25f9ffd224cd', -- Maintenance
        '4a18e287-db5b-0551-2500-087da6e89efb' -- Linden Department of Public Works
      )
      and p.parcel_name in ('Linden Home ', 'Linden Home') 
      and p.parcel_deleted is null
    ;
  `;

  const lindenHomesMap: { [key: string]: LindenHomeRegion } = {};
  for (const r of response) {
    lindenHomesMap[r.region_name] = lindenHomesMap[r.region_name] || {
      region_name: r.region_name,
      region_x: r.region_x,
      region_y: r.region_y,
      continent_name: r.continent_name,
      linden_homes: [],
      parcel_area: r.parcel_area,
      parcel_max_prims: r.parcel_max_prims,
    };
    lindenHomesMap[r.region_name]['linden_homes'].push({
      parcel_id: r.parcel_id,
      parcel_center_x: r.parcel_center_x,
      parcel_center_y: r.parcel_center_y,
    });
  }

  const lindenHomes = Object.values(lindenHomesMap).sort((a, b) =>
    a.region_name > b.region_name ? 1 : -1
  );

  return {
    lindenHomes,
  };
};

export default LindenHomesStaticProps;
