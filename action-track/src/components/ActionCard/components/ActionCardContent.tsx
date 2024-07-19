"use client";

import { CardContent, Chip, Typography, Stack } from "@mui/material";

const ActionCardContent = () => {
  return (
    <CardContent>
      <Typography variant="h5" component="div" mt={2}>
        Titulo um pouco grande
      </Typography>

      <Stack direction="row" spacing={1} mt={2}>
        <Chip color="success" label="Chip Outlined" />
        <Chip color="warning" label="Chip Outlined" />
      </Stack>
      <Typography variant="body2" mt={2}>
        well meaning and kindly. well meaning and kindly. well meaning and
        kindly. well meaning and kindly. well meaning and kindly. well meaning
        and kindly. well meaning and kindly. well meaning and kindly. well
        meaning and kindly. well meaning and kindly. well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  );
};

export default ActionCardContent;
