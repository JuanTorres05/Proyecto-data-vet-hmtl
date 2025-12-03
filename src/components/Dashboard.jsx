import { Calendar, Clock, Stethoscope, Syringe, Scissors, Bell, ChevronRight, Dog, Cat } from 'lucide-react';

const Dashboard = () => {
    // Mock data for appointments with enhanced details
    const appointments = [
        {
            id: 1,
            petName: 'Oliver',
            owner: 'Carlos Ruiz',
            time: '10:00 AM',
            type: 'Consulta Veterinaria',
            icon: Stethoscope,
            species: 'dog',
            status: 'waiting',
            appointmentType: 'consultation'
        },
        {
            id: 2,
            petName: 'Max',
            owner: 'Yulied Lopez',
            time: '1:00 PM',
            type: 'Consulta Veterinaria',
            icon: Stethoscope,
            species: 'cat',
            status: 'arrived',
            appointmentType: 'consultation'
        },
        {
            id: 3,
            petName: 'Lucas',
            owner: 'Pedro Sánchez',
            time: '3:00 PM',
            type: 'Control General',
            icon: Calendar,
            species: 'dog',
            status: 'waiting',
            appointmentType: 'checkup'
        },
        {
            id: 4,
            petName: 'Luna',
            owner: 'Juan García',
            time: '5:00 PM',
            type: 'Baño y Estética',
            icon: Scissors,
            species: 'dog',
            status: 'delayed',
            appointmentType: 'grooming'
        },
        {
            id: 5,
            petName: 'Penny',
            owner: 'Laura Díaz',
            time: '12:00 PM',
            type: 'Vacuna Antirrábica',
            icon: Syringe,
            species: 'cat',
            status: 'waiting',
            appointmentType: 'vaccination'
        },
        {
            id: 6,
            petName: 'Bruno',
            owner: 'Roberto Vargas',
            time: '3:30 PM',
            type: 'Vacuna Triple',
            icon: Syringe,
            species: 'dog',
            status: 'arrived',
            appointmentType: 'vaccination'
        },
    ];

    // Mock data for patients in clinic with species and status
    const patientsInClinic = [
        { id: 1, name: 'Luna', owner: 'Juan García', species: 'dog', status: 'Post-Operatorio' },
        { id: 2, name: 'Max', owner: 'Yulied Lopez', species: 'cat', status: 'En Observación' },
        { id: 3, name: 'Oliver', owner: 'Carlos Ruiz', species: 'dog', status: 'Recuperación' },
        { id: 4, name: 'Nieve', owner: 'Ana Torres', species: 'cat', status: 'Esperando Alta' },
        { id: 5, name: 'Cleo', owner: 'Luis Mora', species: 'cat', status: 'En Tratamiento' },
        { id: 6, name: 'Tequila', owner: 'Sofia Vega', species: 'dog', status: 'Listo para Salir' },
    ];

    // Mock data for alerts
    const alerts = [
        { id: 1, pet: 'Pitbull', type: 'Vacuna Pendiente', message: 'Copito' },
        { id: 2, pet: 'Pug', type: 'Aseo este mes', message: 'Alocha' },
    ];

    // Helper functions for styling
    const getStatusBadge = (status) => {
        const styles = {
            waiting: 'bg-amber-100 text-amber-700 border-amber-200',
            arrived: 'bg-primary-100 text-primary-700 border-primary-200',
            delayed: 'bg-red-100 text-red-700 border-red-200',
        };
        const labels = {
            waiting: 'En Espera',
            arrived: 'Llegó',
            delayed: 'Retrasado',
        };
        return { style: styles[status], label: labels[status] };
    };

    const getAppointmentBorderColor = (type) => {
        const colors = {
            consultation: 'border-l-4 border-l-blue-400',
            vaccination: 'border-l-4 border-l-primary-400',
            grooming: 'border-l-4 border-l-purple-400',
            checkup: 'border-l-4 border-l-teal-400',
        };
        return colors[type] || 'border-l-4 border-l-surface-300';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-8">
                {/* Agenda del Día */}
                <section className="bg-white rounded-[2rem] shadow-xl shadow-surface-200/50 border border-surface-100/60 p-8 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Agenda del Día</h2>
                                <p className="text-surface-500 font-medium mt-1">Próximas citas programadas</p>
                            </div>
                            <button className="text-sm font-bold text-primary-700 bg-primary-50 border-b-4 border-primary-200 px-6 py-2.5 rounded-xl hover:bg-primary-100 hover:border-primary-300 active:border-b-0 active:translate-y-1 transition-all duration-200">
                                Ver todo
                            </button>
                        </div>

                        <div className="space-y-4">
                            {appointments.map((appointment) => {
                                const Icon = appointment.icon;
                                const SpeciesIcon = appointment.species === 'dog' ? Dog : Cat;
                                const statusBadge = getStatusBadge(appointment.status);
                                const borderColor = getAppointmentBorderColor(appointment.appointmentType);

                                return (
                                    <div
                                        key={appointment.id}
                                        className={`bg-white rounded-2xl p-5 border border-surface-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 group ${borderColor}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-5 flex-1 min-w-0">
                                                <div className="bg-surface-50 p-3.5 rounded-2xl group-hover:bg-primary-50 transition-colors flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-surface-400 group-hover:text-primary-600 transition-colors" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                                        <div className="flex items-center gap-2">
                                                            <SpeciesIcon className="w-4 h-4 text-surface-400" />
                                                            <h3 className="font-bold text-lg text-surface-900">{appointment.petName}</h3>
                                                        </div>
                                                        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusBadge.style} font-bold`}>
                                                            {statusBadge.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium text-surface-600 mb-1.5">{appointment.type}</p>
                                                    <div className="flex items-center gap-4 text-sm text-surface-500">
                                                        <span className="font-medium flex items-center gap-1.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-surface-300"></div>
                                                            {appointment.owner}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 bg-surface-50 px-2 py-0.5 rounded-md">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span className="font-semibold">{appointment.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="px-5 py-2.5 bg-white border-2 border-primary-100 border-b-[5px] border-b-primary-200 text-primary-700 rounded-xl font-bold hover:bg-primary-50 hover:border-primary-200 hover:border-b-primary-300 active:border-b-2 active:translate-y-[3px] transition-all duration-200 flex-shrink-0">
                                                Iniciar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Alertas y Recordatorios */}
                <section className="bg-amber-50/50 rounded-[2rem] p-8 border border-amber-100/30 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="bg-amber-100 p-2 rounded-xl">
                            <Bell className="w-5 h-5 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold text-surface-900">Alertas y Recordatorios</h2>
                    </div>

                    <div className="space-y-3 relative z-10">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-100 flex items-center gap-4 hover:shadow-md transition-all duration-300"
                            >
                                <div className="bg-amber-50 p-2.5 rounded-xl">
                                    <Bell className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-surface-900 text-sm">{alert.type}: {alert.message}</h3>
                                    <p className="text-xs font-medium text-surface-500 mt-0.5">{alert.pet}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="lg:col-span-1">
                <section className="bg-white rounded-[2rem] border border-surface-100/60 shadow-xl shadow-surface-200/50 overflow-hidden sticky top-24">
                    <div className="bg-primary-50/50 border-b border-primary-100/30 px-8 py-6">
                        <h2 className="text-xl font-extrabold text-surface-900">Pacientes en Clínica</h2>
                        <p className="text-sm font-medium text-surface-500 mt-1">{patientsInClinic.length} pacientes activos</p>
                    </div>

                    <div className="divide-y divide-surface-50 max-h-[600px] overflow-y-auto p-2">
                        {patientsInClinic.map((patient) => {
                            const SpeciesIcon = patient.species === 'dog' ? Dog : Cat;
                            const iconColor = patient.species === 'dog' ? 'text-amber-600' : 'text-blue-600';
                            const iconBg = patient.species === 'dog' ? 'bg-amber-50' : 'bg-blue-50';

                            return (
                                <div
                                    key={patient.id}
                                    className="p-4 hover:bg-surface-50 rounded-2xl transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                                            <SpeciesIcon className={`w-6 h-6 ${iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-surface-900 truncate">{patient.name}</h3>
                                            <p className="text-xs font-medium text-surface-500 truncate">{patient.owner}</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                                                <p className="text-xs text-primary-700 font-bold">{patient.status}</p>
                                            </div>
                                        </div>
                                        <div className="bg-surface-50 p-2 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                                            <ChevronRight className="w-4 h-4 text-surface-400 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
