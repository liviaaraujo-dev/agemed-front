import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import { HomePage } from '../pages/home';
import SignUpPage from '../pages/sign-up';
import { RiHomeLine } from "react-icons/ri";
import { ReactNode } from 'react';
import { Container } from '../components/Navbar/styles';
import DefaultLayout from '../layout/Default';
import { PiUserCirclePlusLight } from "react-icons/pi";
import useAuthToken from '../hooks/useAuthToken';

interface AsideItem {
    label: string;
    redirectTo: string;
    icon: ReactNode;
}
interface RenderPageProps {
    page: ReactNode;
    navbarText: string;
}

  const RenderPage: React.FC<RenderPageProps> = ({ page, navbarText }) => {
    return (
        <Container>
            <DefaultLayout
                asideData={[
                    {
                        label: 'Dashboard',
                        redirectTo: '/home',
                        icon: <RiHomeLine size={24} />
                    },
                    {
                        label: 'Cadastrar paciente',
                        redirectTo: '/cadastrar-p',
                        icon: <PiUserCirclePlusLight size={24} />
                    },
                    {
                        label: 'Marca consulta',
                        redirectTo: '/cadastrar-p',
                        icon: <PiUserCirclePlusLight size={24} />
                    },
                    {
                        label: 'Consultas',
                        icon: <PiUserCirclePlusLight size={24} />
                    },{
                        label: 'Cadastrar clínica',
                        redirectTo: '/cadastrar-p',
                        icon: <PiUserCirclePlusLight size={24} />
                    },
                ]}
                navbarText={navbarText}
            >
                {page}
            </DefaultLayout>
        </Container>
    );
};

export default function MyRoutes() {
     const { token } = useAuthToken();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar-clinica" element={<SignUpPage />} />
                <Route path="/home" element={token ? <RenderPage page={<HomePage />} navbarText="Dashboard" /> : <Navigate to="/" replace /> } />
            </Routes>
        </BrowserRouter>
    );
};
 