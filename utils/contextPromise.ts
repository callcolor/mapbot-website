import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (!params.args?.query?.includes(`set statement_timeout`)) {
    await prisma.$queryRaw`
      set statement_timeout = 600000;
    `;
  }
  const result = await next(params);
  return result;
});

const getContext = async () => {
  const scan_id = (
    await prisma.$queryRaw<{ max: number }[]>`
      (select max(scan_id) from region)
    `
  )[0]['max'];

  return {
    scan_id,
    prisma,
  };
};

const contextPromise = getContext();

export default contextPromise;
