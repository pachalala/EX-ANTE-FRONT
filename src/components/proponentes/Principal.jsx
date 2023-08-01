import { createContext, useState, useEffect } from "react";
import Nav3 from "../Nav3";
import SideBar from "../SideBar";

import { useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
 
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
  Paper, Chip, Stack
} from "@mui/material";


import Texto from "../library/Texto";
import Titulo from "../library/Titulo";


import { Perfiles } from "../library/Perfiles";

import Regiones from "../library/Regiones";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";


import { GenContext } from "../../context/GenContext";
import { useContext } from "react";
import config from "../../config.js";


import { propuesta } from "../../data/propuesta";

import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
const defaultTheme = createTheme();

const Principal = () => {


  const { MenuIn, setMenuIn } = useContext(GenContext);


  const [open, setOpen] = useState(false);



  const [alertSaved, setalertSaved] = useState(false);


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


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Nav3 />

        <Toolbar />

        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>

          <Toolbar />
          <Paper sx={{ flexGrow: 1, p: 1 }}>

            <Titulo texto="Propuesta - Inicio " />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left", fontWeight: 'bold'
              }}
            >

              <div>
                <TextField
                  margin="normal"
                  InputLabelProps={{ shrink: true }}

                  sx={{
                    m: 1, width: '50ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}
                  InputProps={{
                    readOnly: true
                  }}
                  label="Código"


                  variant="filled"
                  {...register("codigo")}


                />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                  margin="normal"
                  fullWidth
                  variant="filled"
                  sx={{
                    m: 1, width: '50ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}
                  label="Territorio"

                  {...register("territorio")}

                />

              </div>
              <TextField
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
                variant="filled"
                sx={{
                  m: 1, width: '102ch', "& .MuiFilledInput-root": {
                    background: "rgb(232, 241, 250)"
                  }
                }}

                label="Nombre Propuesta"

                {...register("nombre")}

              />

              <div>


                <TextField

                  sx={{
                    m: 1, width: '27ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                  margin="normal"

                  variant="filled"

                  label="RUT Proponente"

                  {...register("rut")}

                />


                <TextField

                  sx={{
                    m: 1, width: '73ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}


                  margin="normal"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                  label="Nombre Proponente"

                  {...register("proponente")}

                />



              </div>



              <div>
                <TextField

                  sx={{
                    m: 1, width: '50ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}



                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                  margin="normal"
                  fullWidth
                  variant="filled"

                  label="Admisible"

                  {...register("admisible")}

                />




                <TextField
                  sx={{
                    m: 1, width: '50ch', "& .MuiFilledInput-root": {
                      background: "rgb(232, 241, 250)"
                    }
                  }}


                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                  margin="normal"
                  fullWidth
                  variant="filled"

                  label="Puntaje"

                  {...register("puntaje")}

                />

              </div>

              <Stack direction="row" spacing={1} sx={{
                m: 2 
              }}>
                <Chip
                  icon={<EditIcon />} label="Admisibilidad" component="a"     href={"/propuestas/admisibilidad/" + id} clickable >
                    
</Chip>
                <Chip
                  icon={<EditIcon />}
                  label="Evaluación"
                  component="a"
                  href={"/propuestas/evaluacion/" + id}
                  variant="outlined"
                  clickable
                />
              </Stack>

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

export default Principal;
