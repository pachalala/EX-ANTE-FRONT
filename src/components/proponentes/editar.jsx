import { createContext, useState, useEffect } from "react";
import Nav2 from "../Nav2";
import {
  usuarios as d_usuarios,
  
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
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Texto from "../library/Texto";
import Titulo from "../library/Titulo";
 

import { Perfiles } from "../library/Perfiles";

import  Regiones   from "../library/Regiones";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

 
import {  GenContext } from  "../../context/GenContext"  ;
import {   useContext } from "react";
import  config  from "../../config.js";
const defaultTheme = createTheme();

const Editar = () => {


  const {MenuIn, setMenuIn} = useContext(GenContext);

  const [Nombre, setnombre] = useState("");
  const [open, setOpen] = useState(false);

  const [Nuevo, setNuevo] = useState(false);

  const [MensajeClave, setMensajeClave] = useState("");
  const [MensajeRUT, setMensajeRUT] = useState("");
  const [MensajeAlert, setMensajeAlert] = useState({visible: false, mensaje:''});
  

  const [alertSaved, setalertSaved] = useState(false);

  const [LoginValido, setLoginValido] = useState(true);
  const [NombreValido, setNombreValido] = useState(true);
  const [RutValido, setRutValido] = useState(true);
  const [PerfilValido, setPerfilValido] = useState(true);
  const [ClaveValido, setClaveValido] = useState(true);
  const [RegionValido, setRegionValido] = useState(true);
  const [ActivoValido, setActivoValido] = useState(true);

  const { id } = useParams();
  console.log("menu in11:"+ MenuIn);

  useEffect(() => {
    async function trae_datos(id) {
      try {
        const response = await fetch(`${config.backendURL}/usuarios/${id}`, {
          method: "GET",
        });

        const data_res = await response.json();
        console.log(data_res);
   

        setValue("id", data_res.usuLogin);
        setValue("login", data_res.usuLogin);
        setValue("nombre", data_res.usuNombre);
        setValue("rut", data_res.usuRut);
        setValue("perfil", data_res.usuIdrol.toString());
        setValue("region", data_res.usuRegion.toString());
        setValue("clave", data_res.usuPasswd);

        setValue("activo", data_res.usuEnable == 1 ? true : false);

        // setusuarios(data_res);

        console.log("datos leidos:" + data_res);
      } catch (error) {
        console.log(error);
      }
    }
 
    if (id != "-1") {
      setNuevo(false);
      trae_datos(id);
    } else{
      setNuevo(true);


      console.log("menu in:"+ MenuIn);

       if (MenuIn){
  
       
        setValue("id",   "");
        setValue("login",  "");
        setValue("nombre", "" );
        setValue("rut", "" );
        setValue("perfil", "" );
        setValue("region", "");
        setValue("clave", "" );
        setValue("activo",   true  );


        setLoginValido(true);
        setNombreValido(true);
        setRutValido(true);
        setPerfilValido(true);
        setClaveValido(true);
        setRegionValido(true);



        setMenuIn(false);
  
  }}
    console.log("MensajeAlert:" +  MensajeAlert.visible );
  }, [MenuIn]     );

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
      login: "",
      nombre: "",
      rut: "",
      clave: "",
      perfil: "",
      region: "",
      activo: false,
    },
  });

  const navegate = useNavigate();
 

  function validacampos(event) {
    console.log("data_event:" + JSON.stringify(event));

    console.log("useform datos:" + JSON.stringify( getValues()));

   
    setValue("rut",getValues("rut").replaceAll(".","").trim());

    const LoginValido = event.login.trim() !== "";
    const NombreValido = event.nombre.trim() !== "";
    var RutValido = event.rut.trim() !== "";
    const PerfilValido =  getValues("perfil").trim() !== "";
    var ClaveValido = event.clave.trim() !== "";
    const RegionValido = getValues("region").trim() !== "";

    if (!ClaveValido) setMensajeClave("Campo no puedes estar vacío");

    console.log(`clave:   ${event.clave}`);

    if (ClaveValido)
      if (!validarClave(event.clave.trim())) {
        setMensajeClave(
          "Clave debe tener al menos: una mayúscula, una minúscula, un número, un caracter especial. y un mínimo de 8 caracteres"
        );
        ClaveValido = false;
      }

    if (!RutValido) setMensajeRUT("Campo no puedes estar vacío");

    if (RutValido)
      if (!RutValidator(event.rut.trim())) {
        setMensajeRUT("RUT inválido");
        RutValido = false;
      }

    setLoginValido(LoginValido);
    setNombreValido(NombreValido);
    setRutValido(RutValido);
    setPerfilValido(PerfilValido);
    setClaveValido(ClaveValido);
    setRegionValido(RegionValido);

    return (
      LoginValido &&
      NombreValido &&
      RutValido &&
      PerfilValido &&
      ClaveValido &&
      RegionValido
    );
  }

  const handleChange = (event) => {
    setnombre(event.target.value);
  };

 
  async function guardaDatos() {
    try {
      const response = await fetch(config.backendURL+"/usuarios", {
        method: "PUT",
        body: JSON.stringify({
       
          usuLogin:  getValues("login") ,
          usuRut:    getValues("rut")  ,
          usuIdrol:   getValues("perfil")   ,
          usuNombre:   getValues("nombre")  ,
          usuPasswd:   getValues("clave")  ,
          usuRegion:   getValues("region")  ,
          usuEnable:    getValues("activo") ? "1" : "0"  ,
 

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });


      if (response.status== "200"){
        setalertSaved(true);
        setOpen(true);
       }


     if (response.status== "400")
        setMensajeAlert({visible: true, mensaje: await response.text() });   
       
     else
 
     setMensajeAlert({visible: true, mensaje: (await response.text()).substring(0,300) });   
      
       
    } catch (error) {
      console.log(error);
    }
  }


  async function InsertaDatos() {
    try {
      const response = await fetch(config.backendURL+"/usuarios/Insert", {
        method: "POST",
        body: JSON.stringify({
       
          usuLogin:  getValues("login") ,
          usuRut:    getValues("rut")  ,
          usuIdrol:   getValues("perfil")   ,
          usuNombre:   getValues("nombre")  ,
          usuPasswd:   getValues("clave")  ,
          usuRegion:   getValues("region")  ,
          usuEnable:    getValues("activo") ? "1" : "0"  ,
          UsuNuevo: 1

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

           console.log("status:" + response.status);
      
      if (response.status== "200"){
           setalertSaved(true);
           setOpen(true);
          }

 
       if (response.status== "400")
          setMensajeAlert({visible: true, mensaje: await response.text() });   
          
      
      
       
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (event) => {
    //  event.preventDefault();

    if (validacampos(event)) {

      if (Nuevo)
         InsertaDatos();
      else
        guardaDatos();

     
       
    } else {
      console.log("Los campos no son válidos");
    }
  };

  const validarClave = (clave) => {
    const regexMayuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexCaracterEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    const cumpleLongitud = clave.length >= 8;
    const cumpleMayuscula = regexMayuscula.test(clave);
    const cumpleMinuscula = regexMinuscula.test(clave);
    const cumpleNumero = regexNumero.test(clave);
    const cumpleCaracterEspecial = regexCaracterEspecial.test(clave);

    return (
      cumpleLongitud &&
      cumpleMayuscula &&
      cumpleMinuscula &&
      cumpleNumero &&
      cumpleCaracterEspecial
    );
  };

  function RutValidator(rut) {
    // Remover cualquier caracter que no sea un dígito o la letra 'k' en minúscula
    const cleanRut = rut.replace(/[^0-9kK]/g, "").toLowerCase();

    // Verificar si el RUT tiene el formato correcto
    if (/^[0-9]{7,8}[0-9k]$/.test(cleanRut)) {
      const rutDigits = cleanRut.slice(0, -1);
      const rutVerifier = cleanRut.slice(-1);
      const verifier = calculateVerifier(rutDigits);

      // Verificar si el dígito verificador coincide
      return verifier === rutVerifier;
    } else {
      return false;
    }
  }

  function calculateVerifier(rutDigits) {
    let sum = 0;
    let multiplier = 2;

    // Calcular la suma ponderada de los dígitos del RUT
    for (let i = rutDigits.length - 1; i >= 0; i--) {
      sum += parseInt(rutDigits.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    // Calcular el dígito verificador
    const remainder = sum % 11;
    const verifier = 11 - remainder;
    return verifier === 11 ? "0" : verifier === 10 ? "k" : verifier.toString();
  }

  const handleCancel = () => {
    setOpen(false);
    navegate(-1);
  };

  function handleClick() {
    setOpen(true);
  }
  return (
    <>
         <Container
        
        >
          <Nav2 />

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
            <Titulo titulo={Nuevo ? "Crear Usuario" : "Editar Usuario"} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
 

              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={Nuevo ? false : true}
                id="login"
                label="Usuario"
                name="login"
                autoComplete="usuario"
                autoFocus
                variant="filled"
                placeholder="Ej: 11340632"
                {...register("login")}
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
                {...register("nombre")}
                placeholder="Ej: pepito los palotes"
                onChange={handleChange}
                error={!NombreValido}
                helperText={!NombreValido && "El campo no puede estar vacío"}
              />
              <TextField
                margin="normal"
                variant="filled"
                fullWidth
                id="rut"
                label="RUT"
                name="rut"
                autoComplete="rut"
                placeholder="Ej: 10340632-5"
                {...register("rut")}
                InputLabelProps={{ shrink: true }}
                error={!RutValido}
                helperText={!RutValido && MensajeRUT}
              />

              <Regiones
                id="region"
                name="region"
                control={control}
                label="Región"
                {...register("region")}
                error={!RegionValido}
                helperText={!RegionValido && "El campo no puede estar vacío"}
              />
              <Perfiles
                label="Perfil"
                id="perfil"
                name="perfil"
                control={control}
                {...register("perfil")}
                error={!PerfilValido}
                helperText={!PerfilValido && "El campo no puede estar vacío"}
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                margin="normal"
                fullWidth
                variant="filled"
                id="clave"
                label="Clave"
                name="clave"
                {...register("clave")}
                placeholder="Ej: Eh_1134905"
                error={!ClaveValido}
                helperText={!ClaveValido && MensajeClave}
              />
              <Box
                sx={{
                  alignItems: "left",
                }}
              >
                <FormControlLabel
                  control={
                    <input
                      type="checkbox"
                      name="activo"
                      id="activo"
                      defaultChecked = "true"
                      {...register("activo")}
                    />
                  }
                  label="Activo"
                  sx={{ mb: 3, mt: 2 }}
                  labelPlacement="start"
                />
              </Box>
              {alertSaved ? (
                <Alert sx={{ mb: 3, width: "100%" }} severity="success">
                  Usuario guardado OK
                </Alert>
              ) : (
                <></>
              )}
 
              {MensajeAlert.visible ? (
                <Alert sx={{ mb: 3, width: "100%" }} severity="error">
                  {MensajeAlert.mensaje}
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
                  sx={{ mx: 3, mb: 4 }}
                  onClick={handleCancel}
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
          <DialogTitle id="alert-dialog-title">{"Editar Usuario"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Usuario guardado con éxito
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              color="secondary"
              variant="outlined"
              sx={{ mx: 3, mb: 4 }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      
    </>
  );
};

export default Editar;
