import {TextField,Typography} from "@mui/material"; 

const Texto  = ({
    id,
    name,
    label,
    autoComplete,
    error,
    helperText 
  }) => {
    return (
        <>
        

      <TextField
fullWidth 

        margin="normal"
        variant="filled"
        id={id}
        label={label}
        name={name}
        autoComplete={autoComplete}
        error={error}
        helperText={helperText}
      />
 </>
    );
  };
  
 

export default Texto;
