import { Box, debounce, List, ListItemButton, TextField, Typography } from '@mui/material';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type Props<T extends FieldValues> = {
    label?: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        }
        else {
            setInputValue(field.value || '');
        }
    }, [field.value]);

    const locationIQApiKey = "https://api.locationiq.com/v1/autocomplete?key=pk.771c05934c3e5dd8b79d3bf1aab92ce5&&limit=5&dedupe=1&";//import.meta.env.VITE_LOCATIONIQ_API_KEY;
    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<LocationIQSuggestion[]>(`${locationIQApiKey}q=${encodeURIComponent(query)}`);
                setSuggestions(response.data);
            }
            catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
            finally {
                setLoading(false);
            }
        }, 500), [locationIQApiKey]
    );

    const handleChange = async (value: string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    };

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village || '';
        const venue = location.display_name || '';
        const latitude = parseFloat(location.latitude);
        const longitude = parseFloat(location.longtitude);
        setInputValue(venue);
        
        field.onChange({ city, venue, latitude, longitude });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
            />

            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{ border: 1 }}>
                    {suggestions.map((suggestion: LocationIQSuggestion) => (
                        <ListItemButton
                            key={suggestion.place_id}
                            divider
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    )
}
