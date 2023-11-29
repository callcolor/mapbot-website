import contextPromise from '../../../utils/contextPromise';
import { RegionAccessFlags } from '../../types/RegionAccessFlags';

export interface SandboxParcels {
  region_name: string;
  available_prims: number;
  region_access: number;
  access_name: string;
  parcel_center_x: number;
  parcel_center_y: number;
  sandbox_area: number;
  parcel_dwell: number;
  region_x: number;
  region_y: number;
}

const SandboxParcelsStaticProps = async () => {
  const { prisma, scan_id } = await contextPromise;
  const response = await prisma.$queryRaw<Omit<SandboxParcels, 'access_name'>[]>` 
    select * from (
      select 
        r.region_name, r.region_x, r.region_y, region_access, 
        (min(parcel_center_x) + max(parcel_center_x)) / 2 as parcel_center_x, 
        (min(parcel_center_y) + max(parcel_center_y)) / 2 as parcel_center_y, 
        sum(parcel_area)::int as sandbox_area,
        sum(parcel_max_prims - parcel_total_prims)::int as available_prims,
        sum(parcel_dwell)::int as parcel_dwell
      from parcel p 
      left join region r 
        on r.region_name = p.region_name 
      where 1=1 
        and p.parcel_flags & 1 > 0 -- AllowFly 
        and p.parcel_flags & 2 > 0 -- AllowOtherScripts 
        and p.parcel_flags & 8 > 0 -- AllowLandmark 
        and p.parcel_flags & 64 > 0 -- CreateObjects 
        and p.parcel_flags & 134217728 > 0 -- AllowAPrimitiveEntry 
        and p.parcel_clean_time = 0
          and p.parcel_deleted is not true 
        and p.parcel_flags & 512 = 0 -- UseAccessList 
        and p.parcel_flags & 2048 = 0 -- UsePassList 
        and p.parcel_flags & 4194304 = 0 -- DenyAnonymous 
        and r.scan_id = ${scan_id}
      group by r.region_name 
    ) q
    where available_prims > 5000
    order by available_prims desc, parcel_dwell desc
    ;
  `;

  const sandboxParcels: SandboxParcels[] = response.map((r) => {
    return {
      ...r,
      access_name: RegionAccessFlags[r.region_access],
    };
  });

  return {
    sandboxParcels,
  };
};

export default SandboxParcelsStaticProps;
