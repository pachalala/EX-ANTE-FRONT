import { createContext, useState, useEffect } from "react";
import Nav3 from "../Nav3";

import SideBar from "../SideBar";


import { usuarios as d_usuarios } from "../../data/usuarios";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Link,
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert, Toolbar,
  Paper,
} from "@mui/material";
import Texto from "../library/Texto";
import Titulo from "../library/Titulo";

import EditIcon from "@mui/icons-material/Edit";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Regiones from "../library/Regiones";

import { Perfiles } from "../library/Perfiles";
import { useForm, Controller } from "react-hook-form";
import  config  from "../../config.js";

const defaultTheme = createTheme();
const Buscar = () => {
  const [usuarios, setusuarios] = useState([]);

  const [AlertVacios, setAlertVacios] = useState(false);

  const [buscar, setbuscar] = useState(false);

  const [noEncontrado, setnoEncontrado] = useState(false);
  const [buscando, setbuscando] = useState(false);

  const navegate = useNavigate();

  useEffect(() => {
    //   setPlatos_db(D_Platos);
    //   setPlatos_Lista(D_Platos);
    // llena_ingredientes();
    //setusuarios(d_usuarios);

    console.log(" ini context:: ");
  }, []);

  function validacampos(event) {
    const data = new FormData(event.currentTarget);

    const usuarioValido = data.get("usuario").trim() !== "";
    const nombreValido = data.get("nombre").trim() !== "";
    const rutValido = data.get("rut").trim() !== "";
    const regionValido = data.get("region").trim() !== "";
    //const perfilValido = data.get("perfil").trim() !== "";

    console.log(usuarioValido || nombreValido || rutValido);

    setAlertVacios(
      !(usuarioValido || nombreValido || rutValido || regionValido)
    );

    return usuarioValido || nombreValido || rutValido || regionValido;
  }

  async function trae_datos(data) {

    setbuscando(true);

    try {
 

      const response = await fetch(config.backendURL+"/usuarios", {
        method: "POST",
        body: JSON.stringify({
          UsuLogin: data.get("usuario"),
          UsuNombre: data.get("nombre"),
          UsuRut: data.get("rut"),
          UsuRegion:
            data.get("region").trim() == "" ? "-1" : data.get("region"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data_res = await response.json();
      console.log(data_res);

      setusuarios(data_res);

       data_res.length==0  ?   setnoEncontrado(true) : setnoEncontrado(false) ;


      console.log("datos leidos:" + data_res);
    } catch (error) {
      console.log(error);
    }

    setbuscando(false);

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validacampos(event)) {
      const data = new FormData(event.currentTarget);
      trae_datos(data);

      // usuario, nombre, rut
      console.log(
        ` "UsuLogin": ${data.get("usuario")},  "UsuNombre":  ${
          data.nombre
        }, "UsuRut":  ${data.rut}`
      );

      /*
      const data = new FormData(event.currentTarget);
      const nombrEval = data.get('usuario').trim() !== ''
      const claveEval = data.get('clave').trim() !== ''
  */

      setbuscar(true);
    } else {
      console.log("Los campos no son válidos");
    }
  };

  const MatEdit = ({ index }) => {
    const handleEditClick = () => {
      navegate("/usuarios/editar/" + index);
    };

    return (
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleEditClick}
      >
        <EditIcon />
      </IconButton>
    );
  };

  const { control } = useForm({
    defaultValues: {
      id: 0,
      login: "",
      nombre: "",
      rut: "",
      clave: "",
      perfil: "",
      region: "",
      activo: false,
    },
  });

  const columns = [
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit index={params.row.usuLogin} />
          </div>
        );
      },
    },
    /*
"usuLogin": "10748339",
        "usuRut": "10748339-K",
        "usuIdrol": 6,
        "usuNombre": "ALVARO TAPIA CORREA",
        "usuPasswd": "Taburete2#",
        "usuEnable": "1",
        "usuRegion": 5,

*/
    {
      field: "usuLogin",
      headerName: "Login",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "usuRut",
      headerName: "Rut",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "usuNombre",
      headerName: "Nombre",
      width: 420,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "usuRegion",
      headerName: "Región",
      width: 60,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>


 

        <Box sx={{ display: "flex" }}>
        <Nav3 />
        <Toolbar />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Toolbar />
          <Paper sx={{ flexGrow: 1, p: 1 }}>
    
            <Titulo titulo="Buscar Usuario" />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "550px",
              }}
            >
              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="usuario"
                label="Login Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
                variant="filled"
                placeholder="Ej: 11340632"
                sx={
                  {
                    //  backgroundColor: '#e9eff7'
                  }
                }
              />

              <TextField
                margin="normal"
                fullWidth
                id="nombre"
                label="Nombre Usuario"
                name="nombre"
                autoComplete="nombre"
                InputLabelProps={{ shrink: true }}
                variant="filled"
                placeholder="Ej: pepito los palotes"
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                margin="normal"
                variant="filled"
                fullWidth
                id="rut"
                label="RUT"
                name="rut"
                autoComplete="rut"
                placeholder="Ej: 11340632-1"
              />

              <Regiones
                id="region"
                name="region"
                label="Región"
                control={control}
              />
              {AlertVacios ? (
                <Alert sx={{ mb: 3, width: "100%" }} severity="error">
                  Debe existir algún campo de búsqueda
                </Alert>
              ) : (
                <></>
              )}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 4 }}
              >
                    {!buscando ? "Buscar" : "Cargando.."}
              </Button>
            </Box>

            {buscar && !noEncontrado ? (
              <div style={{ width: 800 }}>
                <DataGrid
                  getRowId={() => Math.floor(Math.random() * 100000000)}
                  rows={usuarios}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <></>
            )}

            {noEncontrado ? "No encontrado.." : ""}
            </Paper>
          </Box>
          </Box>
     
    </>
  );
};

export default Buscar;
