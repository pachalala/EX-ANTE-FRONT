import {  Button }from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';



const Ingrediente =   () => {

  const { id } = useParams();
  const [nombre, setNombre] = useState('');

 

  const obtenerNombre = async () => {
    const response = await fetch(`http://localhost:3000/ingredientes/${id}`);

     var data = await response.json();
     console.log(`data 1:${JSON.stringify(data)}`);
   
   
    setNombre(data.nombre);
  };


  useEffect(() => {
   
    obtenerNombre();
  }  );
  


  //console.log("paras:" + JSON.stringify(data));

  


  return (
    <div>

 
    nombre: {nombre}
     
       
        <h2>Ingrediente - </h2>

        <div>
          <TextField
            disabled
            id="ID"
            label="ID"
            defaultValue={id}
            variant="outlined"
            sx={{mb: 3}}
          />
        </div>
        <div>
          <TextField
            required
            id="NOMBRE"
            label="Nombre"
            defaultValue={nombre}
            variant="outlined"
            sx={{mb: 3}}
          />
        </div>
        <div>
          <TextField
            id="GRAMOS"
            label="Gramos"
            defaultValue=""
            variant="outlined"
            sx={{mb: 3}}
          />
        </div>

        <Button variant="contained">Contained</Button>
      
    
 
    </div>
  );
};

export default Ingrediente;
