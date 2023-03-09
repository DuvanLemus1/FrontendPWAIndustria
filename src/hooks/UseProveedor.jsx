
import { useContext } from "react";

import ProveedorContext from "../context/ProveedorProvider.jsx";

const useProveedores = () =>{

    return useContext(ProveedorContext)
}

export default useProveedores;

