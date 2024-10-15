import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/App";
import Diario from "./pages/diario";
import ConsultarDiario from "./pages/verDiario";
export default function Navegacao() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login/> } />         
          <Route path="/diario" element={ <Diario/> } />         
          <Route path="/diario/:id" element={ <Diario/> } />         
          <Route path="/diarioBuscar" element={ <ConsultarDiario/> } />         
        </Routes>
    </BrowserRouter>
  )
}