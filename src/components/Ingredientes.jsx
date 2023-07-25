import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {  grey } from "@mui/material/colors";
import Nav2 from './Nav2'


const Ingredientes = () => {
  const [data, setData] = useState([]);

  const navegate = useNavigate();

   

  useEffect(() => {
    const traeDatos = async () => {
      const response = await fetch(`http://localhost:5021/ingredientes`);
      const data = await response.json();
      console.log(`data 1:${JSON.stringify(data)}`);

      setData(data);
    };
    traeDatos();
  }, []);

  const MatEdit = ({ index }) => {
    const handleEditClick = () => {
      navegate("/ingrediente/" + index);
    };

    return (
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleEditClick}
      >
        <EditIcon style={{ color: grey[500] }} />
      </IconButton>
    );
  };

  const columns = [
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit index={params.row.id} />
          </div>
        );
      },
    },
    { field: "nombre", headerName: "Nombre", width: 140 },
  ];
  if (data.length !=0){
  return (
    <>
    <Nav2/>
      <h2>Ingredientes listar</h2>

      <div style={{ width: 500 }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pageSize : 5,
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
        />
      </div>
   
    </>
  );
}
else
return (<> </>);
};

export default Ingredientes;
