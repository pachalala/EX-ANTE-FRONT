import Nav3 from "./Nav3";
import SideBar from "./SideBar";

import {
  Grid,
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Paper,
  Breadcrumbs,
  
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import LogoutIcon from "@mui/icons-material/Logout";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useState } from "react";

import { GenContext } from "../context/GenContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";


import Titulo from "./library/Titulo";

const Inicio = () => {
  const [openD, setOpenD] = useState(false);
  const navigateTo = useNavigate();
  const { Login, setLogin } = useContext(GenContext);
  function handleClick() {
    setOpenD(true);
  }

  const handleYes = () => {
    setLogin({ nombre: "", perfil: "", perfil_nombre: "", ini: 0 });
    navigateTo("/");
    console.log("cerrando popup");
  };

  const handleCancel = () => {
    setOpenD(false);
  };

  function handleClick() {
    setOpenD(true);
  }

  const linkStyle = {
    textDecoration: "none", // Elimina la decoración de texto
    color: "inherit", // Utiliza el color heredado
    cursor: "pointer", // Muestra el cursor como puntero
  };
  /*
  <Breadcrumbs aria-label="breadcrumb">
     <Link underline="hover" color="inherit" href="/">
                Inicio
       </Link>
 </Breadcrumbs>
*/

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Nav3 />

        <Toolbar />

        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
         
          <Toolbar />
          <Paper sx={{ flexGrow: 1, p: 1 }}>
            <Titulo texto="Inicio" />
             

            <Typography subtitle1>Bienvenido {Login.nombre}</Typography>
            <Typography paragraph>
              Con tu perfil podrás realizar las siguientes acciones: <br />
              Realizar evaluaciones de propuestas a licitaciones programáticas
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Inicio;
