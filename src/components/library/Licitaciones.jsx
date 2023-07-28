import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select    from '@mui/material/Select';
 
import { Controller } from "react-hook-form";

import {   licitaciones  } from "../../data/licitaciones";

export const Licitaciones = ({
  name,
  label,
  control,
  defaultValue,
  children,  
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}  fullWidth variant="filled"  sx={{ mt: 3 }}>
      <InputLabel id={labelId}>{label}</InputLabel>


      <Controller
          render={({ field }) => (
            <Select {...field}>
            {licitaciones.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.nombre}
          </MenuItem>
        ))}
            </Select>
          )}
          control={control}
          name={name}
         
          defaultValue={defaultValue}
        />
 
     
     
    </FormControl>
  );
};
 