import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);

  const [registros, setRegistros] = useState([]);
  const [editar, setEditar] = useState(false); // Bandera para saber si estamos editando
  const [idEditar, setIdEditar] = useState(null); // Guardamos el ID real del empleado a editar

  // CARGAR EMPLEADOS AL INICIO
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:3001/empleados');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error("Error al cargar empleados", error);
    }
  };

  // FUNCION PRINCIPAL (REGISTRAR O ACTUALIZAR)
  const gestionarDatos = async (e) => {
    e.preventDefault();

    // VALIDACIÓN: No permitir campos vacíos
    if (!nombre || !pais || !cargo) {
      alert("Por favor completa los campos de texto");
      return;
    }

    if (editar) {
      // --- MODO ACTUALIZAR ---
      try {
        const response = await fetch(`http://localhost:3001/empleados/${idEditar}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios })
        });

        if (response.ok) {
          alert('Empleado actualizado correctamente');
          limpiarCampos();
          setEditar(false);
          obtenerEmpleados(); // Recargamos la lista desde la BD
        } else {
          alert('Error al actualizar');
        }
      } catch (error) {
        alert('Error de conexión al actualizar');
      }

    } else {
      // --- MODO REGISTRAR ---
      try {
        const response = await fetch('http://localhost:3001/empleados', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios })
        });

        if (response.ok) {
          alert('Empleado registrado correctamente');
          limpiarCampos();
          obtenerEmpleados(); // Recargamos la lista para ver el nuevo ID
        } else {
          alert('Error al guardar');
        }
      } catch (error) {
        alert('Error de conexión al guardar');
      }
    }
  };

  // FUNCION ELIMINAR
  const eliminarRegistro = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este empleado?")) return;

    try {
      const response = await fetch(`http://localhost:3001/empleados/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Empleado eliminado');
        obtenerEmpleados(); // Recargar lista
      } else {
        alert('No se pudo eliminar');
      }
    } catch (error) {
      alert('Error de conexión al eliminar');
    }
  };

  // PREPARAR FORMULARIO PARA EDITAR
  const cargarDatosEdicion = (val) => {
    setEditar(true);
    setIdEditar(val.id); // Guardamos el ID real de la BD
    
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAnios(0);
    setEditar(false);
    setIdEditar(null);
  };

  return (
    <div className="App">
      <div className="datos">
        <label>Nombre: <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /></label>
        <label>Edad: <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} /></label>
        <label>País: <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} /></label>
        <label>Cargo: <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} /></label>
        <label>Años de Experiencia: <input type="number" value={anios} onChange={(e) => setAnios(Number(e.target.value))} /></label>
        
        <button onClick={gestionarDatos}>
          {editar ? 'Actualizar' : 'Registrar'}
        </button>
        {editar && <button onClick={limpiarCampos} style={{backgroundColor: 'gray', marginLeft: '10px'}}>Cancelar</button>}
      </div>

      <div className="tabla-container">
        <table className="tabla-registros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>País</th>
              <th>Cargo</th>
              <th>Años Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((val) => (
              <tr key={val.id}> {/* IMPORTANTE: Usar val.id como key */}
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <button className="btn-editar" onClick={() => cargarDatosEdicion(val)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarRegistro(val.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;