import DataTable from '../DataTable';

const TrendingAttachments = (props: any) => {
  const { data } = props.trendingAttachmentsStaticProps;

  const columns = [
    {
      name: 'Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'Current Week Count',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Previous Week Count',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Increase',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
    {
      name: 'Δ Percentage',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
  ];

  return (
    <DataTable
      title={'Trending Attachments'}
      data={data}
      columns={columns}
      options={{
        tableId: 'trending-attachments',
        filter: false,
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Delta Percentage',
          direction: 'desc',
        },
      }}
    />
  );
};

export default TrendingAttachments;
