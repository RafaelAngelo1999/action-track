"use client";

import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllResponsibles,
  deleteResponsible,
  addResponsible,
  updateResponsible,
} from "@/services/responsibleService";
import { Button, Checkbox, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ResponsibleForm from "./ResponsibleForm";
import DeleteConfirmation from "./DeleteConfirmation";

const ResponsibleList = () => {
  const [responsibles, setResponsibles] = useState([]);
  const [drawerEditOpen, setDrawerEditOpen] = useState(false);
  const [drawerDeleteOpen, setDrawerDeleteOpen] = useState(false);
  const [editingResponsible, setEditingResponsible] = useState(null);
  const [deletingResponsible, setDeletingResponsible] = useState(null);

  useEffect(() => {
    const fetchResponsibles = async () => {
      const responsiblesData = await getAllResponsibles();
      setResponsibles(responsiblesData as any);
    };

    fetchResponsibles();
  }, []);

  useEffect(() => {
    if (!drawerEditOpen) {
      setEditingResponsible(null);
    }
  }, [drawerEditOpen]);

  useEffect(() => {
    if (!drawerDeleteOpen) {
      setDeletingResponsible(null);
    }
  }, [drawerDeleteOpen]);

  const handleMaintenance = async (data) => {
    const isEditing = !!editingResponsible;

    if (!isEditing) {
      onCreate(data);
    } else {
      onEdit(data.id, data);
    }

    setDrawerEditOpen(false);
  };

  const handleDelete = async (id) => {
    const responsible = responsibles.find(
      (responsible) => responsible.id === id
    );
    setDeletingResponsible(responsible);
    setDrawerDeleteOpen(true);
  };

  const handleEdit = (id) => {
    const responsible = responsibles.find(
      (responsible) => responsible.id === id
    );
    setEditingResponsible(responsible);
    setDrawerEditOpen(true);
  };

  const onDelete = async (id) => {
    await deleteResponsible(id);
    setResponsibles(
      responsibles.filter((responsible) => responsible.id !== id)
    );
  };

  const onCreate = async (data) => {
    const idNewReposible = await addResponsible(data);
    const newReposible = { id: idNewReposible, ...data };
    setResponsibles([newReposible, ...responsibles]);
  };

  const onEdit = async (id, data) => {
    await updateResponsible(id, data);

    setResponsibles(
      responsibles.map((responsible) =>
        responsible.id === id ? { ...responsible, ...data } : responsible
      )
    );
  };

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
          {" "}
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            color="primary"
            aria-label="edit responsible"
          >
            {" "}
            <EditIcon />{" "}
          </IconButton>{" "}
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
            aria-label="delete responsible"
          >
            {" "}
            <DeleteIcon />{" "}
          </IconButton>{" "}
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        sx={{ marginY: 3 }}
        variant="contained"
        color="primary"
        onClick={() => setDrawerEditOpen(true)}
      >
        Add New Responsible
      </Button>
      <ResponsibleForm
        open={drawerEditOpen}
        onClose={() => setDrawerEditOpen(false)}
        onSubmit={handleMaintenance}
        responsible={editingResponsible}
      />{" "}
      <DeleteConfirmation
        open={drawerDeleteOpen}
        onClose={() => setDrawerDeleteOpen(false)}
        onDelete={onDelete}
        responsible={deletingResponsible}
      />
      <DataGrid rows={responsibles} columns={columns} pageSize={5} />
    </div>
  );
};

export default ResponsibleList;
