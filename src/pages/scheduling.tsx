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


export default function SchedulingPage() {

  const { token } = useAuthToken();


  const [doctors, setDoctors] = useState<Patient[]>([]);

  async function getSchedulings() {
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
    
  }, [])

  return (
    <div className="p-10 text-black rounded-lg">
      <h2 className='text-3xl font-semibold'>Agendamentos</h2>

      <Link className="bg-blue-700 font-semibold text-white w-[16rem] px-4 py-2 rounded mt-8 flex gap-2 items-center" to='/realizar-agendamento'>
        <IoIosAdd color='#ffffff' size={26} />
        Realizar agendamento
      </Link>

      <div className='flex flex-col gap-4'>
        


      </div>


    </div>
  );
};
