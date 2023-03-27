


import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Authlayout from './layouts/Authlayout.jsx';
import RutaProtegida from './layouts/RutaProtegida.jsx';
import RutaHomeProtegida from './layouts/RutaHomeProtegida.jsx';

import Login from './pages/Login.jsx';
import Registrar from './pages/Registrar.jsx';
import NuevaContrasena from './pages/NuevaContrasena.jsx';
import OlvideContrasena from './pages/OlvideContrasena.jsx';
import ConfirmarCuenta from './pages/ConfirmarCuenta.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { PacientesProvider } from './context/PacienteProvider.jsx';
import { ProveedoresProvider } from './context/ProveedorProvider.jsx';
import { DoctorProvider } from './context/DoctorProvider.jsx';

import Pacientes from './pages/Pacientes.jsx';
import NuevoPaciente from './pages/NuevoPaciente.jsx';
import Paciente from './pages/Paciente.jsx';
import EditarPaciente from './pages/EditarPaciente.jsx';

import Proveedores from './pages/Proveedores.jsx';
import NuevoProveedor from './pages/NuevoProveedor.jsx';
import Proveedor from './pages/Proveedor.jsx';
import EditarProveedor from './pages/EditarProveedor.jsx';

import Home from './pages/Home.jsx';

import PerfilDoctor from './pages/PerfilDoctor.jsx';

function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <ProveedoresProvider>
            <DoctorProvider>
              <Routes>

                <Route path='/' element={<Authlayout/>}>
                  <Route index element={<Login/>}/>
                  <Route path='registrar' element={<Registrar/>}/>
                  <Route path='olvideContrasena' element={<OlvideContrasena/>}/>
                  <Route path='olvideContrasena/:token' element={<NuevaContrasena/>}/>
                  <Route path='confirmarCuenta/:token' element={<ConfirmarCuenta/>} />
                </Route>  

                <Route path='/home' element={<RutaHomeProtegida/>}>
                  <Route index element = {<Home/>}/>
                
                </Route >
                
                <Route path='/perfilDoctor' element={<RutaProtegida/>} >
                  <Route index element = {<PerfilDoctor/>}/>
                </Route >

                <Route path='/pacientes' element={<RutaProtegida/>} >
                  <Route index element = {<Pacientes/>}/>
                  <Route path='crearPaciente' element={<NuevoPaciente/>} />
                  <Route path=':idPaciente' element={<Paciente/>}/>
                  <Route path='editar/:idPaciente' element={<EditarPaciente/>}/>
                </Route> 

                <Route path='/proveedores' element={<RutaProtegida/>} >
                  <Route index element = {<Proveedores/>}/>
                  <Route path='crearProveedor' element={<NuevoProveedor/>} />
                  <Route path=':idProveedor' element={<Proveedor/>}/>
                  <Route path='editar/:idProveedor' element={<EditarProveedor/>}/>
                </Route>
                
              </Routes>
            </DoctorProvider>
          </ProveedoresProvider>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
