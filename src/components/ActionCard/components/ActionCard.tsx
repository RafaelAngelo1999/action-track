"use client";

import { Card, Divider } from "@mui/material";
import ActionCardHeader from "./ActionCardHeader";
import ActionCardContent from "./ActionCardContent";
import ActionCardFooter from "./ActionCardFooter";
import ActionCardProgress from "./ActionCardProgress";

const ActionCard = () => {
  return (
    <>
      <Card sx={{ maxWidth: 350 }} sx={{ marginX: "8px" }}>
        <ActionCardHeader />
        <Divider light />
        <ActionCardContent />
        <Divider light />
        <ActionCardProgress />
        <Divider light />
        <ActionCardFooter />
      </Card>
    </>
  );
};

export default ActionCard;
