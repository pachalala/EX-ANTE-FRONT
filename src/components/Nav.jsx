import { Link } from "react-router-dom";
import { AppBar, Toolbar,Typography ,Button, Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import {  GenContext } from  "../context/GenContext"  ;
import {   useContext } from "react";
import { useState  } from 'react';
 

function Nav() {

  const {  Usuario, setUsuario   } = useContext(GenContext);
  const [open, setOpen] =  useState(false);

  const handleYes = () => {
    setUsuario({ nombre: "", perfil:""  });
  
    console.log("cerrando popup");
  };



  const handleCancel = () => {
    setOpen(false);
  };


  function handleClick() {
    setOpen(true);
     
  }


  return (
    <nav>
     
      <AppBar position="static">
        <Toolbar>
        <ul>
          <li>
            <Link to="/Inicio">Home</Link>
          </li>
          <li>
            <Link to="/ingredientes">Ingredientes</Link>
          </li>
          <li>
            <Link to="/ingrediente">Ingrediente</Link>
          </li>
        </ul>

          usuario: {Usuario.nombre}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link to="#" onClick={handleClick}>Salir</Link>
          <Link to="/ingredientes">Ingrediente</Link> <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>





      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Salir"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de querer salir?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCancel}   >Cancelar</Button>
          <Button onClick={handleYes} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>



    </nav>
  );
}

export default Nav;
