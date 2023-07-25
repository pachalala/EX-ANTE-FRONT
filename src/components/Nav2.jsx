import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

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
const pages = [
  {
    name: "Inicio",
    link: "/inicio",
  },
  /* , 
  {
    name:  'Usuarios-Crear',
    link :  '/usuarios/crear'
  }
  , 
  {
    name:  'Usuarios-Buscar',
    link :  '/usuarios/buscar'
  }
  
  */
];
const settings = [
  {
    name: "Cuenta",
    link: "/inicio",
  },
  {
    name: "Salir",
    link: "/",
  },
];

function Nav2() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openD, setOpenD] = useState(false);
  const {  Login,    setLogin } = useContext(GenContext);
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
      <AppBar position="static" elevation={0}>
        <Container >
          <Toolbar  >
         
           
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".01rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
               &nbsp;&nbsp; Evaluación Ex-Ante
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page.link} style={linkStyle}>
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MESA AYUDA
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link to={page.link} key={page.name} style={linkStyle}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}

              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                id="basic-button"
                aria-controls={open_n ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open_n ? "true" : undefined}
                onClick={handleClick_n}
              >
                Evaluaciones
              </Button>

              <Menu
                sx={{ width: 320, maxWidth: "100%" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open_n}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    to="/usuarios/editar/-1"
                    key="crear"
                    replace
                    style={linkStyle}
                  >
                    {" "}
                    Crear{" "}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/usuarios/buscar" key="buscar" style={linkStyle}>
                    {" "}
                    Buscar
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {Login.nombre}   ({Login.perfil_nombre}) 
            </Box>


            <Box sx={{ flexGrow: 0 }}>

            <Link to="#"   onClick={handleClick} key="login" style={linkStyle}>
                  Salir    
           </Link>

       
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
          <Button onClick={handleCancel}   color="primary"
                  variant="outlined">Cancelar</Button>
          <Button onClick={handleYes} autoFocus   color="primary"
                  variant="contained"
                >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Nav2;
