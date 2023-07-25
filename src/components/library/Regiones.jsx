import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
 
import MenuItem from "@mui/material/MenuItem";
import {  useEffect, useState, } from "react";
import  config  from "../../config.js";
const Regiones = ({
  name,
  label,
  control,
  defaultValue,
  children,  
   
}) => {

  const [regiones, setregiones] = useState([]);

  useEffect(() => {
    async function trae_datos( ) {
      try {

        const response =  await   fetch(config.backendURL+"/Regiones") ;
         
       
        const data_res = await response.json();
        console.log(data_res);
        setregiones(data_res);
        console.log("datos leidos:" + data_res);
      } catch (error) {
        console.log(error);
      }
    }
  
 
    trae_datos();
      
  }, [ ]     );
 
  

  const labelId = `${name}-label`;
  return (
    <FormControl    fullWidth variant="filled"  sx={{ mt: 3 }}>
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
export default Regiones;  