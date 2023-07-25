import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GenContext } from "./context/GenContext";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Nav from "./components/Nav";
import Nav2 from "./components/Nav2";
  
import Login from "./components/Login";
import Login2 from "./components/Login2";

import Buscar from "./components/usuarios/buscar";

import Editar from "./components/usuarios/editar";
import Editar_Formik from "./components/usuarios/editar";

import Inicio from "./components/Inicio";
import { useLocation } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";

import { Box, CssBaseline ,Container, createTheme,  ThemeProvider } from "@mui/material";

import  config  from "./config.js";

import './App.css'

// https://zenoo.github.io/mui-theme-creator/#Appbar

const defaultTheme = createTheme( 
  {
    palette: {
      type: 'light',
     
      secondary: {
        main: '#f50057',
      },
      background: {
        paper: '#ffffff',
        default: '#f9f9f9',
      },

      typography: {
        h1: {
          fontFamily:   'Roboto Slab',
        },
        h2: {
          fontFamily:   'Roboto Slab',
        },
        h3: {
          fontFamily:   'Roboto Slab',
        },
        h4: {
          fontFamily:   'Roboto Slab',
        },
        h5: {
          fontFamily:   'Roboto Slab',
        },
        h6: {
          fontFamily:   'Roboto Slab',
        },

        fontFamily: 'Roboto',
      },

    },
  } 
);

function App() {
  const { Login, setLogin } = useContext(GenContext);

  // const location = useLocation();

  useEffect(() => {
    console.log("ini:" + Login.ini);

    //  const rutaActual = location.pathname;

    // console.log("ruta" + rutaActual)

    /*
    if (Usuario.ini == 1)
      {
       
          setUsuario( prevDatos => ({ ...prevDatos, ini: 1 }));
          const navegate = useNavigate();
          navegate('/inicio');
       }
   */
  }, [Login.ini]);

  if (false) { //!Login.nombre
    console.log("SIN usuario..");

    return (
      <>
      
           <Login2 />
       
      </>
    );
  } else {
    console.log("con usuario..");
    return (
      <>
        <BrowserRouter  basename={config.baseURL} >
        <ThemeProvider theme={defaultTheme}>
  
        <CssBaseline  />
          <Container   >
          
            <Routes>
              <Route path="/Login" element={<Login2 />}>
                Login
              </Route>

              <Route path="/usuarios/buscar" element={<Buscar />}>
                Ingredientes
              </Route>
              <Route path="/usuarios/editar/:id" element={<Editar/>}>
                Editar
              </Route>
              <Route path="/inicio" element={<Inicio />}>
                Home
              </Route>
              <Route path="/" element={<Login2 />}>
                Inicio
              </Route>
             
            </Routes>
          </Container   >
         </ThemeProvider> 
        </BrowserRouter>
      </>
    );
  }
}  

export default App;
