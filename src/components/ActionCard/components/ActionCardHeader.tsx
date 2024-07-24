"use client";

import {
  CardActions,
  IconButton,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ActionCardHeader = () => {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <Box display={"flex"}>
          <CardActions>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
          </CardActions>
        </Box>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
  );
};

export default ActionCardHeader;
