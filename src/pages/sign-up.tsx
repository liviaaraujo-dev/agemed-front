import { useForm } from 'react-hook-form';
import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  uf: string;
  city: string;
  cep: string;
  street: string;
  neighborhood: string;
  numberAddress: Number;
};

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { token, setToken } = useAuthToken();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await axiosInstance.post('/sign-up', {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phone,
        uf: data.uf,
        city: data.city,
        postalCode: data.cep,
        street: data.street,
        neighborhood: data.neighborhood,
        numberAddress: Number(data.numberAddress),
      });
      console.log(response.data);
      setToken(response.data.token);
      console.log(token)
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao criar conta");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/bg-blue.jpg')" }}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 bg-black bg-opacity-50 p-10 text-white rounded-lg">
        <h1 className="text-center font-caveat text-5xl font-bold">Agemed</h1>
        <h2 className='text-center text-3xl font-semibold mt-8 mb-4'>Cadastrar Clínica</h2>
        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-white text-sm font-bold mb-2" htmlFor='nome'>Nome</label>
          <input id="nome" type="text" {...register('name', { required: 'Email é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
        </div>
        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-white text-sm font-bold mb-2" htmlFor='phone'>Numero de Celular</label>
          <input id="phone" type="tel" {...register('phone', { required: 'Email é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.phone && <span className="text-red-500 text-xs italic">{errors.phone.message}</span>}
        </div>
        <div className='mt-10 mb-10'>
          <h3 className='text-xl font-medium mb-4'>Endereço</h3>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='uf'>UF</label>
            <input id="uf" type="text" {...register('uf', { required: 'UF é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.uf && <span className="text-red-500 text-xs italic">{errors.uf.message}</span>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='city'>Cidade</label>
            <input id="city" type="text" {...register('city', { required: 'Cidade é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.city && <span className="text-red-500 text-xs italic">{errors.city.message}</span>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='cep'>CEP</label>
            <input id="cep" type="text" {...register('cep', { required: 'CEP é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.cep && <span className="text-red-500 text-xs italic">{errors.cep.message}</span>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='street'>Rua</label>
            <input id="street" type="text" {...register('street', { required: 'Rua é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.street && <span className="text-red-500 text-xs italic">{errors.street.message}</span>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='neighborhood'>Bairro</label>
            <input id="neighborhood" type="text" {...register('neighborhood', { required: 'Bairro é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {errors.neighborhood && <span className="text-red-500 text-xs italic">{errors.neighborhood.message}</span>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start">
            <label className="block text-white text-sm font-bold mb-2" htmlFor='numberAddress'>Número</label>
            <input id="numberAddress" type="text" {...register('numberAddress', { required: 'Número é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-balck leading-tight focus:outline-none focus:shadow-outline" />
            {errors.numberAddress && <span className="text-red-500 text-xs italic">{errors.numberAddress.message}</span>}
          </div>

        </div>
        <h3 className='text-xl font-medium mb-4'>Dados de Acesso</h3>
        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-white text-sm font-bold mb-2">Email</label>
          <input type="email" {...register('email', { required: 'Email é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Senha</label>
          <input type="password" {...register('password', { required: 'Senha é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
        </div>
        <button type="submit" className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline">Cadastrar</button>
        <div className="w-full flex items-center justify-center mt-8">
          <Link to={'/'} className='hover:underline'>Entrar Clínica</Link>
        </div>
      </form>
    </div>
  );
};
