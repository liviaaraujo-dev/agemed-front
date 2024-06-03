import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import SignUpPage from '../pages/sign-up';
import { RiHomeLine } from "react-icons/ri";
import { ReactNode } from 'react';
import { Container } from '../components/Navbar/styles';
import DefaultLayout from '../layout/Default';
import { PiUserCirclePlusLight } from "react-icons/pi";
import useAuthToken from '../hooks/useAuthToken';
import DoctorPage from '../pages/doctor';
import CreateDoctorPage from '../pages/create-doctor';
import PatientPage from '../pages/patient';
import CreatePatientPage from '../pages/create-patient';
import HomePage from '../pages/home';
import SchedulingPage from '../pages/scheduling';
import CreateSchedulingPage from '../pages/create-scheduling';

interface AsideItem {
    label: string;
    redirectTo: string;
    icon: ReactNode;
}
interface RenderPageProps {
    page: ReactNode;
    navbarText?: string;
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
                        label: 'Pacientes',
                        redirectTo: '/pacientes',
                        icon: <PiUserCirclePlusLight size={24} />
                    },
                    {
                        label: 'Agendamentos',
                        redirectTo: '/agendamentos',
                        icon: <PiUserCirclePlusLight size={24} />
                    },
                    {
                        label: 'Médicos',
                        redirectTo: '/medicos',
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
                <Route path="/home" element={token ? <RenderPage page={<HomePage />} /> : <Navigate to="/" replace /> } />
                <Route path="/medicos" element={token ? <RenderPage page={<DoctorPage />} /> : <Navigate to="/" replace /> } />
                <Route path="/cadastrar-medico" element={token ? <RenderPage page={<CreateDoctorPage />} /> : <Navigate to="/" replace /> } />
                <Route path="/pacientes" element={token ? <RenderPage page={<PatientPage />} /> : <Navigate to="/" replace /> } />
                <Route path="/cadastrar-paciente" element={token ? <RenderPage page={<CreatePatientPage />} /> : <Navigate to="/" replace /> } />
                <Route path="/agendamentos" element={token ? <RenderPage page={<SchedulingPage />} /> : <Navigate to="/" replace /> } />
                <Route path="/realizar-agendamento" element={token ? <RenderPage page={<CreateSchedulingPage />} /> : <Navigate to="/" replace /> } />
            </Routes>
        </BrowserRouter>
    );
};
