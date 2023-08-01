 
import Avatar from "@mui/material/Avatar";
import { Button, Alert, AlertTitle } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useState, useEffect, useContext } from "react";

import { GenContext } from "../context/GenContext";

import { useNavigate } from "react-router-dom";
import  config  from "../config.js";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login2() {
  const { Login, setLogin } = useContext(GenContext);

  const [esnombreValido, setesnombreValido] = useState(true);
  const [buscando, setbuscando] = useState(false);

  const [esclaveValido, setesclaveValido] = useState(true);

  const [alert, setalert] = useState({ on: false, tit: "", msg: "" });

  const defaultTheme = createTheme();

   const navigateTo = useNavigate();

  useEffect(() => { 
    setLogin({});

    console.log(" ini context:: ");
    
  }, []);

 

  const validacampos = (event) => {
    const data = new FormData(event.currentTarget);
    const nombrEval = data.get("usuario").trim() !== "";
    const claveEval = data.get("clave").trim() !== "";

    setesnombreValido(nombrEval);
    setesclaveValido(claveEval);

    return nombrEval && claveEval;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("data:" + JSON.stringify(data));

    const data = new FormData(event.currentTarget);

    if (!validacampos(event)) {
      console.log("Los campos no son válidos");

      return;
    }

    setbuscando(true);

    try {
      /*
      const response = await fetch(config.backendURL+"/Acceso", {
        method: "POST",
        body: JSON.stringify({
          usuario: data.get("usuario"),
          clave: data.get("clave"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data_res = await response.json();
      */

      const data_res = {
            res: 1,
            usuario: { nombre: "Perico los Palotes", perfil: 3, perfil_nombre: "Evaluador", ini:1 }

      }

      console.log("data:" + JSON.stringify(data_res));
      

      if (data_res.res != -1) {
        setLogin({ nombre: data_res.usuario.nombre, perfil: data_res.usuario.perfil, perfil_nombre:  data_res.usuario.perfil_nombre , ini: 1 });
      navigateTo("/inicio");
      } else
        setalert({
          on: true,
          tit: "Alerta",
          msg: data_res.msg ,
        });

       

    } catch (error) {
      console.log("ERROR: ", error);
      setalert({
        on: true,
        tit: "ERROR",
        msg: "Error en conexión, chequear Red de datos.",
      });
    }
    setbuscando(false);
   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <div align="center">
        <Container
          component="main"
          sx={{
            alignSelf: "center",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
            }}
          >
            <img src="../assets/Logo_FOSIS.png"  ></img>
              <Typography component="h1" variant="h5">
              Evaluación Ex Ante
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Nombre Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
                error={!esnombreValido}
                helperText={!esnombreValido && "El campo no puede estar vacío"}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="clave"
                label="Clave"
                type="password"
                id="clave"
                autoComplete="current-password"
                error={!esclaveValido}
                helperText={!esclaveValido && "El campo no puede estar vacío"}
              />

              <div>
                {alert.on ? (
                  <Alert sx={{ mb: 3 }} severity="error">
                    {alert.msg}
                  </Alert>
                ) : (
                  <></>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!buscando ? "Ingresar" : "Buscando.."}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
