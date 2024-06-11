import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

type Patient = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  userId: string;
  id: string;
};

type Doctor = {
  name: string;
  specialties: string[];
  crm: string;
  phone: string;
  id: string;
};

type FormData = {
  patientId: string;
  doctorId: string;
  date: string;
};

export default function CreateSchedulingPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const navigate = useNavigate();

  const { token } = useAuthToken();

  const { handleSubmit, control, reset } = useForm<FormData>();

  useEffect(() => {
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

    getDoctors();
    getPatients();
  }, [token]);

  const formatDate = (dateString: string) => {
    // Parse a data original
    const originalDate = parseISO(dateString);
  
    // Adicionar os segundos e milissegundos desejados
    const formattedDate = new Date(
      originalDate.getFullYear(),
      originalDate.getMonth(),
      originalDate.getDate(),
      originalDate.getHours(),
      originalDate.getMinutes(),
      54,  // Segundos
      430  // Milissegundos
    );
  
    // Formatar a data no formato desejado
    return format(formattedDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
  };

  const onSubmit = async (data: FormData) => {
    console.log(data.date)
    try {
      const response = await axiosInstance.post('/scheduling', {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: formatDate(data.date),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      toast.success("Agendamento realizado com sucesso!");
      reset();
      navigate('/agendamentos');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao realizar agendamento!");
    }
  };

  return (
    <div className="p-10 text-black rounded-lg">
      <h2 className='text-3xl font-semibold'>Realizar agendamento</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-10'>
        <Controller
          name="doctorId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field} className='h-12 px-4 mt-4'>
              <option value="">Selecione o médico:</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="patientId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field} className='h-12 px-4 mt-4'>
              <option value="">Selecione o paciente:</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input type="datetime-local" {...field} className="h-12 px-4 mt-4" />
          )}
        />

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Agendar
        </button>
      </form>
    </div>
  );
}
