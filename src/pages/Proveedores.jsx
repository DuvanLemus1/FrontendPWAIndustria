
import useProveedores from "../hooks/UseProveedor"
import PreviewProveedores from "../components/PreviewProveedores";

const Proveedores = () => {

  const {proveedores} = useProveedores();

  
  return (
    <>
    
      <h1 className="text-4xl font-black">Proveedores</h1>

      
      <div className="mt-10 justify-center p-5 bg-white shadow rounded-xl">
      <div className="font-bold text-center" >
        <p>Nombres y DNI, para más información haga click en 
          <span className="text-sky-500"> VER DETALLE</span></p>
        
      </div>

        {proveedores.length?
            proveedores.map(proveedor => (
              <PreviewProveedores
                key={proveedor.idProveedor}
                proveedor={proveedor}
              />
         ))
        :<p className="mt-5 text-center text-gray-600 uppercase">No hay ningún Proveedor</p>}
      </div>

    </>
  )
}

export default Proveedores

