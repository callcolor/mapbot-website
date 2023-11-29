import { MUIDataTableColumnDef } from 'mui-datatables';
import Link from 'next/link';
import { formatInt } from '../../../utils/formatters';
import DataTable from '../DataTable';
import { SandboxParcels } from './SandboxParcelsStaticProps';

const SandboxParcels = (props: any) => {
  const { sandboxParcels } = props;
  const data = sandboxParcels.map((d: SandboxParcels) => {
    return [
      d.region_name,
      d.access_name,
      d.available_prims,
      d.parcel_dwell,
      [
        d.region_name,
        d.parcel_center_x,
        d.parcel_center_y,
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
      name: 'Maturity',
      options: {
        filter: true,
        sort: true,
        filterList: ['Adult', 'General', 'Moderate'],
      },
    },
    {
      name: 'Available Prims',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'Traffic',
      options: {
        filter: true,
        sort: true,
        sortDescFirst: true,
        filterOptions: {
          names: [
            '0 - 1024',
            '1024 - 2048',
            '2048 - 4096',
            '4096 - 8192',
            '8192 - 16384',
            '16384 - 65536',
          ],
          logic: (prop: string, filters: string[], row?: any[]) => {
            if (!filters.length) return false;
            for (const filter of filters) {
              const low = Number(filter.split(' - ')[0]);
              const high = Number(filter.split(' - ')[1]);
              const value = Number(prop);
              if (value >= low && value <= high) return false;
            }
            return true;
          },
        },
      },
    },
    {
      name: 'Region Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => {
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
      title={'Sandbox Land'}
      data={data}
      columns={columns}
      options={{
        tableId: 'sandbox-land-list',
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Available Prims',
          direction: 'desc',
        },
        print: false,
      }}
    />
  );
};

export default SandboxParcels;
