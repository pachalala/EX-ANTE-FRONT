import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

import {   regiones } from "../../data/usuarios";
import MenuItem from "@mui/material/MenuItem";


const Region_c = ({
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
            {regiones.map((option) => (
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
export default Region_c;  