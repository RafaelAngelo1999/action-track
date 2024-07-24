import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Drawer,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const ResponsibleForm = ({ open, onClose, onSubmit, responsible }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: responsible ? responsible : {},
  });

  useEffect(() => {
    reset(responsible);
  }, [responsible, reset]);

  const isEditing = !!responsible;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ margin: 2, width: 300 }}
      >
        <FormLabel>Add New Responsible</FormLabel>
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
          defaultValue={isEditing ? responsible.active : true}
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

export default ResponsibleForm;
