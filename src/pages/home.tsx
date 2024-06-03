import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import { toast } from "sonner";
import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';

type Patient = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  userId: string;
}

type Doctor = {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  userId: string;
}

type Appointment = {
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
}

export default function HomePage() {
  return (
    <div className="p-10">
      <div className="bg-black bg-opacity-50 text-white rounded-lg p-6">
        <h2 className='text-3xl font-semibold'>Dashboard</h2>

        <div className="mt-8 grid grid-cols-1 gap-8">
          <Patients />
          <Doctors />
          <Appointments />
        </div>
      </div>
    </div>
  );
}

function Patients() {
  const { token } = useAuthToken();
  const [patients, setPatients] = useState<Patient[]>([]);

  async function getPatients() {
    try {
      const response = await axiosInstance.get('/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao buscar dados!");
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className='text-2xl font-semibold text-black'>Pacientes</h3>

      <Link className="bg-blue-700 font-semibold text-white w-[14rem] px-4 py-2 rounded mt-4 flex gap-2 items-center" to='/cadastrar-paciente'>
        <IoIosAdd color='#ffffff' size={26} />
        Adicionar Paciente
      </Link>

      {patients.length > 0 && (
        <table className="table-auto w-full mt-6 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.cpf}</td>
                <td className="px-4 py-2">{patient.email}</td>
                <td className="px-4 py-2">{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Doctors() {
  const { token } = useAuthToken();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  async function getDoctors() {
    try {
      const response = await axiosInstance.get('/doctors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao buscar dados!");
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className='text-2xl font-semibold text-black'>Médicos</h3>

      <Link className="bg-blue-700 font-semibold text-white w-[14rem] px-4 py-2 rounded mt-4 flex gap-2 items-center" to='/cadastrar-medico'>
        <IoIosAdd color='#ffffff' size={26} />
        Adicionar Médico
      </Link>

      {doctors.length > 0 && (
        <table className="table-auto w-full mt-6 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Especialidade</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{doctor.name}</td>
                <td className="px-4 py-2">{doctor.specialty}</td>
                <td className="px-4 py-2">{doctor.email}</td>
                <td className="px-4 py-2">{doctor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Appointments() {
  const { token } = useAuthToken();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function getAppointments() {
    try {
      const response = await axiosInstance.get('/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao buscar dados!");
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className='text-2xl font-semibold text-black'>Consultas</h3>

      <Link className="bg-blue-700 font-semibold text-white w-[14rem] px-4 py-2 rounded mt-4 flex gap-2 items-center" to='/cadastrar-consulta'>
        <IoIosAdd color='#ffffff' size={26} />
        Adicionar Consulta
      </Link>

      {appointments.length > 0 && (
        <table className="table-auto w-full mt-6 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Médico</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{appointment.patientName}</td>
                <td className="px-4 py-2">{appointment.doctorName}</td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
