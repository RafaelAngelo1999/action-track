"use client";

import GenericSimpleDataGrid from "@/components/GenericSimpleDataGrid";

const RiteDataGrid = ({ rows, handleEdit, handleDelete }) => {
  return (
    <GenericSimpleDataGrid
      rows={rows}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default RiteDataGrid;
