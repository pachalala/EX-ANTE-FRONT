import { createContext, useState, useEffect } from "react";

export const GenContext = createContext();

export function GenContextProvider(props) {
  const [Login, setLogin] = useState(() => {

 console.log("ini login.." +window.localStorage.getItem("Login"));

    const item = window.localStorage.getItem("Login");
    return item ? JSON.parse(item) : { nombre: "", perfil: "", perfil_nombre: "", ini: 0 };
  }); 

  const [MenuIn, setMenuIn] = useState(false);

  useEffect(() => {

    
 console.log("actualiza login.." +JSON.stringify(Login));


    localStorage.setItem("Login", JSON.stringify(Login));
  }, [Login]);

  const valor = {
    Login,
    setLogin,
    MenuIn,
    setMenuIn,
  };

  return (
    <GenContext.Provider value={valor}>{props.children}</GenContext.Provider>
  );
}
export default GenContextProvider;
