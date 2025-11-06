import { Box, Typography } from '@mui/material'
import ActivityCard from './ActivityCard'
import { useActivities } from '../../../lib/hooks/useActivities';

export default function ActivitList() {
    const { activities, isLoading } = useActivities();
    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    if(!activities || activities.length === 0) {
        return <Typography>No activities found</Typography>
    }

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 3
        }}>
            {activities.map(activity => (
                <ActivityCard
                    activity={activity}
                    key={activity.id} />
            ))}
        </Box>
    )
}
