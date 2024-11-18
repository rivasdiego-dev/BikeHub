// pages/Register/index.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';
import { useUserStore } from '../../../store/user.store';

const RegisterPage = () => {
    const navigate = useNavigate();
    const register = useAuthStore(state => state.register);
    const addUser = useUserStore(state => state.addUser);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            // Primero verificamos si el email ya existe
            const existingUser = useUserStore.getState().getUserByEmail(formData.email);

            if (existingUser) {
                setError('El email ya está registrado');
                setLoading(false);
                return;
            }

            // Creamos el nuevo usuario en el UserStore
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                is_admin: false,
            };

            // Añadimos el usuario a la "base de datos"
            const userId = addUser(newUser);

            if (!userId) {
                throw new Error('Error al crear el usuario');
            }

            // Ahora registramos el usuario en el AuthStore
            const result = await register({
                email: formData.email,
                password: formData.password,
                name: formData.name
            });

            if (result.success) {
                navigate('/');
            } else {
                // Si falla el registro en AuthStore, deberíamos eliminar el usuario del UserStore
                useUserStore.getState().deleteUser(userId);
                setError(result.error || 'Error al registrar usuario');
            }
        } catch (err) {
            console.warn(err);
            setError('Error inesperado al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center mb-6">Registro</h1>

                        {error && (
                            <div className="alert alert-error mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                    minLength={3}
                                    maxLength={50}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                                <label className="label">
                                    <span className="label-text-alt">Debe ser un email válido</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                    minLength={6}
                                />
                                <label className="label">
                                    <span className="label-text-alt">Mínimo 6 caracteres</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirmar Contraseña</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                Registrarse
                            </button>
                        </form>

                        <div className="divider">O</div>

                        <p className="text-center">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="link link-primary">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;