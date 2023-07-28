import {Typography} from "@mui/material"; 

const Titulo  = ({
    texto
  }) => {
    return (
        <Typography component="h2" variant="h5">
       {texto}
</Typography>
    );
  };
  
 

export default Titulo;