import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import { HomePage } from '../pages/home';
import SignUpPage from '../pages/sign-up';
import { RiHomeLine } from "react-icons/ri";
import { ReactNode } from 'react';
import { Container } from '../components/Navbar/styles';
import DefaultLayout from '../layout/Default';
import { PiUserCirclePlusLight } from "react-icons/pi";

interface AsideItem {
    label: string;
    redirectTo: string;
    icon: ReactNode;
}
  
interface DefaultLayoutProps {
    asideData: AsideItem[];
    navbarText: string;
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
                        label: 'Inicio',
                        redirectTo: '/dashboard',
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
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar-clinica" element={<SignUpPage />} />
                <Route path="/home" element={<RenderPage page={<HomePage />} navbarText="Inicio" />} />
            </Routes>
        </BrowserRouter>
    );
};
 