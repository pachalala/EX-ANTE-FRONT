import {  Button,Alert }from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
 

import {  GenContext } from  "../context/GenContext"  ;
import {   useContext } from "react";
import CssBaseline from '@mui/material/CssBaseline';


import {  useNavigate } from 'react-router-dom';

const Login = () => {


    const {  Usuario, setUsuario   } = useContext(GenContext);


    const [  alert, setalert  ] = useState(false);


    

   const [data, setData] = useState([]);

   const [esTextoValido, setEsTextoValido] = useState(true);
  
   const { id } = useParams();
   const navigateTo = useNavigate ();
 

  useEffect(() => {
    /*
    const obtenerNombre = async () => {
      const response = await fetch(`http://localhost:3000/ingredientes/${id}`);
      const data = await response.json();
      console.log(`data 1:${JSON.stringify(data)}`);
   

      setData(data);
    };
    obtenerNombre();*/
  } ,[id]);

   const  validacampos  = () =>{

     const nombreval = data.nombre.trim() !== ''
     setEsTextoValido(nombreval);

     return nombreval;

   }

 

  const handleNombreChange = (event) => {
    setData({...data, nombre: event.target.value});
    
  };

    const handleSubmit = event => {
      event.preventDefault();

console.log("data:" + JSON.stringify(data));

      if (validacampos()  ) { /*
        fetch('http://localhost:3000/ingredientes', {
          method: 'POST',
          body: JSON.stringify( {id: data.id,  nombre: data.nombre}
           ),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.text)
     .then(data => console.log(data))
        .catch(error => console.log(error));*/

 ///   //    setUsuario({ nombre: data.nombre, perfil:"123", ini:1  });
  
        //navigateTo('/Inicio');
       // window.location.href = '/Inicio';
       setalert(true);
       setUsuario({ nombre: data.nombre, perfil:"123", ini:1  });
       navigateTo('/Inicio');
      } else {
        console.log('Los campos no son válidos');
      }
    };


  return (
    <div>
   <CssBaseline />
 <form onSubmit={handleSubmit}>
       
        <h2>Login</h2>

        <div>
          <TextField
             id="ID"
            label="ID"     
          
            defaultValue= " "
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
         
        <div >
          {alert ? <Alert     sx={{mb: 3}} severity='error'>Usuario o clave inválidos</Alert> : <></> }
          </div>
        <Button  type="submit" variant="contained" color="primary">Guardar</Button>
      
        <Button   variant="contained" color="secondary"   onClick={()=> navegate(-1)}>Volver</Button>

        </form>
 
    </div>
  );
};

export default Login;
