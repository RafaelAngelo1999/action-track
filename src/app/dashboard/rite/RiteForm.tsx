"use client";

import GenericSimpleForm from "@/components/GenericSimpleForm";
import * as yup from "yup";

const RiteForm = ({ open, onClose, onSubmit, rite }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  return (
    <GenericSimpleForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      entity={rite}
      schema={schema}
      defaultValues={{}}
    />
  );
};
export default RiteForm;
