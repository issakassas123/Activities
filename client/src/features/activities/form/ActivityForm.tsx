import { Box, Button, Paper, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { activitySchema, type ActivitySchema } from '../../../lib/schemas/activitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import { categoryOptions } from './categoryOptions';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import LocationInput from '../../../app/shared/components/LocationInput';

export default function ActivityForm() {
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema),
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const { createActivity, updateActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city || '',
                    venue: activity.venue || '',
                    latitude: activity.latitude || 0,
                    longitude: activity.longitude || 0
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = {
            ...rest,
            ...location
        };

        try {
            if (activity) {
                await updateActivity.mutateAsync({ ...activity, ...flattenedData },
                    {
                        onSuccess: () => navigate(`/activities/${activity.id}`)
                    }
                );
            }
            else {
                await createActivity.mutateAsync(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                });
            }
        }
        catch (error) {
            console.error('Error updating activity:', error);
        }
    }

    if (isLoadingActivity) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Paper sx={{
            borderRadius: 3,
            padding: 3
        }}>
            <Typography variant='h5' gutterBottom color='primary'>
                {activity ? "Edit Activity" : "Create Activity"}
            </Typography>
            <Box component='form' onSubmit={(handleSubmit(onSubmit))} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' multiline rows={3} control={control} name='description' />
                <Box display='flex' gap={3}>
                    <SelectInput
                        label='Category'
                        control={control}
                        name='category'
                        items={categoryOptions}
                    />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>

                <LocationInput control={control} label='Enter the location' name='location' />

                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color='inherit'>Cancel</Button>
                    <Button
                        color='success'
                        variant='contained'
                        type='submit'
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
