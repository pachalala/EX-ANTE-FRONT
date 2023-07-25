import {  Button }from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import {   useNavigate } from "react-router-dom";

import {    Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import Nav2 from './Nav2'


const Ingrediente = () => {
   const [data, setData] = useState([]);

   const [esTextoValido, setEsTextoValido] = useState(true);
  
   const { id } = useParams();
   const [open, setOpen] =  useState(false);

   const navegate = useNavigate();

  useEffect(() => {
    const obtenerNombre = async () => {
      const response = await fetch(`http://localhost:5021/ingredientes/${id}`);
      const data = await response.json();
      console.log(`data 1:${JSON.stringify(data)}`);
   

      setData(data);
    };
    obtenerNombre();
  } ,[id]);

   const  validacampos  = () =>{

     const nombreval = data.nombre.trim() !== ''
     setEsTextoValido(nombreval);

     return nombreval;

   }

   const handleCancel = () => {
    navegate(-1);
    //setOpen(false);
  };


  const handleNombreChange = (event) => {
    setData({...data, nombre: event.target.value});
    
  };

    const handleSubmit = event => {
      event.preventDefault();

console.log("data:" + JSON.stringify(data));

      if (validacampos()  ) {
        fetch('http://localhost:5021/ingredientes', {
          method: 'PUT',
          body: JSON.stringify( {id: data.id,  nombre: data.nombre}
           ),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.text)
     .then(data => console.log(data))
        .catch(error => console.log(error));

        setOpen(true); // levanta popup

      } else {
        console.log('Los campos no son válidos');
      }
    };


  return (
    <div>

 <form onSubmit={handleSubmit}>
 <Nav2/>
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
              
            id="NOMBRE"
            label="Nombre"
             value= {data.nombre}
             defaultValue=" "
            variant="outlined"
            onChange={handleNombreChange}
            sx={{mb: 3}}
            error={!esTextoValido}
            helperText={!esTextoValido && 'El campo no puede estar vacío'}
          />
        </div>
         

        <Button  type="submit" variant="contained" color="primary">Guardar</Button>
      
        <Button   variant="contained" color="secondary"   onClick={()=> navegate(-1)}>Volver</Button>

        </form>
 



        <Dialog
open={open}
onClose={handleCancel}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
  {"Guardar Datos"}
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    Ingrediente guardado con éxito
  </DialogContentText>
</DialogContent>
<DialogActions>
 
  <Button onClick={handleCancel} autoFocus>
    OK
  </Button>
</DialogActions>
</Dialog>


    </div>






  );
};

export default Ingrediente;
