"use client";

import GenericSimpleDataGrid from "@/components/GenericSimpleDataGrid";

const ResponsibleDataGrid = ({ rows, handleEdit, handleDelete }) => {
  return (
    <GenericSimpleDataGrid
      rows={rows}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default ResponsibleDataGrid;
