"use client";

import React, { useEffect, useState } from "react";
import {
  getAllResponsibles,
  deleteResponsible,
  addResponsible,
  updateResponsible,
} from "@/services/responsibleService";
import { Button } from "@mui/material";
import ResponsibleForm from "./ResponsibleForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ResponsibleDataGrid from "./ResponsibleDataGrid";

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
      />
      <DeleteConfirmation
        open={drawerDeleteOpen}
        onClose={() => setDrawerDeleteOpen(false)}
        onDelete={onDelete}
        itemId={deletingResponsible?.id}
        itemDescription={"responsible"}
      />
      <ResponsibleDataGrid
        rows={responsibles}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ResponsibleList;
