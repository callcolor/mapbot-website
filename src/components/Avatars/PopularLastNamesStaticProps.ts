import contextPromise from '../../../utils/contextPromise';

export interface PopularLastName {
  last_name: string;
  cnt: number;
}

const PopularLastNamesStaticProps = async () => {
  const { prisma } = await contextPromise;
  const popularLastNamesStaticProps = await prisma.$queryRaw<PopularLastName[]>`
    select last_name, count(*)::int4 as cnt
    from avatar_birthdays 
    group by last_name 
    having count(*) > 20
    order by count(*) desc 
    limit 100
    ; 
  `;

  return {
    popularLastNamesStaticProps,
  };
};

export default PopularLastNamesStaticProps;
