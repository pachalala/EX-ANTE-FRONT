import { createContext, useState, useEffect } from "react";
import Nav3 from "../Nav3";

import SideBar from "../SideBar";

import { usuarios as d_usuarios } from "../../data/usuarios";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Grid,
   
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Toolbar,
  Paper,
} from "@mui/material";
import Texto from "../library/Texto";
import Titulo from "../library/Titulo";

import EditIcon from "@mui/icons-material/Edit";
import Divider from '@mui/material/Divider';

import { Licitaciones } from "../library/Licitaciones";
import { useForm, Controller } from "react-hook-form";
import config from "../../config.js";

import { licitaciones } from "../../data/licitaciones";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material";

import { Link } from "react-router-dom";
const Buscar = () => {
  const [usuarios, setusuarios] = useState([]);

  const [AlertVacios, setAlertVacios] = useState(false);

  const [buscar, setbuscar] = useState(false);

  const [noEncontrado, setnoEncontrado] = useState(false);
  const [buscando, setbuscando] = useState(false);

  const [idLicitacion, setidLicitacion] = useState();
  const [propuestas, setpropuestas] = useState();

  const navegate = useNavigate();
  const theme = useTheme();


   const hcolor =  theme.palette.primary.light;
   const contrastText =  theme.palette.primary.contrastText;
   

 
console.log("font:" + theme.typography.fontWeightMedium);

  useEffect(() => {
    //   setPlatos_db(D_Platos);
    //   setPlatos_Lista(D_Platos);
    // llena_ingredientes();
    //setusuarios(d_usuarios);

    console.log(" ini context:: ");
  }, []);
 
  
 

  async function trae_datos(data) {
    setbuscando(true);

    try {
      const response = await fetch(config.backendURL + "/usuarios", {
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

      data_res.length == 0 ? setnoEncontrado(true) : setnoEncontrado(false);

      console.log("datos leidos:" + data_res);
    } catch (error) {
      console.log(error);
    }

    setbuscando(false);
  }

  const handleChange = (event) => {
     
    const d_licitacion = licitaciones.find(
      (lic) => lic.id === event.target.value
    );
     
    

    setpropuestas(d_licitacion.proyectos);

     
  };

    
  const {
    register,
    formState: { errors },

    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      licitacion: "",
    },
  });

  const columns = [
    {
      field: "Route",
      headerClassName: "super-app-theme--header",
      headerName: " ",
      width: 30,
      cellClassName: "actions",
      renderCell: (params) => {
        return (
          <><Link to={'/propuestas/principal/'+params.row.id}  style={linkStyle}>  <EditIcon     color="secondary"
           sx={{ mr: 2 }} fontSize="inherit"/>   </Link>
      </>
        );
      },
    } 
     
    ,
    {
      field: "nombre",
      headerName: "Propuesta",
      width: 250,
      headerClassName: "super-app-theme--header",
    }

    ,
    {
      field: "admisible",
      headerName: "Admisible",
      width: 150,
      headerClassName: "super-app-theme--header",
    } ,
    {
      field: "puntaje",
      headerName: "Puntaje",
      width: 248,
      headerClassName: "super-app-theme--header",
    }


  ];



  const linkStyle = {
    textDecoration: "none", // Elimina la decoración de texto
    color: "inherit", // Utiliza el color heredado
    cursor: "pointer", // Muestra el cursor como puntero
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Nav3 />
        <Toolbar />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Toolbar />
          <Paper sx={{ flexGrow: 1, p: 1 }}>
            <Titulo texto="Buscar propuesta" />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "550px",
              }}
            >



              <FormControl fullWidth variant="filled">
                  
                <InputLabel id="licitacion">Licitacion</InputLabel>
                <Select   
                  labelId="Licitacion"
                  id="licitacion"
                  {...register("licitacion")}
                  label="Seleccione una opción"
                  onChange={handleChange}
                  defaultValue=""
                >
                  {licitaciones.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
 

           
            </Box>    <Toolbar />
            

            {propuestas ? (
              <Box
              sx={{
                 
                width: 700,
                '& .super-app-theme--header': {
                  backgroundColor: theme.palette.primary.light, fontWeight: theme.typography.fontWeightMedium
                },
              }}
            >
                <DataGrid
                  getRowId={() => Math.floor(Math.random() * 100000000)}
                  rows={propuestas}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                />
              </Box>
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
