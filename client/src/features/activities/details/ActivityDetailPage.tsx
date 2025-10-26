import { Grid, Typography } from "@mui/material"
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailHeader from "./ActivityDetailsHeader";
import ActivityDetailInfo from "./ActivityDetailsInfo";
import ActivityDetailChat from "./ActivityDetailsChat";
import ActivityDetailSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) {
        return <Typography>Loading...</Typography>
    }

    if (!activity) {
        return <Typography>Activity not found</Typography>
    }

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailSidebar />
            </Grid>
        </Grid>
    )
}
