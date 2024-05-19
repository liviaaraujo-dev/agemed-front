import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import { HomePage } from '../pages/home';

export function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;
