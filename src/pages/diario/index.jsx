import { useEffect, useState} from "react";
import "./index.scss";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";



export default function Diario() {
  const [token, setToken] = useState(null)

  const [dia, setDia] = useState("");
  const [conteudo, setConteudo] = useState("")

  const navigate = useNavigate()

  const { id } = useParams()

  async function salvar() {
    let paramCorpo = {
      "dia": dia,
      "conteudo": conteudo,
    }

    if (id == undefined) {
      // cria
      const url = `http://localhost:3030/diario?x-access-token=${token}`
      let resp = await axios.post(url, paramCorpo)

      toast.success("diario adicionado. Id " + resp.data.id)
    } else {
      // alterar
      const url = `http://localhost:3030/diario/${id}?x-access-token=${token}`
      let resp = await axios.put(url, paramCorpo)

      toast.success("diario alterado.")
    }
  }


 
useEffect(() => {
  let usu = localStorage.getItem("USUARIO")
  setToken(usu)

  if (usu == undefined) {
    navigate('/')
  }
  
}, [])

async function sair() {
  localStorage.setItem("USUARIO", null)
  navigate('/')
}

  return (
      <div className="pagina-adicionar-diario">
           <button onClick={sair}>Sair</button>
        <h1>Cadastrar diario</h1>

          <div className='form'>
            <div>
                <label>Dia:</label>
                <input type='date' value={dia} onChange={e => setDia(e.target.value)} />
            </div>
            <div>
                <label>Conteudo:</label>
                <input type='text' value={conteudo} onChange={e => setConteudo(e.target.value)}/>
            </div>
        </div>

        <button onClick={salvar}> Salvar </button>
        <Link to="/diarioBuscar"> Buscar </Link>
        <Toaster/>
    </div>
  );
}