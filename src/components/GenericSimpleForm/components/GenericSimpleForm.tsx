import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Drawer,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const GenericSimpleForm = ({
  open,
  onClose,
  onSubmit,
  entity,
  schema,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: entity ? entity : defaultValues,
  });

  useEffect(() => {
    reset(entity);
  }, [entity, reset]);

  const isEditing = !!entity;

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
          name="active"
          control={control}
          defaultValue={isEditing ? entity.active : true}
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

export default GenericSimpleForm;
