import { Routes, Route } from "react-router-dom";
import UserPage from "./Component/User/UserPage";
import FormAdd from "./Component/FormAdd/FormAdd";
import FormEdit from "./Component/FormEdit/FormEdit";
import { useForm } from 'react-hook-form';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<userPage />} />
        <Route path="/form" element={<addForm />} />
        <Route path="/form-edit" element={<editForm />} />
      </Routes>
    </div>
  );
}

export default App;
