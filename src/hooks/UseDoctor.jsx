
import { useContext } from "react";

import {DoctorContext} from "../context/DoctorProvider.jsx";

const useDoctor = () =>{

    return useContext(DoctorContext)
}

export default useDoctor;