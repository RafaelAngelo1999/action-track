"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Drawer,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

const StatusActionCardForm = ({
  open,
  onClose,
  onSubmit,
  statusActionCard,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    color: yup
      .string()
      .required("Color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Color must be a valid hexadecimal code"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: statusActionCard ?? { color: "#" },
  });

  useEffect(() => {
    reset(statusActionCard);
  }, [statusActionCard, reset]);

  const isEditing = !!statusActionCard;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ margin: 2, width: 300 }}
      >
        <FormLabel>Add New Entity</FormLabel>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Color"
              error={!!errors.color}
              helperText={errors.color?.message}
              margin="normal"
            />
          )}
        />

        <Box
          sx={{
            width: "auto",
            height: "10%",
            backgroundColor: watch("color"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <Typography variant="h6">{watch("color")}</Typography>
        </Box>

        <Controller
          name="active"
          control={control}
          defaultValue={isEditing ? statusActionCard.active : true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  disabled={!isEditing} // Desabilita o checkbox se não estiver editando
                />
              }
              label="Active"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
    </Drawer>
  );
};

export default StatusActionCardForm;
