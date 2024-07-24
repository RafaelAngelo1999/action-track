"use client";

import { Typography, IconButton, Box } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

const ActionCardFooter = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="subtitle1" p={2}>
        Check de Operações
      </Typography>
      <IconButton aria-label="delete">
        <UpdateIcon />
      </IconButton>
      <Typography variant="h6" p={2} ml={-2}>
        05/01/2024
      </Typography>
    </Box>
  );
};

export default ActionCardFooter;
