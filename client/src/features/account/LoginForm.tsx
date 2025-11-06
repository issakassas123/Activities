import { useAccount } from '../../lib/hooks/useAccount'
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from '../../lib/schemas/loginSchema';
import { Box, Button, Paper, Typography } from '@mui/material';
import TextInput from '../../app/shared/components/TextInput';
import { LockOpen } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {
    const { loginUser } = useAccount();
    const location = useLocation();
    const Navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                Navigate(location.state?.from || '/activities');
            }
        });
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}>

            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap={3}
                color='secondary.main'
            >
                <LockOpen fontSize='large' />
                <Typography variant='h4'>
                    Sign in
                </Typography>
            </Box>

            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' type='password' control={control} name='password' />
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant='contained'
                size='large'
            >
                Login
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <Typography
                    component={Link}
                    to='/register'
                    color='primary'
                    sx={{ ml: 2 }}
                >
                    Sign up
                </Typography>
            </Typography>
        </Paper>
    )
}