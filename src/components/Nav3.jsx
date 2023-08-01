import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography"; 
import Button from "@mui/material/Button"; 
import MenuItem from "@mui/material/MenuItem"; 

import { Link } from "react-router-dom";
import { GenContext } from "../context/GenContext";
import { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Nav3() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openD, setOpenD] = useState(false);
  const { Login, setLogin } = useContext(GenContext);
  const [open, setOpen] = useState(true);

  const { MenuIn, setMenuIn } = useContext(GenContext);

  const navigateTo = useNavigate();

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log("cerrando menu..");

    //  setLogin({ nombre: "", perfil: "", ini: 0 });
    setAnchorElUser(null);
    setMenuIn(true);
  };

  const linkStyle = {
    textDecoration: "none", // Elimina la decoración de texto
    color: "inherit", // Utiliza el color heredado
    cursor: "pointer", // Muestra el cursor como puntero
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open_n = Boolean(anchorEl);
  const handleClick_n = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div"></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {" "}
              <Typography variant="h5">Evaluación Ex-Ante</Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Typography variant="subtitle1" noWrap component="div">
                {Login.nombre} ({Login.perfil_nombre}) &nbsp;&nbsp; &nbsp;&nbsp;
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Link
                to="#"
                onClick={handleClick}
                style={linkStyle}
                sx={{ display: "flex", alignItems: "center" }}
              >
                Salir <ExitToAppIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={openD}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Salir"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de salir?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleYes}
            autoFocus
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Nav3;
