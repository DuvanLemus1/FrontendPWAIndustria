
import useProveedores from "../hooks/UseProveedor"
import PreviewProveedores from "../components/PreviewProveedores";
import { useState } from "react";

const Proveedores = () => {

  const {proveedores} = useProveedores();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProveedores = proveedores.filter((proveedor) =>
  (proveedor.nombreProveedor && proveedor.nombreProveedor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  
  return (
    <>
    
      <h1 className="text-4xl font-black">Proveedores</h1>

      <div>
        <input 
          type="search"
          placeholder="Buscar proveedor por nombre o DNI"
          className="rounded-lg w-full lg:w-80 block p-2 border mt-2"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      
      <div className="mt-10 justify-center p-5 bg-white shadow rounded-xl">
      <div className="font-bold text-center" >
        <p>Nombres de Proveedores, para más información haga click en 
          <span className=" text-gray-600"> VER DETALLE</span></p>
        
      </div>

      {filteredProveedores.length ?
      filteredProveedores.map((proveedor) => (
        <PreviewProveedores key={proveedor.idProveedor} proveedor={proveedor} />
      )) :
      <p className="mt-5 text-center text-gray-600 uppercase">No hay ningún Proveedor, ingrese uno para comenzar</p>
      }
      </div>

    </>
  )
}

export default Proveedores

