import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GenContext } from "./context/GenContext";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Nav from "./components/Nav";
import Nav2 from "./components/Nav2";

import Login from "./components/Login";
import Login2 from "./components/Login2";

import Buscar from "./components/proponentes/buscar";

import Principal from "./components/proponentes/Principal"; 
import Admisibilidad from "./components/proponentes/Admisibilidad"; 


import Inicio from "./components/Inicio";
import { useLocation } from "react-router-dom"; 
import {
  Box,
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import config from "./config.js";

import "./App.css";

// https://zenoo.github.io/mui-theme-creator/#Appbar

const defaultTheme = createTheme({
  palette: {
    type: "light",

   
    primary: {
      main: '#4170B5',
      light: '#dbdbe0' 
    },

     
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#ffffff",
      default: "#f9f9f9",
    },

    typography: {
      h1: {
        fontFamily: "Roboto Slab",
      },
      h2: {
        fontFamily: "Roboto Slab",
      },
      h3: {
        fontFamily: "Roboto Slab",
      },
      h4: {
        fontFamily: "Roboto Slab",
      },
      h5: {
        fontFamily: "Roboto Slab",
      },
      h6: {
        fontFamily: "Roboto Slab",
      },

      fontFamily: "Roboto",

      subtitle1: {
        fontSize: "1.2rem",
      },
    },
  },
});

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

  if (false){ // (!Login.nombre) {
    //!Login.nombre
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
        <BrowserRouter basename={config.baseURL}>
          <ThemeProvider theme={defaultTheme}>
          <CssBaseline/>
             <Container>
              <Routes>
                <Route path="/Login" element={<Login2 />}>
                  Login
                </Route>

                <Route path="/propuestas/buscar" element={<Buscar />}>
                </Route>
                <Route path="/propuestas/principal/:id" element={<Principal />}>
                            </Route>
                 <Route path="/propuestas/admisibilidad/:id" element={<Admisibilidad />} />
                               
                <Route path="/inicio" element={<Inicio />}>
                </Route>
                <Route path="/" element={<Login2 />}>
                </Route>
              </Routes>
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
