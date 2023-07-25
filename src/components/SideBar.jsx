import {
  Grid,
  Link,
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

const Sidebar = () => {
  const opciones = ["Inicio", "Evaluaciones"];
  
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
    
  
      

      {opciones.map((text, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
 
    </Drawer>
    </Box>
  );
};

export default Sidebar;
