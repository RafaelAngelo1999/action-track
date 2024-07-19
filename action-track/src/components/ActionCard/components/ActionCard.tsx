"use client";

import { Card, Divider } from "@mui/material";
import ActionCardHeader from "./ActionCardHeader";
import ActionCardContent from "./ActionCardContent";
import ActionCardFooter from "./ActionCardFooter";

const ActionCard = () => {
  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
        <ActionCardHeader />
        <Divider />
        <ActionCardContent />
        <Divider />
        <ActionCardFooter />
      </Card>
    </>
  );
};

export default ActionCard;
