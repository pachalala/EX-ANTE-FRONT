import {
  Grid, 
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,Drawer,Divider ,Toolbar
} from "@mui/material";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const opciones = [ 
    {nombre: 'Inicio', link :'/inicio'}
    
    ,{nombre: 'Evaluaciones', link: '/propuestas/buscar'}
]
  ;
  


  const linkStyle = {
    textDecoration: "none", // Elimina la decoración de texto
    color: "inherit", // Utiliza el color heredado
    cursor: "pointer", // Muestra el cursor como puntero
  };


  return (

    <Box
    component="nav"
    sx={{ width: { sm: 240 }  }}
    aria-label="mailbox folders"
  >

<Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
       
       <Toolbar>

       <ListItem key="a"  >
       <img src="../assets/Logo_FOSIS.png"  ></img>
         
        </ListItem>
       
       
        
        </Toolbar>

       <Divider />

    <List>
    
  
      

      {opciones.map((pagina, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
          <Link to={pagina.link} key={pagina.nombre} style={linkStyle}>
            
            <ListItemText primary={pagina.nombre} />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
 

   

    </Drawer>
    </Box>
  );
};

export default Sidebar;
