import { useState } from 'react';
import { registrarClienteConMascota } from '../../api/clientesApi';
import { Plus, Loader2, PawPrint, User, Phone, Mail, MapPin, Calendar, Weight, AlertCircle } from 'lucide-react';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';

const RegisterClientForm = () => {
    const [formData, setFormData] = useState({
        nombreCliente: '',
        telefono: '',
        email: '',
        direccion: '',
        nombreMascota: '',
        especie: '',
        raza: '',
        fechaNacimiento: '',
        peso: '',
        observaciones: ''
    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const errors = {};
        if (!formData.nombreCliente) errors.nombreCliente = 'Requerido';
        if (!formData.telefono) errors.telefono = 'Requerido';
        if (!formData.nombreMascota) errors.nombreMascota = 'Requerido';
        if (!formData.especie) errors.especie = 'Requerido';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            setError('Por favor completa los campos requeridos.');
            return;
        }

        setLoading(true);
        setMensaje(null);
        setError(null);

        try {
            const datosEnvio = {
                cliente: {
                    nombre: formData.nombreCliente,
                    telefono: formData.telefono,
                    email: formData.email,
                    direccion: formData.direccion
                },
                mascota: {
                    nombre: formData.nombreMascota,
                    especie: formData.especie,
                    raza: formData.raza,
                    fechaNacimiento: formData.fechaNacimiento,
                    peso: formData.peso,
                    observaciones: formData.observaciones
                }
            };

            await registrarClienteConMascota(datosEnvio);
            setMensaje('¡Registrado correctamente!');
            setFormData({
                nombreCliente: '', telefono: '', email: '', direccion: '',
                nombreMascota: '', especie: '', raza: '', fechaNacimiento: '', peso: '', observaciones: ''
            });
        } catch (err) {
            setError(err.message || 'Error al registrar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-surface-300/50 border border-surface-100/60 p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-70 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-4xl font-extrabold text-surface-900 mb-2 tracking-tight">
                    Registrar Nuevo <span className="text-primary-600">Cliente</span>
                </h2>
                <p className="text-surface-500 text-lg mb-10">Complete la información para crear un nuevo expediente.</p>

                {mensaje && (
                    <div className="mb-8 p-4 bg-primary-50 text-primary-800 rounded-2xl border border-primary-200 flex items-center gap-3 animate-fade-in shadow-sm">
                        <div className="bg-primary-100 p-1 rounded-full"><Plus className="w-4 h-4 text-primary-700" /></div>
                        <p className="font-bold">{mensaje}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 flex items-center gap-3 animate-fade-in shadow-sm">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="font-bold">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Columna Izquierda: Cliente (Fondo Blanco) */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white rounded-xl text-surface-700 border border-surface-200/60 shadow-sm">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-surface-800">Datos del Propietario</h3>
                                    <p className="text-sm text-surface-500 font-medium">Información de contacto</p>
                                </div>
                            </div>

                            <div className="space-y-6 bg-white p-8 rounded-3xl border border-surface-100/60 shadow-lg shadow-surface-200/50">
                                <InputField
                                    label="Nombre Completo"
                                    name="nombreCliente"
                                    icon={User}
                                    required
                                    placeholder="Ej. Juan Pérez"
                                    value={formData.nombreCliente}
                                    onChange={handleChange}
                                    error={fieldErrors.nombreCliente}
                                />
                                <InputField
                                    label="Teléfono"
                                    name="telefono"
                                    type="tel"
                                    icon={Phone}
                                    required
                                    placeholder="Ej. 555 123 4567"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    error={fieldErrors.telefono}
                                />
                                <InputField
                                    label="Correo Electrónico"
                                    name="email"
                                    type="email"
                                    icon={Mail}
                                    placeholder="juan@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Dirección"
                                    name="direccion"
                                    icon={MapPin}
                                    placeholder="Ej. Av. Principal #123"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-4">
                                <button type="button" className="group flex items-center gap-3 px-6 py-4 bg-surface-50 text-surface-600 font-bold rounded-2xl hover:bg-surface-100 transition-all duration-300 w-full justify-center border border-surface-200/60 hover:border-surface-300">
                                    <div className="bg-white text-surface-400 rounded-full p-1 border border-surface-200 transition-transform group-hover:rotate-90 duration-300">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    Añadir otra Mascota
                                </button>
                            </div>
                        </div>

                        {/* Columna Derecha: Mascota (Fondo Verde Suave) */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-100 rounded-xl text-primary-700 border border-primary-200/60 shadow-sm">
                                    <PawPrint className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-surface-800">Datos de la Mascota</h3>
                                    <p className="text-sm text-surface-500 font-medium">Detalles clínicos básicos</p>
                                </div>
                            </div>

                            <div className="space-y-6 bg-primary-50/60 p-8 rounded-3xl border border-primary-100/50 shadow-lg shadow-primary-100/50">
                                <InputField
                                    label="Nombre"
                                    name="nombreMascota"
                                    icon={PawPrint}
                                    required
                                    placeholder="Ej. Firulais"
                                    value={formData.nombreMascota}
                                    onChange={handleChange}
                                    error={fieldErrors.nombreMascota}
                                />
                                <SelectField
                                    label="Especie"
                                    name="especie"
                                    icon={PawPrint}
                                    options={['Perro', 'Gato', 'Ave', 'Roedor', 'Otro']}
                                    required
                                    value={formData.especie}
                                    onChange={handleChange}
                                    error={fieldErrors.especie}
                                />
                                <InputField
                                    label="Raza"
                                    name="raza"
                                    icon={PawPrint}
                                    placeholder="Ej. Labrador"
                                    value={formData.raza}
                                    onChange={handleChange}
                                />
                                <div className="grid grid-cols-2 gap-6">
                                    <InputField
                                        label="Fecha Nacimiento"
                                        name="fechaNacimiento"
                                        type="date"
                                        icon={Calendar}
                                        value={formData.fechaNacimiento}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label="Peso (kg)"
                                        name="peso"
                                        type="number"
                                        icon={Weight}
                                        placeholder="0.0"
                                        value={formData.peso}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección Inferior: Alergias */}
                    <div className="mt-12">
                        <div className="bg-red-50/80 border border-red-100 rounded-3xl p-8 relative overflow-hidden group hover:border-red-200 transition-colors duration-300 shadow-sm">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-60 pointer-events-none"></div>

                            <label className="flex items-center gap-3 text-sm font-extrabold text-red-700 uppercase tracking-wider mb-4 relative z-10">
                                <div className="p-1.5 bg-red-100 rounded-lg">
                                    <AlertCircle className="w-4 h-4" />
                                </div>
                                Alergias Crónicas o Condición Preexistente
                            </label>

                            <textarea
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describa cualquier condición médica importante..."
                                className="block w-full p-5 bg-white border border-red-100 rounded-2xl text-surface-900 placeholder-red-300 focus:outline-none focus:border-red-300 focus:ring-4 focus:ring-red-500/10 transition-all duration-300 resize-none shadow-sm relative z-10 font-medium"
                            ></textarea>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 pt-8 border-t border-surface-100/60">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-12 py-4 rounded-2xl bg-primary-100 border-2 border-primary-200 border-b-[6px] border-b-primary-300 text-primary-900 font-extrabold text-lg shadow-xl shadow-primary-500/10 hover:bg-primary-200 hover:border-primary-300 hover:border-b-primary-400 active:border-b-2 active:translate-y-[4px] transition-all duration-200 flex items-center justify-center gap-3 min-w-[300px]"
                        >
                            {loading ? <Loader2 className="animate-spin w-6 h-6 text-primary-700" /> : null}
                            Guardar y Agendar Cita
                        </button>

                        <button
                            type="button"
                            className="px-8 py-4 rounded-2xl bg-surface-100 border-2 border-surface-200 border-b-[6px] border-b-surface-300 text-surface-700 font-bold hover:bg-surface-200 hover:border-surface-300 hover:border-b-surface-400 active:border-b-2 active:translate-y-[4px] transition-all duration-200 text-lg"
                        >
                            Guardar y Salir
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterClientForm;
