"use client";

import React, { useEffect, useState } from "react";
import {
  getAllStatusActionCards,
  deleteStatusActionCard,
  addStatusActionCard,
  updateStatusActionCard,
} from "@/services/statusActionCardService";
import { Button } from "@mui/material";
import StatusActionCardForm from "./StatusActionCardForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import StatusActionCardDataGrid from "./StatusActionCardDataGrid";

const StatusActionCardList = () => {
  const [statusActionCards, setStatusActionCards] = useState([]);
  const [drawerEditOpen, setDrawerEditOpen] = useState(false);
  const [drawerDeleteOpen, setDrawerDeleteOpen] = useState(false);
  const [editingStatusActionCard, setEditingStatusActionCard] = useState(null);
  const [deletingStatusActionCard, setDeletingStatusActionCard] =
    useState(null);

  useEffect(() => {
    const fetchStatusActionCards = async () => {
      const statusActionCardsData = await getAllStatusActionCards();
      setStatusActionCards(statusActionCardsData as any);
    };

    fetchStatusActionCards();
  }, []);

  useEffect(() => {
    const resetStateIfDrawerClosed = (drawerOpen, setState) => {
      if (!drawerOpen) {
        setState(null);
      }
    };

    resetStateIfDrawerClosed(drawerEditOpen, setEditingStatusActionCard);
    resetStateIfDrawerClosed(drawerDeleteOpen, setDeletingStatusActionCard);
  }, [drawerEditOpen, drawerDeleteOpen]);

  const handleMaintenance = async (data) => {
    const isEditing = !!editingStatusActionCard;

    if (!isEditing) {
      onCreate(data);
    } else {
      onEdit(data.id, data);
    }

    setDrawerEditOpen(false);
  };

  const handleDelete = async (id) => {
    const statusActionCard = statusActionCards.find(
      (statusActionCard) => statusActionCard.id === id
    );
    setDeletingStatusActionCard(statusActionCard);
    setDrawerDeleteOpen(true);
  };

  const handleEdit = (id) => {
    const statusActionCard = statusActionCards.find(
      (statusActionCard) => statusActionCard.id === id
    );
    setEditingStatusActionCard(statusActionCard);
    setDrawerEditOpen(true);
  };

  const onDelete = async (id) => {
    await deleteStatusActionCard(id);
    setStatusActionCards(
      statusActionCards.filter((statusActionCard) => statusActionCard.id !== id)
    );
  };

  const onCreate = async (data) => {
    const idNewReposible = await addStatusActionCard(data);
    const newReposible = { id: idNewReposible, ...data };
    setStatusActionCards([newReposible, ...statusActionCards]);
  };

  const onEdit = async (id, data) => {
    await updateStatusActionCard(id, data);

    setStatusActionCards(
      statusActionCards.map((statusActionCard) =>
        statusActionCard.id === id
          ? { ...statusActionCard, ...data }
          : statusActionCard
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
        Add New StatusActionCard
      </Button>
      <StatusActionCardForm
        open={drawerEditOpen}
        onClose={() => setDrawerEditOpen(false)}
        onSubmit={handleMaintenance}
        statusActionCard={editingStatusActionCard}
      />
      <DeleteConfirmation
        open={drawerDeleteOpen}
        onClose={() => setDrawerDeleteOpen(false)}
        onDelete={onDelete}
        itemId={deletingStatusActionCard?.id}
        itemDescription={"statusActionCard"}
      />
      <StatusActionCardDataGrid
        rows={statusActionCards}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default StatusActionCardList;
