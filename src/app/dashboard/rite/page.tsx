"use client";

import React, { useEffect, useState } from "react";
import {
  getAllRites,
  deleteRite,
  addRite,
  updateRite,
} from "@/services/riteService";
import { Button } from "@mui/material";
import RiteForm from "./RiteForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import RiteDataGrid from "./RiteDataGrid";

const RiteList = () => {
  const [rites, setRites] = useState([]);
  const [drawerEditOpen, setDrawerEditOpen] = useState(false);
  const [drawerDeleteOpen, setDrawerDeleteOpen] = useState(false);
  const [editingRite, setEditingRite] = useState(null);
  const [deletingRite, setDeletingRite] = useState(null);

  useEffect(() => {
    const fetchRites = async () => {
      const ritesData = await getAllRites();
      setRites(ritesData as any);
    };

    fetchRites();
  }, []);

  useEffect(() => {
    const resetStateIfDrawerClosed = (drawerOpen, setState) => {
      if (!drawerOpen) {
        setState(null);
      }
    };

    resetStateIfDrawerClosed(drawerEditOpen, setEditingRite);
    resetStateIfDrawerClosed(drawerDeleteOpen, setDeletingRite);
  }, [drawerEditOpen, drawerDeleteOpen]);

  const handleMaintenance = async (data) => {
    const isEditing = !!editingRite;

    if (!isEditing) {
      onCreate(data);
    } else {
      onEdit(data.id, data);
    }

    setDrawerEditOpen(false);
  };

  const handleDelete = async (id) => {
    const rite = rites.find((rite) => rite.id === id);
    setDeletingRite(rite);
    setDrawerDeleteOpen(true);
  };

  const handleEdit = (id) => {
    const rite = rites.find((rite) => rite.id === id);
    setEditingRite(rite);
    setDrawerEditOpen(true);
  };

  const onDelete = async (id) => {
    await deleteRite(id);
    setRites(rites.filter((rite) => rite.id !== id));
  };

  const onCreate = async (data) => {
    const idNewReposible = await addRite(data);
    const newReposible = { id: idNewReposible, ...data };
    setRites([newReposible, ...rites]);
  };

  const onEdit = async (id, data) => {
    await updateRite(id, data);

    setRites(
      rites.map((rite) => (rite.id === id ? { ...rite, ...data } : rite))
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
        Add New Rite
      </Button>
      <RiteForm
        open={drawerEditOpen}
        onClose={() => setDrawerEditOpen(false)}
        onSubmit={handleMaintenance}
        rite={editingRite}
      />
      <DeleteConfirmation
        open={drawerDeleteOpen}
        onClose={() => setDrawerDeleteOpen(false)}
        onDelete={onDelete}
        itemId={deletingRite?.id}
        itemDescription={"rite"}
      />
      <RiteDataGrid
        rows={rites}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default RiteList;
