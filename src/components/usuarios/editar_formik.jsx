import { createContext, useState, useEffect } from "react";
import Nav2 from "../Nav2";
import {
  usuarios as d_usuarios,
  regiones,
  perfiles,
} from "../../data/usuarios";
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
  ButtonGroup,  Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions
} from "@mui/material";
import Texto from "../library/Texto";
import Titulo from "../library/Titulo";
import { Regiones } from "../library/Regiones";
import { Perfiles } from "../library/Perfiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useFormik } from 'formik';

const defaultTheme = createTheme();

const Editar_Formik = () => {
  const [Nombre, setnombre] = useState("");
  const [open, setOpen] =  useState(false);
 
  

  const [alertSaved, setalertSaved] = useState(false);

  const [LoginValido, setLoginValido] = useState(true);
  const [NombreValido, setNombreValido] = useState(true); 

  const { id } = useParams();

  const [Usuario, setUsuario] = useState({
    id: 1,
    login: "login1",
    nombre: "Nombre 1",
    rut: "1-9",
    clave: "",
    perfil: 0,
    region: 0,
    activo: 0,
  });


  const formik = useFormik({
    initialValues: {
      login: '1234',
      nombre: 'foobar',
    } ,
  });

  const navegate = useNavigate();

  useEffect(() => {



    const trae_registro = async (userId) => {
        console.log(`id 1:${userId}`);
  
       return ({
        id: 1,
        login: "113406322",
        nombre: "Pepito los Palotes",
        rut: "11340632-9",
        clave: "Pepito_loveyou_123",
        perfil: 7,
        region: 1,
        activo: 0,
      });
    };

 
    console.log(`data 1:${JSON.stringify(Usuario)}`);
  }, []);



  function validacampos(event) {
    const data = new FormData(event.currentTarget);

    console.log("data:" + JSON.stringify(data));

    const LoginValido = formik.login.trim() !== "";
    const NombreValido = formik.nombre.trim() !== "";
     
    setLoginValido(LoginValido);
    setNombreValido(NombreValido);
     
    return (
      LoginValido &&
      NombreValido  
    );
  }

  const handleChange = (event) => {
    setnombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validacampos(event)) {
     

      setalertSaved(true);
      const data = new FormData(event.currentTarget);

      setOpen(true);


      console.log(data.get("nombre"));
    } else {
      console.log("Los campos no son válidos");
    }
  };

 


  
    const handleCancel = () => {
      setOpen(false);
      navegate(-1);
    };
  
  
    
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          sx={{
            backgroundColor: "#f7f9fa", // Establece un fondo gris claro
          }}
        >
          <Nav2 />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,

              border: "1px solid #ccc", // Agrega un borde de 1px sólido con color gris claro
              backgroundColor: "#ffffff",
              // Establece un fondo gris claro
              padding: "10px",
              borderRadius: "5px",
              width: "550px",
              "& .super-app-theme--header": {
                fontWeight: "bold",
                //backgroundColor: 'rgba(255, 7, 0, 0.55)',
              },
            }}
          >
            <Titulo titulo="Editar Usuario" />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="login"
                label="Usuario"
                name="login"
                autoComplete="usuario"
                autoFocus
                variant="filled"
                placeholder="Ej: 11340632"
                value={formik.login}
                onChange={formik.handleChange}
                error={!LoginValido}
                helperText={!LoginValido && "El campo no puede estar vacío"}
                sx={
                  {
                    //  backgroundColor: '#e9eff7'
                  }
                }
              />

          
              <TextField
                InputLabelProps={{ shrink: true }}
                margin="normal"
                fullWidth
                variant="filled"
                id="nombre"
                label="Nombre Usuario"
                name="nombre"
                value={formik.nombre}
                onChange={formik.handleChange}
                placeholder="Ej: pepito los palotes"
             
                error={!NombreValido}
                helperText={!NombreValido && "El campo no puede estar vacío"}
              />
 
              

               

              {alertSaved ? (
                <Alert sx={{ mb: 3, width: "100%" }} severity="success">
                  Usuario guardado OK
                </Alert>
              ) : (
                <></>
              )}

              <ButtonGroup>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ mx: 3, mb: 4 }}
                  disabled={alertSaved ? true : false}
                >
                  Guardar
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ mx: 3, mb: 4 }}  onClick={handleCancel}
                >
                  Volver
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Container>


        <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar Usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuario guardado con éxito
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCancel}     color="secondary"
                  variant="outlined"
                  sx={{ mx: 3, mb: 4 }} >Cerrar</Button>
      
        </DialogActions>
      </Dialog>

      </ThemeProvider>



   


    </>
  );
};

export default Editar_Formik;
