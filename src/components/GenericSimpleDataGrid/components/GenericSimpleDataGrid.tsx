import { Checkbox, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GenericSimpleDataGrid = ({ rows, handleEdit, handleDelete }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 500 },
    {
      field: "active",
      headerName: "Active",
      width: 130,
      renderCell: (params) => <Checkbox checked={params.value} disabled />,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            color="primary"
            aria-label="edit responsible"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
            aria-label="delete responsible"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return <DataGrid rows={rows} columns={columns} pageSize={5} />;
};
export default GenericSimpleDataGrid;
