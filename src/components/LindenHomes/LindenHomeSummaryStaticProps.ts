import contextPromise from '../../../utils/contextPromise';

const LindenHomeSummaryStaticProps = async () => {
  const { prisma } = await contextPromise;
  const continentSummaries = await prisma.$queryRaw<
    { continent_name: string; owned: number; unowned: number; total: number }[]
  >`
    select 
      continent_name, 
      sum(is_owned)::int as owned, 
      (count(*) - sum(is_owned))::int as unowned,
      count(*)::int as total
    from (
      select
        p.parcel_id,
        c.continent_name,
        case 
            when 1=1 
              and p.parcel_owner_id = '3d6181b0-6a4b-97ef-18d8-722652995cf1' -- Governor Linden
              and p.parcel_name in ('Linden Home ', 'Linden Home')
              and p.parcel_group_id in (
                'dc7b21cd-3c89-fcaa-31c8-25f9ffd224cd', -- Maintenance
                '4a18e287-db5b-0551-2500-087da6e89efb' -- Linden Department of Public Works
          )
            then 0 
            else 1 end as is_owned
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
        and p.parcel_deleted is null
        and p.parcel_max_prims in (175, 351)
    ) q 
    group by continent_name
    order by continent_name
    ;
  `;

  return {
    lindenHomeSummary: {
      continentSummaries,
    },
  };
};

export default LindenHomeSummaryStaticProps;
