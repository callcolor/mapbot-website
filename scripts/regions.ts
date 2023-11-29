import { getHappenings } from '../src/components/Happening/HappeningStaticProps';
import { RegionAccessFlags } from '../src/types/RegionAccessFlags';
import contextPromise from '../utils/contextPromise';
import { deleteFolder, writeFile } from '../utils/fs';

const regions = async () => {
  const { prisma } = await contextPromise;

  await deleteFolder('regions');

  console.log(`refresh regions.`);
  const allRegions = await prisma.region.findMany({
    select: {
      region_name: true,
      region_map_image: true,
      region_x: true,
      region_y: true,
      region_owner: true,
      region_product_sku: true,
      region_product_name: true,
      estate_id: true,
      hard_max_agents: true,
      hard_max_objects: true,
      deny_age_unverified: true,
      region_access: true,
      deleted_at: true,
      estate_name: true,
      region_ip: true,
      region_port: true,
      channel_version: true,
      region_updated_at: true,
      parcel: {
        select: {
          parcel_id: true,
          parcel_area: true,
          parcel_deleted: true,
          parcel_description: true,
          parcel_name: true,
          parcel_status: true,
          parcel_updated_at: true,
        },
        where: {
          OR: [{ parcel_deleted: false }, { parcel_deleted: null }],
        },
      },
    },
    where: {
      deleted_at: null,
    },
    orderBy: [
      {
        region_y: 'asc',
      },
      {
        region_x: 'asc',
      },
    ],
  });

  console.log(`save region index.`);
  await writeFile(
    `regions/index.json`,
    JSON.stringify({
      updated: new Date().getTime(),
      regions: allRegions
        .filter((r) => r.deleted_at === null)
        .map(({ region_name, region_x, region_y }) => ({
          region_name,
          region_x,
          region_y,
        })),
    })
  );

  console.log(`save all regions api.`);
  for (const region of allRegions) {
    const parcels = region.parcel;
    await writeFile(`regions/${region.region_name}/parcels.json`, JSON.stringify(parcels));
    if (region.deleted_at === null) {
      await writeFile(
        `regions/${region.region_x}/${region.region_y}/parcels.json`,
        JSON.stringify(parcels)
      );
    }

    const regionWithAccess = {
      ...region,
      parcel: undefined,
      access_name: RegionAccessFlags[region.region_access || 0],
    };
    await writeFile(`regions/${region.region_name}.json`, JSON.stringify(regionWithAccess));
    if (region.deleted_at === null) {
      await writeFile(
        `regions/${region.region_x}/${region.region_y}/index.json`,
        JSON.stringify(regionWithAccess)
      );
    }
  }

  console.log(`save popular regions api.`);
  const happenings = await getHappenings({ limit: 100 });
  const regionMap = allRegions.reduce((p, c) => {
    p[c.region_name] = c;
    return p;
  }, {} as { [region_name: string]: typeof allRegions[0] });
  await Promise.all(
    happenings.map((happening, i) => {
      if (happening.region_name) {
        const regionWithAccess = {
          ...regionMap[happening.region_name],
          ...happening,
          parcel: undefined,
          access_name: RegionAccessFlags[regionMap[happening.region_name]?.region_access || 0],
        };
        return writeFile(`regions/popular/${i + 1}.json`, JSON.stringify(regionWithAccess));
      }
    })
  );
};

export default regions;
