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
}

export default function PatientPage() {

  const { token } = useAuthToken();

  const [doctors, setDoctors] = useState<Patient[]>([]);

  async function getPatients() {
    try {
      const response = await axiosInstance.get('/patients', {
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
    getPatients();
  }, [])

  return (
    <div className="p-10 text-black rounded-lg">
      <h2 className='text-3xl font-semibold'>Pacientes</h2>

      <Link className="bg-blue-700 font-semibold text-white w-[14rem] px-4 py-2 rounded mt-8 flex gap-2 items-center" to='/cadastrar-paciente'>
        <IoIosAdd color='#ffffff' size={26} />
        Adicionar Paciente
      </Link>

      {doctors.length > 0 && (
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{doctor.name}</td>
                <td className="px-4 py-2">{doctor.cpf}</td>
                <td className="px-4 py-2">{doctor.email}</td>
                <td className="px-4 py-2">{doctor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};
