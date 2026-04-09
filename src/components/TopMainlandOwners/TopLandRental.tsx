import DataTable from '../DataTable';
import { TopLandRentalData } from './TopLandRentalStaticProps';

const TopLandRental = (props: any) => {
  const topLandRentalStaticProps = props.topLandRentalStaticProps as TopLandRentalData[];

  const data = topLandRentalStaticProps.map((d) => [d.region_count, [d.name, d.uuid], d.url]);

  const columns = [
    {
      name: 'Region Estimate',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return <a href={`secondlife:///app/agent/${value[1]}/about`}>{value[0]}</a>;
        },
      },
    },
    {
      name: 'URL',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return (
            <a target="_blank" href={value} rel="noreferrer">
              {value}
            </a>
          );
        },
      },
    },
  ];

  return (
    <DataTable
      title={'Top Land Rental Companies'}
      data={data}
      columns={columns}
      options={{
        rowsPerPage: 100,
        tableId: 'top-land-rental',
        filter: false,
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Region Estimate',
          direction: 'desc',
        },
      }}
    />
  );
};

export default TopLandRental;
