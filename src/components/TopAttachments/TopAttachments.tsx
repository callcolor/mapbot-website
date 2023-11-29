import DataTable from '../DataTable';

const TopAttachments = (props: any) => {
  const { data } = props.topAttachmentsStaticProps;

  const columns = [
    {
      name: 'Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'Attachment Point',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Daily Count',
      options: {
        filter: false,
        sort: true,
        sortDescFirst: true,
      },
    },
  ];

  return (
    <DataTable
      title={'Top Attachments'}
      data={data}
      columns={columns}
      options={{
        tableId: 'top-attachments',
        filterType: 'checkbox',
        selectableRows: 'none',
        sortOrder: {
          name: 'Daily Count',
          direction: 'desc',
        },
      }}
    />
  );
};

export default TopAttachments;
