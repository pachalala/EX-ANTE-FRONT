import Nav2 from "./Nav2";
import SideBar from "./SideBar";

import {
  Grid,
  Link,
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Typography,AppBar,Toolbar,Paper,Breadcrumbs 
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

import LogoutIcon from '@mui/icons-material/Logout';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Inicio = () => {


  const linkStyle = {
    textDecoration: "none", // Elimina la decoración de texto
    color: "inherit", // Utiliza el color heredado
    cursor: "pointer", // Muestra el cursor como puntero
  };
/*
  <Breadcrumbs aria-label="breadcrumb">
     <Link underline="hover" color="inherit" href="/">
                Inicio
       </Link>
 </Breadcrumbs>
*/

  return (
  <>
     <Box sx={{ display: "flex" }}>
      <AppBar
       
        sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
          
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>  <Typography variant="h5">Evaluación Ex-Ante</Typography></Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
          <Typography variant="subtitle1" noWrap component="div">
          Perico los Palotes (Evaluador)   &nbsp;&nbsp; &nbsp;&nbsp;
          </Typography>
  
            </Box>
          <Box sx={{ flexGrow: 0 }}>

<Link to="#"  style={linkStyle}   sx={{ display: 'flex', alignItems: 'center' }} >
      Salir      <ExitToAppIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
</Link>


</Box>

        </Toolbar>
      </AppBar>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1,   p: 1 }}
      >
      <Toolbar /> 
      <Paper     sx={{ flexGrow: 1,   p: 1 }} >
    
    
<Typography variant="h5" noWrap component="div">
Inicio
          </Typography>
    
     
      <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>

        </Paper >
      </Box>

      </Box>
       
       </>
  );
};

export default Inicio;
