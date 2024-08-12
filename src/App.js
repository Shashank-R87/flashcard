import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Flash from './pages/Flash';
import AdminDash from './pages/AdminDash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Flash />} />
        <Route path='/admin' element={<AdminDash />} />
      </Routes>
    </BrowserRouter>)
}

export default App;
