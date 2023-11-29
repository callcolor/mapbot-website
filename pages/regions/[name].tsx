import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../src/layouts/Layout';
import AvatarHistoryChart from '../../src/components/AvatarHistoryChart/AvatarHistoryChart';
import AvatarHistoryChartStaticProps from '../../src/components/AvatarHistoryChart/AvatarHistoryChartStaticProps';
import AvatarDistributionChart from '../../src/components/AvatarDistributionChart/AvatarDistributionChart';
import AvatarDistributionChartStaticProps from '../../src/components/AvatarDistributionChart/AvatarDistributionChartStaticProps';
import RegionPhoto from '../../src/components/RegionPhoto';
import { Box, Table, TableCell, TableRow, Typography, TableBody } from '@mui/material';
import contextPromise from '../../utils/contextPromise';

const WithStaticProps = (props: any) => {
  const { regionProps } = props;
  const { region_name } = regionProps;

  return (
    <Layout title={`${region_name}`}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
          <h1 style={{ marginBottom: '0px' }}>
            {`${region_name} (${regionProps.region_x}, ${regionProps.region_y})`}
            {regionProps.region_product_name && ` - ${regionProps.region_product_name}`}
          </h1>

          {regionProps.owner?.avatar_uuid && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              style={{ marginBottom: '20px', marginTop: '30px' }}
            >
              {`Region owner: `}
              <a
                target="_blank"
                href={`https://world.secondlife.com/resident/${regionProps.owner.avatar_uuid}`}
                rel="noreferrer"
              >
                {`${regionProps.owner.first_name} ${regionProps.owner.last_name}`}
              </a>
            </Typography>
          )}

          <Typography variant="subtitle1" color="text.secondary">
            Largest Parcels:
          </Typography>

          <Table style={{ width: 'auto', marginRight: '1em' }}>
            <TableBody>
              {regionProps.parcel.map((p: any, i: number) => (
                <TableRow key={i}>
                  <TableCell style={{ padding: '.5em', textAlign: 'left' }}>
                    {p.parcel_name}
                  </TableCell>
                  <TableCell style={{ padding: '.5em', textAlign: 'right' }}>
                    {p.parcel_area} sqm
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            marginTop: '30px',
            maxWidth: '320px',
          }}
        >
          <RegionPhoto region={regionProps} />
        </Box>
      </Box>

      <AvatarHistoryChart {...props} />

      <AvatarDistributionChart {...props} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { prisma } = await contextPromise;
  const regions = await prisma.region.findMany({
    select: { region_name: true },
  });
  const paths = regions.map((region) => ({
    params: { name: region.region_name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { prisma } = await contextPromise;
  const name = params?.name as string;

  const regionProps = await prisma.region.findUnique({
    select: {
      region_name: true,
      region_product_name: true,
      region_x: true,
      region_y: true,
      parcel: {
        select: {
          parcel_name: true,
          parcel_area: true,
        },
        where: {
          parcel_name: {
            not: '',
          },
          parcel_deleted: null,
        },
        orderBy: {
          parcel_area: 'desc',
        },
        take: 5,
      },
      owner: {
        select: {
          avatar_uuid: true,
          first_name: true,
          last_name: true,
        },
      },
    },
    where: {
      region_name: name,
    },
  });

  return {
    props: {
      regionProps,
      ...(await AvatarHistoryChartStaticProps(name)),
      ...(await AvatarDistributionChartStaticProps(name)),
    },
  };
};

export default WithStaticProps;
