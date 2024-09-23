import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    
    async function obtenerDatos() {
      try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setLoading(true)
        if (!data.ok) {
          setError(true);
          throw new Error("No existe el pokemon");
        }
        const response = await data.json();
        setData(response);
      } catch (e) {
        console.error(`Ha habido un error: ${e}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    obtenerDatos();
  }, [id]);
  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Ha habido un error</p>;
  }

  return (
    <div className="bg-red-500 h-lvh py-10 flex flex-col items-center justify-center gap-5">
     

      <div className="w-3/4 bg-white p-10 rounded-md">
        <div className="bg-blue-500 flex flex-col items-center justify-center font-sans text-white gap-5 rounded-md p-5">
          <p className="font-bold text-xl">Id: {data.id}</p>
          <h1 className="font-medium text-4xl">{data.name}</h1>
          <img src={data.sprites.other["official-artwork"].front_default}/>
        </div>
      </div>

      <div className="bg-slate-100 h-24 flex flex-row items-center justify-center gap-5 w-3/4 rounded-md">
        <button
        className="px-10 py-5 rounded-md text-white bg-slate-800"
          onClick={() => {
            setId(id - 1);
          }}
        >
          Anterior
        </button>

        <button
        className="px-10 py-5 rounded-md text-white bg-slate-800"
          onClick={() => {
            setId(id + 1);
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
