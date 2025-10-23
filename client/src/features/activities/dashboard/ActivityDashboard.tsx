import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  selectedActivity?: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
  submitForm: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities, 
  selectedActivity, 
  editMode, 
  selectActivity, 
  cancelSelectActivity, 
  openForm, 
  closeForm, 
  submitForm, 
  deleteActivity
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList 
          activities={activities} 
          selectActivity={selectActivity}
          deleteActivity={deleteActivity} />
      </Grid>
      <Grid size={5}>
        {
          selectedActivity && !editMode &&
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm} />
        }

        {
          editMode && <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            submitForm={submitForm} />

        }
      </Grid>
    </Grid>
  );
}