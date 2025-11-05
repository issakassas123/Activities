import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from '@mui/material';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';

type Props<T extends FieldValues> = {
    items: { text: string; value: string }[];
} & UseControllerProps<T> & Partial<SelectProps>;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    return (
        <FormControl fullWidth variant='outlined' error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select 
                value={field.value || ''} 
                onChange={field.onChange} 
                label={props.label}

            >
                {props.items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>
                {fieldState.error ? fieldState.error.message : ''}
            </FormHelperText>
        </FormControl>
    )
}
