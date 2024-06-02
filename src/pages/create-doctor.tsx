import { useForm, useFieldArray } from 'react-hook-form';
import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FormData = {
  name: string;
  specialties: string[];
  crm: string;
  phone: string;
};

export default function CreateDoctorPage() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specialties',
  });

  const { token } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    append('');
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post('/doctor', {
        name: data.name,
        specialties: data.specialties,
        crm: data.crm,
        phone: data.phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Médico cadastrado com sucesso!");
      navigate('/medicos');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao cadastrar médico!");
    }
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl'>Cadastrar médico</h2>
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
          <label className="block text-black text-md font-bold mb-2">CRM</label>
          <input
            type="text"
            {...register('crm', { required: 'CRM é obrigatório' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.crm && <span className="text-red-500 text-xs italic">{errors.crm.message}</span>}
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

        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-black text-md font-bold mb-2">Especialidades</label>
          <button
            type="button"
            onClick={() => append('')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm mb-4"
          >
            Adicionar Especialidade
          </button>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`specialties.${index}`, { required: 'Especialidade é obrigatória' })}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remover
              </button>
            </div>
          ))}
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
