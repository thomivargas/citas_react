import { useState, useEffect } from "react";
import Error from './Error'

const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente)){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        };
    }, [paciente])

    const generarId = () => {
        const fecha = Date.now().toString(36);
        return fecha;
    }
    //funcion que los inputs estan vacios salta error
    const handleSubmit = (e) => {
        e.preventDefault();
        if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
            setError(true)
            return;
        }
        setError(false)
        //paciente que paso como objeto 
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
        }
        if(paciente.id ) {
            //editando registro
            objetoPaciente.id = paciente.id;
            const pacienteActualizado = pacientes.map (pacienteState => pacienteState.id === paciente.id? objetoPaciente : pacienteState);

            setPacientes(pacienteActualizado);  
            setPaciente({});

        }else{
            //nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);  
        }
        //Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Agregar pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded py-10 px-5"
            >
                {error && <Error mensaje='Todos los campos son obligatorios'/>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    id="mascota"
                    type="text" 
                    placeholder="Nombre de la Mascota"
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                    />   
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    id="propietario"
                    type="text" 
                    placeholder="Nombre del propietario"
                    value={propietario}
                    onChange={(e) => {setPropietario(e.target.value)}}
                    />   
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    id="email"
                    type="email" 
                    placeholder="exemple@gmail.com"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />   
                </div>
                <div className="mb-5">
                    <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    id="Alta"
                    type="date"
                    value={fecha}
                    onChange={(e) => {setFecha(e.target.value)}} 
                    />   
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        placeholder="Describe los Sintomas"
                        value={sintomas}
                        onChange={(e) => {setSintomas(e.target.value)}}
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id?'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario
