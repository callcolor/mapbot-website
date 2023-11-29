import contextPromise from "../../utils/contextPromise";

const RegionListStaticProps = async () => {
  const { prisma, scan_id } = await contextPromise;
  const regions = await prisma.region.findMany({
    select: {
      region_name: true,
      region_x: true,
      region_y: true,
      map_info: {
        select: {
          map_info_created_at: true,
          avatar_count: true,
          access_flags: true,
          access_flag: {
            select: {
              access_name: true,
            },
          },
        },
        where: { scan_id },
      },
    },
    where: {
      scan_id,
    },
  });
  const previousMapInfo = await prisma.map_info.findMany({
    select: {
      region_name: true,
      map_info_created_at: true,
      avatar_count: true,
    },
    where: { scan_id: scan_id - 1 },
  });
  const previousMapInfoByName = previousMapInfo.reduce((previous, current) => {
    previous[current.region_name] = current;
    return previous;
  }, {} as {
    [name: string]: {
      region_name: string;
      map_info_created_at: Date;
      avatar_count: number;
    } | undefined
  });

  const data = regions
    .filter((r) => r.map_info[0])
    .map((region) => {
      const mapInfo = region.map_info[0];
      const previousMapInfo = previousMapInfoByName[region.region_name];
      return [
        region.region_name,
        mapInfo.access_flag.access_name || mapInfo.access_flags || 0,
        previousMapInfo?.map_info_created_at.getTime() || 0,
        previousMapInfo?.avatar_count || 0,
        mapInfo.map_info_created_at.getTime() || 0,
        mapInfo.avatar_count,
        region.region_x,
        region.region_y,
      ];
    });

  return {
    regionListStaticProps: {
      data,
    }
  };
};

export default RegionListStaticProps;
