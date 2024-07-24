"use client";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";

const ActionCardProgress = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <Box p={2}>
        <Typography id="input-slider" gutterBottom>
          Progresso
        </Typography>
        <Box display={"flex"}>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={10}
            marks
            min={0}
            max={110}
          />
          <FormControlLabel
            sx={{ paddingLeft: 2, marginTop: -2 }}
            control={<Checkbox {...label} defaultChecked color="success" />}
            label="Concluido"
          />
        </Box>
      </Box>
    </>
  );
};

export default ActionCardProgress;
