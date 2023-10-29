import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import PrivateRoutes from './utils/PrivateRoutes';
import DashBoard from './container/DashBoard/DashBoard';
import CreateMarker from './container/CreateMarker/CreateMarker'
import Login from './container/Login/Login';
import Register from './container/Register/Register';

function App() {
  return (
    <div className='myContainer' >
      <Router>
        <Routes>
          <Route index element={<Login />} path="/login" />
          <Route element={<PrivateRoutes />}>
            <Route element={<DashBoard />} path="/" exact />
            <Route element={<CreateMarker />} path="/createMarker" />
          </Route>

          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
