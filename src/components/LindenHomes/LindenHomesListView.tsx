import { MUIDataTableColumnDef } from 'mui-datatables';
import Link from 'next/link';
import DataTable from '../DataTable';
import { LindenHomeRegion } from './LindenHomesStaticProps';

const LindenHomesListView = (props: any) => {
  const { lindenHomes } = props;
  const data = lindenHomes.map((d: LindenHomeRegion) => {
    return [
      d.region_name,
      d.continent_name,
      d.linden_homes.length,
      d.parcel_area,
      [
        d.region_name,
        d.region_x,
        d.region_y,
        `https://map.secondlife.com/map-1-${d.region_x}-${d.region_y}-objects.jpg`,
      ],
    ];
  });

  const columns: MUIDataTableColumnDef[] = [
    {
      name: 'Region Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return <Link href={`/regions/${encodeURIComponent(value)}`}>{value}</Link>;
        },
      },
    },
    {
      name: 'Subcontinent',
      options: {
        filter: true,
        sort: true,
        filterList: [
          'Alpinisseria',
          'Fantasseria',
          'Loglands',
          'New Islands',
          'Newbrooke',
          'Old Belli',
          'Sakurasseria',
          'Southern Houseboats',
          'Squishy Pickle',
          'Stiltland',
          'The Pickle',
          'Victorians',
        ],
      },
    },
    {
      name: 'Available Homes',
      options: {
        filter: false,
        sort: true,
        // customBodyRender: (linden_homes: LindenHomeRegion['linden_homes']) => {
        //   return linden_homes.map((h) => (
        //     <p key={h.parcel_id} style={{ padding: '0px' }}>
        //       {h.parcel_center_x}, {h.parcel_center_y}
        //     </p>
        //   ));
        // },
      },
    },
    {
      name: 'Area',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Region Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a
              href={`https://maps.secondlife.com/secondlife/${value[0]}/${value[1]}/${value[2]}/30`}
              target="_blank"
              rel="noreferrer"
            >
              <picture>
                <img alt="Region" width="50" height="50" src={`${value[3]}`} />
              </picture>
            </a>
          );
        },
      },
    },
  ];

  return (
    <DataTable
      title={'Linden Homes'}
      data={data}
      columns={columns}
      options={{
        tableId: 'linden-homes-list',
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Region Name',
          direction: 'asc',
        },
        print: false,
      }}
    />
  );
};

export default LindenHomesListView;
