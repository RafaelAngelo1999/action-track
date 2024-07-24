import ActionCard from "@/components/ActionCard";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <Grid>
      <Grid container>
        <Grid item xs={6} sm={4} md={3}>
          <ActionCard />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ActionCard />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ActionCard />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ActionCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
