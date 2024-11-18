
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setLoading(true);

        try {
            const result = await login(formData);
            if (result.success) {
                // Redireccionar según el rol
                const user = useAuthStore.getState().currentUser;
                navigate(user?.is_admin ? '/admin' : '/');
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.warn(err);
            setError('Error inesperado al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

                        {error && (
                            <div className="alert alert-error mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                />
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
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="divider">O</div>

                        <p className="text-center">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="link link-primary">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;