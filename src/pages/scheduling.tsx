import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";

type Patient = {
  name: string
  cpf: string
  phone: string
  email: string
  userId: string
  id: string
}

export type Doctor = {
  name: string
  specialties: string[]
  crm: string
  phone: string
  id: string

}

type Scheduling = {
  id: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  date: Date;
  doctor: Doctor;
  patient: Patient;
};

export default function SchedulingPage() {

  const { token } = useAuthToken();


  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);

  async function getSchedulings() {
    try {
      const response = await axiosInstance.get('/scheduling', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedulings(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao buscar dados!");
    }
  }

  useEffect(() => {
    getSchedulings();
  }, [])

  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR'); // Change 'pt-BR' to your desired locale
  }

  // Function to format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Change 'pt-BR' to your desired locale
  }

  return (
    <div className="p-10 text-black rounded-lg">
      <h2 className='text-3xl font-semibold'>Agendamentos</h2>

      <Link className="bg-blue-700 font-semibold text-white w-[16rem] px-4 py-2 rounded mt-8 flex gap-2 items-center" to='/realizar-agendamento'>
        <IoIosAdd color='#ffffff' size={26} />
        Realizar agendamento
      </Link>

      <div className='flex flex-col gap-4'>
        

      {schedulings.length > 0 && (
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Médico</th>
              <th className="px-4 py-2">Data da consulta</th>
              <th className="px-4 py-2">Hora da consulta</th> {/* New column for time */}
            </tr>
          </thead>
          <tbody>
            {schedulings.map((scheduling : Scheduling, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{scheduling.patient.name}</td>
                <td className="px-4 py-2">{scheduling.doctor.name}</td>
                <td className="px-4 py-2">{formatDate(scheduling.date)}</td>
                <td className="px-4 py-2">{formatTime(scheduling.date)}</td> {/* Format time here */}
              </tr>
            ))}
          </tbody>
        </table>
      )}


      </div>


    </div>
  );
};
