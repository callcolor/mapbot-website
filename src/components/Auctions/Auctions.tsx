import { MUIDataTableColumnDef } from 'mui-datatables';
import Link from 'next/link';
import { formatInt } from '../../../utils/formatters';
import DataTable from '../DataTable';
import { Auction } from './AuctionsStaticProps';

const Auctions = (props: any) => {
  const { auctions } = props;
  const data = auctions.map((a: Auction) => {
    return [
      a.region,
      a.maturity,
      a.continent_name,
      a.size,
      a.winning_bid,
      a.l_per_sqm,
      a.bidders,
      a.end_date,
      [
        a.region,
        a.location_x,
        a.location_y,
        `https://map.secondlife.com/map-1-${a.region_x}-${a.region_y}-objects.jpg`,
      ],
    ];
  });

  const columns: MUIDataTableColumnDef[] = [
    {
      name: 'Region',
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
      name: 'Continent',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Size',
      options: {
        filter: true,
        filterOptions: {
          names: [
            '16 - 1024',
            '1024 - 2048',
            '2048 - 4096',
            '4096 - 8192',
            '8192 - 16384',
            '16384 - 32768',
            '32768 - 65536',
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
        sort: true,
      },
    },
    {
      name: 'Winning Bid',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => {
          return `L$${formatInt(value)}`;
        },
      },
    },
    {
      name: 'L$ per sqm',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => {
          return `L$${formatInt(value, 2)}`;
        },
      },
    },
    {
      name: 'Bidders',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'End Date',
      options: {
        filter: false,
        sort: true,
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
      title={'Auction History'}
      data={data}
      columns={columns}
      options={{
        tableId: 'auction-history-list',
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'End Date',
          direction: 'desc',
        },
        print: false,
      }}
    />
  );
};

export default Auctions;
