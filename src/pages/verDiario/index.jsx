import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ConsultarDiario() {
  const [token, setToken] = useState(null) 
  const [diario, setDiario] = useState([]);

  const navigate = useNavigate()


  async function buscar() {
    const url = `http://localhost:3030/diario?x-access-token=${token}`;
    let resp = await axios.get(url);
    console.log(resp.data);
    setDiario(resp.data);
  }

  async function sair() {
    localStorage.setItem("USUARIO", null)
    navigate('/')
  }

  useEffect(() => {
    let usu = localStorage.getItem("USUARIO")
    setToken(usu)

    if(usu == undefined) {
      navigate("/")
    }
  })

  return (
    <div className="pagina-consulta-diario">
      <h1>Consultar diario</h1>

      <button onClick={sair}>Sair</button>
      <button onClick={buscar}>Buscar</button>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Dia</th>
            <th>Conteudo</th>
          </tr>
        </thead>

        <tbody>
          {diario.map((item) => (
            <tr>
              <td>{item.idDiario}</td>
              <td>{item.dtDia}</td>
              <td>{item.dsConteudo}</td>
              <td> <Link to={'/diario/' + item.idDiario} className="alterar-link"> Alterar </Link> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}