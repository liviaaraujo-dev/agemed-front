import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";

type Doctor = {
  name: string
  specialties: string[]
  crm: string
  phone: string
}

export default function DoctorPage() {

  const { token } = useAuthToken();

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const navigate = useNavigate();

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
  }, [])

  return (
    <div className="p-10 text-black rounded-lg">
      {/* <div className="mb-4 flex flex-col items-start justify-start">

      </div> */}
      <h2 className='text-3xl font-semibold'>Médicos</h2>

      <Link className="bg-green-600 font-semibold hover:bg-green-700 text-white w-[14rem] px-4 py-2 rounded mt-8 flex gap-2 items-center" to='/cadastrar-medico'>
        <IoIosAdd color='#ffffff' size={26} />
        Adicionar Médico
      </Link>

      {doctors.length > 0 && (
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Especialidades</th>
              <th className="px-4 py-2">CRM</th>
              <th className="px-4 py-2">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{doctor.name}</td>
                <td className="px-4 py-2">{doctor.specialties.join(', ')}</td>
                <td className="px-4 py-2">{doctor.crm}</td>
                <td className="px-4 py-2">{doctor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};
