import MUIDataTable, { MUIDataTableProps } from "mui-datatables";

const DataTable = (props: MUIDataTableProps) => {
  props = {
    ...props,
    options: {
      rowsPerPageOptions: [10, 50, 100],
      ...props.options,
    },
  };
  return <MUIDataTable {...props} />;
};

export default DataTable;
