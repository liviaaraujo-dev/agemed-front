import { useForm } from 'react-hook-form';
import axiosInstance from '../util/axios';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { token, setToken } = useAuthToken();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    axiosInstance.post('/sign-in', { })
    try {
      const response = await axiosInstance.post('/sign-in', {
        email: data.email,
        password: data.password
      });
      console.log(response.data);
      setToken(response.data.token);
      console.log(token)
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Email ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/blur-hospital-background.png')"}}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 bg-black bg-opacity-50 p-10 text-white rounded-lg">
        <h1 className="text-center font-caveat text-5xl font-bold">Agemed</h1>
        <div className="mb-4 flex flex-col items-start justify-start">
          <label className="block text-white text-sm font-bold mb-2">Email</label>
          <input type="text" {...register('email', { required: 'Email é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Senha</label>
          <input type="password" {...register('password', { required: 'Senha é obrigatório' })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
        </div>
        <button type="submit" className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline">Entrar</button>
        <div className="w-full flex items-center justify-center mt-8">
          <Link to={'/cadastrar-clinica'} className='hover:underline'>Cadastrar Clínica</Link>
        </div>
      </form>
    </div>
  );
};
