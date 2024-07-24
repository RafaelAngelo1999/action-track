import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const DeleteConfirmation = ({ open, onClose, onDelete, responsible }) => {
  const handleDelete = () => {
    onDelete(responsible.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Reponsible</DialogTitle>
      <DialogContent>
        <WarningIcon color="error" style={{ fontSize: 40 }} />
        <Typography variant="body1" style={{ marginTop: 10 }}>
          Are you sure you want to delete this reponsible?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No, cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Yes, I'm sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
