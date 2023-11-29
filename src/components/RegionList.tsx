import Link from 'next/link';
import { formatDate } from '../../utils/formatters';
import DataTable from './DataTable';

const RegionList = (props: any) => {
  const { data } = props.regionListStaticProps;
  const dataWithDates = data.map((d: any) => {
    const newD = [...d];
    newD[2] = formatDate(d[2]);
    newD[4] = formatDate(d[4]);
    newD[6] = d[5] - d[3];
    newD[7] = [d[0], d[6], d[7]];
    return newD;
  });

  const columns = [
    {
      name: 'Name',
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
      },
    },
    {
      name: 'Previous Updated',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'Previous Avatar Count',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Updated',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'Avatar Count',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Avatar Change',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'URL',
      options: {
        filter: false,
        sort: false,
        sortDescFirst: false,
        customBodyRender: (value: string) => {
          return (
            <>
              {`(`}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://maps.secondlife.com/secondlife/${value[0]}/128/128/30`}
              >
                {`${value[1]}, ${value[2]}`}
              </a>
              {`)`}
            </>
          );
        },
      },
    },
  ];

  return (
    <DataTable
      title={'Regions'}
      data={dataWithDates}
      columns={columns}
      options={{
        tableId: 'region-list',
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Avatar Change',
          direction: 'desc',
        },
      }}
    />
  );
};

export default RegionList;
