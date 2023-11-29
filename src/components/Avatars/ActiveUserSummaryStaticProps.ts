import contextPromise from '../../../utils/contextPromise';

interface UserSummary {
  standard: number;
  premium: number;
  premium_plus: number;
}

const ActiveUserSummaryStaticProps = async () => {
  const { prisma } = await contextPromise;
  const userSummaries = await prisma.$queryRaw<UserSummary[]>`
    select
      (active_accounts_14d * standard / base)::int as standard,
      (active_accounts_14d * premium / base)::int as premium,
      (active_accounts_14d * premium_plus / base)::int as premium_plus
    from (
      select
        count(*) as active_accounts_14d,
        (count(*) filter (where avatar_account_level is not null))::float as base,
        (count(*) filter (where avatar_account_level = 0))::float as standard,
        (count(*) filter (where avatar_account_level = 1))::float as premium,
        (count(*) filter (where avatar_account_level = 10))::float as premium_plus
      from avatar_birthdays ab
    ) q
    ;
  `;

  const userSummary = userSummaries[0];

  return {
    activeUserSummaryStaticProps: {
      userSummary,
    },
  };
};

export default ActiveUserSummaryStaticProps;
