
import Home  from "./Component/User/UserPage";
import {Routes, Route } from "react-router-dom";
import FormAdd from './Component/FormAdd/formAdd'
import FormEdit from './Component/FormEdit/formEdit'

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<FormAdd />} />
          <Route path="/edit" element={<FormEdit />} />
        </Routes>
  );
}
export default App;
