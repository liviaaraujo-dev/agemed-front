import { useForm } from 'react-hook-form';
import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string
  cpf: string
  phone: string
  email: string
  userId: string
};

export default function CreatePatientPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { token } = useAuthToken();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post('/patient', {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Paciente cadastrado com sucesso!");
      navigate('/pacientes');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao cadastrar médico!");
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl'>Cadastrar paciente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black mt-8">
        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-black text-md font-bold mb-2">Nome</label>
          <input
            type="text"
            {...register('name', { required: 'Nome é obrigatório' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
        </div>

        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-black text-md font-bold mb-2">CPF</label>
          <input
            type="text"
            {...register('cpf', { required: 'CPF é obrigatório' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.cpf && <span className="text-red-500 text-xs italic">{errors.cpf.message}</span>}
        </div>

        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-black text-md font-bold mb-2">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
        </div>


        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-black text-md font-bold mb-2">Telefone</label>
          <input
            type="tel"
            {...register('phone', { required: 'Telefone é obrigatório' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && <span className="text-red-500 text-xs italic">{errors.phone.message}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
