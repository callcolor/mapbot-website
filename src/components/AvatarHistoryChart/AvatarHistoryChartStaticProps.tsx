import contextPromise from "../../../utils/contextPromise";

const AvatarHistoryChartStaticProps = async (name: string) => {
  const { prisma, scan_id } = await contextPromise;
  const map_info = await prisma.$queryRaw<
    {
      map_info_created_at: number;
      avatar_count: string;
    }[]
  >`
    select 
      extract(epoch from map_info_created_at)::int as map_info_created_at,
      avatar_count
    from map_info
      where 1=1
        and scan_id <= ${scan_id}
        and scan_id > ${scan_id - 100}
        and region_name = ${name}
    order by scan_id desc
  `;

  const avatar_count_data = map_info.map((mi) => [
    mi.map_info_created_at * 1000,
    mi.avatar_count,
  ]);

  return {
    avatarHistoryChartStaticProps: {
      avatar_count_data,
    },
  };
};

export default AvatarHistoryChartStaticProps;
