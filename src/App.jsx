


import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Authlayout from './layouts/Authlayout.jsx';
import RutaProtegida from './layouts/RutaProtegida.jsx';

import Login from './pages/Login.jsx';
import Registrar from './pages/Registrar.jsx';
import NuevaContrasena from './pages/NuevaContrasena.jsx';
import OlvideContrasena from './pages/OlvideContrasena.jsx';
import ConfirmarCuenta from './pages/ConfirmarCuenta.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

import Pacientes from './pages/Pacientes.jsx';

function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Authlayout/>}>
            <Route index element={<Login/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='olvideContrasena' element={<OlvideContrasena/>}/>
            <Route path='olvideContrasena/:token' element={<NuevaContrasena/>}/>
            <Route path='confirmarCuenta/:token' element={<ConfirmarCuenta/>} />
          </Route>  

          <Route path='/pacientes' element={<RutaProtegida/>} >
            <Route index element = {<Pacientes/>}/>
          </Route>  
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
