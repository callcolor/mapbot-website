import contextPromise from "../../../utils/contextPromise";

const AvatarDistributionChartStaticProps = async (name: string) => {
  const { prisma } = await contextPromise;
  const map_info = await prisma.$queryRaw<
    { avatar_count_dec: number; count: bigint }[]
  >`
    select 
      avatar_count_dec,
      count
    from map_info_distribution 
    where 1=1
      and region_name = ${name}
    order by avatar_count_dec
    ;
  `;

  const avatar_distribution_data = map_info.map((mi) => [
    mi.avatar_count_dec,
    Number(mi.count),
  ]);

  return {
    avatarDistributionChartStaticProps: {
      avatar_distribution_data,
    },
  };
};

export default AvatarDistributionChartStaticProps;
