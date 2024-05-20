import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import { HomePage } from '../pages/home';
import SignUpPage from '../pages/sign-up';

export function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/cadastrar-clinica" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;