import { createContext, useState, useEffect } from "react";
import Nav3 from "../Nav3";
import SideBar from "../SideBar";



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
  Alert,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Checkbox, Toolbar,
  Paper, Chip, Stack, 
} from "@mui/material";


import Texto from "../library/Texto";
import Titulo from "../library/Titulo";


import { admi_datos } from "../../data/admi_datos";

import Regiones from "../library/Regiones";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";


import { GenContext } from "../../context/GenContext";
import { useContext } from "react";
import config from "../../config.js";
import { useTheme } from "@mui/material";

import { propuesta } from "../../data/propuesta";

import EditIcon from "@mui/icons-material/Edit";

const defaultTheme = createTheme();

const Admisibilidad = () => {


  const { MenuIn, setMenuIn } = useContext(GenContext);


  const [open, setOpen] = useState(false);



  const [alertSaved, setalertSaved] = useState(false);
  const theme = useTheme();

  const { id } = useParams();
  console.log("menu in11:" + MenuIn);

  useEffect(() => {
    async function trae_datos(id) {
      try {
        /*
        const response = await fetch(`${config.backendURL}/usuarios/${id}`, {
          method: "GET",
        });

        const data_res = await response.json();
        */
        const data_res = propuesta;






        setValue("id", data_res.usuLogin);
        setValue("codigo", data_res.codigo);
        setValue("nombre", data_res.nombre);

        setValue("proponente", data_res.proponente);

        setValue("rut", data_res.rut);
        setValue("territorio", data_res.territorio);
        setValue("admisible", data_res.admisible);
        setValue("puntaje", data_res.puntaje);




        console.log("datos leidos:" + data_res);
      } catch (error) {
        console.log(error);
      }
    }

    trae_datos(id);
  }
    , []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      id: 0,
      codigo: "1-111-11",
      nombre: "",
      RUT: "",
      proponente: "",
      perfil: "",
      region: "",
      activo: false,
    },
  });

  const navegate = useNavigate();






  const handleCancel = () => {
    setOpen(false);
    navegate(-1);
  };



  const columns = [
  
    {
      field: "sigla",
      headerName: "N°",
      width: 50,
      headerClassName: "super-app-theme--header",
    }

    ,
    {
      field: "nombre",
      headerName: "ITEM",
      width: 900,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "texto_valor",
      headerName: "Clasificación",
      width: 100,
      headerClassName: "super-app-theme--header",
      valueOptions: ['Sí', 'No', 'Doc no entregado'],
      editable: true,
      type: 'singleSelect'
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

            <Titulo texto="Propuesta - Admisibilidad " />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left", fontWeight: 'bold', "& .MuiFilledInput-root": {
                  background: "rgb(255, 255, 255)"
                }
              }}
            >


              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}

                sx={{
                  m: 1, width: '50ch'

                }}
                InputProps={{
                  readOnly: true, disableUnderline: true
                }}
                label="Código"


                variant="filled"
                {...register("codigo")}


              />


              <Box
                sx={{

                  width: 1102,
                  '& .super-app-theme--header': {
                    backgroundColor: theme.palette.primary.light, fontWeight: theme.typography.fontWeightMedium
                  }

                }}
              >
                <DataGrid
 
                  sx={{
                   "& .MuiDataGrid-cellContent": {
                      whiteSpace: "normal",
                      lineHeight: "normal",
                      // Forced to use important since overriding inline styles
                      height: "unset !important",
                      maxHeight: "168px !important",
                      wordwrap: "break-word" ,
                        
                   }

                  }}
                  editMode="row"
                  getRowId={() => Math.floor(Math.random() * 100000000)}
                  rows={admi_datos}
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

              {  JSON.stringify(  admi_datos) }

              <ButtonGroup sx={{
                m: 3
              }}>


                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ mx: 3, mb: 4 }}
                  onClick={handleCancel}
                >
                  Volver
                </Button>
              </ButtonGroup>
            </Box>

          </Paper>
        </Box>
      </Box>


    </>
  ); 
};

export default Admisibilidad;
