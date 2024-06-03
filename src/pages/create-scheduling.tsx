import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { useEffect, useState } from 'react';

type Patient = {
  name: string
  cpf: string
  phone: string
  email: string
  userId: string
  id: string
}

type Doctor = {
  name: string
  specialties: string[]
  crm: string
  phone: string
  id: string
}

export default function CreateSchedulingPage() {

  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Patient[]>([]);

  const { token } = useAuthToken();
  

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

  function handleDoctorChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value)
    setSelectedDoctor(event.target.value)
  }

  function handlePatientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value)
    setSelectedPatient(event.target.value)
  }

  useEffect(() => {
    getDoctors();
    getPatients();
  }, [])

  return (
    <div className="p-10 text-black rounded-lg">
      <h2 className='text-3xl font-semibold'>Realizar agendamento</h2>
      <form className='flex flex-col gap-4 mt-10'>
        <select
          value={selectedDoctor}
          onChange={(e) => handleDoctorChange(e)}
          className='h-12 px-4 mt-4'
        >
          <option value="">Selecione o médico:</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPatient}
          onChange={(e) => handlePatientChange(e)}
          className='h-12 px-4 mt-4'

        >
          <option value="">Selecione o paciente:</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>

        <input type="datetime-local" />

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Agendar
        </button>
      </form>
    </div>
  );
};
