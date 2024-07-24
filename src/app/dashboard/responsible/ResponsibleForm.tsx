"use client";

import GenericSimpleForm from "@/components/GenericSimpleForm";
import * as yup from "yup";

const ResponsibleForm = ({ open, onClose, onSubmit, responsible }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  return (
    <GenericSimpleForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      responsible={responsible}
      schema={schema}
      defaultValues={{}}
    />
  );
};
export default ResponsibleForm;
