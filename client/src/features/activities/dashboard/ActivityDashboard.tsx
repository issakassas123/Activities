import { Grid } from "@mui/material";
import ActivitList from "./ActivitList";

type Props = {
  activities: Activity[]
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid container>
      <Grid size={9}>
        <ActivitList activities={activities} />
      </Grid>
    </Grid>
  );
}