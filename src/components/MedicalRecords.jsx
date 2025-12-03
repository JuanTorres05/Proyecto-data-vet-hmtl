import { useState } from 'react';
import { Search, Filter, FileText, Calendar, User, PawPrint, ChevronDown, ChevronUp, Pill, Syringe, Stethoscope, Clock } from 'lucide-react';

const MedicalRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [expandedRecord, setExpandedRecord] = useState(null);

    // Mock data for medical records
    const medicalRecords = [
        {
            id: 1,
            petName: 'Luna',
            owner: 'Juan García',
            species: 'dog',
            breed: 'Golden Retriever',
            age: 3,
            lastVisit: '2024-11-28',
            status: 'active',
            diagnosis: 'Control de rutina',
            treatment: 'Vacunación anual',
            weight: '28 kg',
            temperature: '38.5°C',
            notes: 'Paciente en excelente estado. Se aplicó vacuna polivalente.',
            medications: ['Vacuna Polivalente', 'Desparasitante'],
            nextAppointment: '2025-11-28'
        },
        {
            id: 2,
            petName: 'Max',
            owner: 'Yulied Lopez',
            species: 'cat',
            breed: 'Persa',
            age: 5,
            lastVisit: '2024-11-25',
            status: 'active',
            diagnosis: 'Infección respiratoria leve',
            treatment: 'Antibiótico oral',
            weight: '4.5 kg',
            temperature: '39.2°C',
            notes: 'Mejoría notable. Continuar tratamiento por 5 días más.',
            medications: ['Amoxicilina', 'Vitamina C'],
            nextAppointment: '2024-12-05'
        },
        {
            id: 3,
            petName: 'Rocky',
            owner: 'Pedro Sánchez',
            species: 'dog',
            breed: 'Bulldog',
            age: 7,
            lastVisit: '2024-11-20',
            status: 'inactive',
            diagnosis: 'Chequeo dental',
            treatment: 'Limpieza dental profesional',
            weight: '25 kg',
            temperature: '38.3°C',
            notes: 'Procedimiento completado exitosamente. Alta médica.',
            medications: ['Analgésico post-operatorio'],
            nextAppointment: '2025-05-20'
        },
        {
            id: 4,
            petName: 'Miau',
            owner: 'Laura Díaz',
            species: 'cat',
            breed: 'Siamés',
            age: 2,
            lastVisit: '2024-12-01',
            status: 'active',
            diagnosis: 'Gastritis aguda',
            treatment: 'Dieta especial + medicación',
            weight: '3.8 kg',
            temperature: '38.9°C',
            notes: 'Evitar alimentos grasos. Dieta blanda por 1 semana.',
            medications: ['Omeprazol', 'Probióticos'],
            nextAppointment: '2024-12-08'
        },
        {
            id: 5,
            petName: 'Bella',
            owner: 'Carmen Ruiz',
            species: 'dog',
            breed: 'Labrador',
            age: 4,
            lastVisit: '2024-11-15',
            status: 'active',
            diagnosis: 'Displasia de cadera leve',
            treatment: 'Antiinflamatorios + fisioterapia',
            weight: '30 kg',
            temperature: '38.4°C',
            notes: 'Control mensual requerido. Evitar ejercicio intenso.',
            medications: ['Carprofeno', 'Condroprotector'],
            nextAppointment: '2024-12-15'
        }
    ];

    // Filter records based on search and filters
    const filteredRecords = medicalRecords.filter(record => {
        const matchesSearch = record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecies = filterSpecies === 'all' || record.species === filterSpecies;
        const matchesStatus = filterStatus === 'all' || record.status === filterStatus;

        return matchesSearch && matchesSpecies && matchesStatus;
    });

    // Statistics
    const stats = {
        total: medicalRecords.length,
        active: medicalRecords.filter(r => r.status === 'active').length,
        dogs: medicalRecords.filter(r => r.species === 'dog').length,
        cats: medicalRecords.filter(r => r.species === 'cat').length,
    };

    const toggleExpand = (id) => {
        setExpandedRecord(expandedRecord === id ? null : id);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-surface-900 tracking-tight mb-2">
                        Historias Clínicas
                    </h1>
                    <p className="text-surface-600 text-sm font-medium">
                        Gestiona y consulta los registros médicos completos de tus pacientes
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-surface-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Total Registros</p>
                            <p className="text-3xl font-extrabold text-surface-900">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-surface-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Activos</p>
                            <p className="text-3xl font-extrabold text-primary-600">{stats.active}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-surface-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Perros</p>
                            <p className="text-3xl font-extrabold text-blue-600">{stats.dogs}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <PawPrint className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-surface-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-1">Gatos</p>
                            <p className="text-3xl font-extrabold text-orange-600">{stats.cats}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <PawPrint className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 border border-surface-200/60 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por paciente, propietario o diagnóstico..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm font-medium text-surface-700 placeholder-surface-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300"
                        />
                    </div>

                    {/* Species Filter */}
                    <select
                        value={filterSpecies}
                        onChange={(e) => setFilterSpecies(e.target.value)}
                        className="px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm font-bold text-surface-700 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 cursor-pointer"
                    >
                        <option value="all">Todas las especies</option>
                        <option value="dog">🐕 Perros</option>
                        <option value="cat">🐈 Gatos</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm font-bold text-surface-700 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 cursor-pointer"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="active">✅ Activos</option>
                        <option value="inactive">📋 Inactivos</option>
                    </select>
                </div>
            </div>

            {/* Medical Records List */}
            <div className="space-y-4">
                {filteredRecords.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 border border-surface-200/60 text-center">
                        <FileText className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-surface-900 mb-2">No se encontraron registros</h3>
                        <p className="text-surface-600">Intenta ajustar los filtros de búsqueda</p>
                    </div>
                ) : (
                    filteredRecords.map((record) => (
                        <div
                            key={record.id}
                            className="bg-white rounded-2xl border border-surface-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            {/* Record Header - Always Visible */}
                            <div
                                onClick={() => toggleExpand(record.id)}
                                className="p-6 cursor-pointer hover:bg-surface-50/50 transition-colors duration-200"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        {/* Pet Icon */}
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${record.species === 'dog' ? 'bg-blue-100' : 'bg-orange-100'
                                            }`}>
                                            <PawPrint className={`w-7 h-7 ${record.species === 'dog' ? 'text-blue-600' : 'text-orange-600'
                                                }`} />
                                        </div>

                                        {/* Record Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-extrabold text-surface-900">{record.petName}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-surface-100 text-surface-600'
                                                    }`}>
                                                    {record.status === 'active' ? '✓ Activo' : 'Inactivo'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                <div className="flex items-center gap-2 text-surface-600">
                                                    <User className="w-4 h-4 text-surface-400" />
                                                    <span className="font-medium">{record.owner}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-surface-600">
                                                    <Calendar className="w-4 h-4 text-surface-400" />
                                                    <span className="font-medium">Última visita: {record.lastVisit}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-surface-600">
                                                    <Stethoscope className="w-4 h-4 text-surface-400" />
                                                    <span className="font-medium">{record.diagnosis}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expand Button */}
                                    <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                                        {expandedRecord === record.id ? (
                                            <ChevronUp className="w-5 h-5 text-surface-600" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-surface-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedRecord === record.id && (
                                <div className="px-6 pb-6 pt-0 border-t border-surface-100 bg-surface-50/30 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-xs font-extrabold text-surface-500 uppercase tracking-wider mb-2">Información del Paciente</h4>
                                                <div className="bg-white rounded-xl p-4 space-y-2 border border-surface-200/60">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-surface-600 font-medium">Raza:</span>
                                                        <span className="text-sm text-surface-900 font-bold">{record.breed}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-surface-600 font-medium">Edad:</span>
                                                        <span className="text-sm text-surface-900 font-bold">{record.age} años</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-surface-600 font-medium">Peso:</span>
                                                        <span className="text-sm text-surface-900 font-bold">{record.weight}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-surface-600 font-medium">Temperatura:</span>
                                                        <span className="text-sm text-surface-900 font-bold">{record.temperature}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-xs font-extrabold text-surface-500 uppercase tracking-wider mb-2">Medicamentos</h4>
                                                <div className="bg-white rounded-xl p-4 border border-surface-200/60">
                                                    <div className="space-y-2">
                                                        {record.medications.map((med, idx) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <Pill className="w-4 h-4 text-primary-500" />
                                                                <span className="text-sm text-surface-900 font-medium">{med}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-xs font-extrabold text-surface-500 uppercase tracking-wider mb-2">Diagnóstico y Tratamiento</h4>
                                                <div className="bg-white rounded-xl p-4 border border-surface-200/60 space-y-3">
                                                    <div>
                                                        <span className="text-xs text-surface-500 font-bold uppercase tracking-wider">Diagnóstico</span>
                                                        <p className="text-sm text-surface-900 font-medium mt-1">{record.diagnosis}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-surface-500 font-bold uppercase tracking-wider">Tratamiento</span>
                                                        <p className="text-sm text-surface-900 font-medium mt-1">{record.treatment}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-xs font-extrabold text-surface-500 uppercase tracking-wider mb-2">Notas Clínicas</h4>
                                                <div className="bg-white rounded-xl p-4 border border-surface-200/60">
                                                    <p className="text-sm text-surface-700 font-medium leading-relaxed">{record.notes}</p>
                                                </div>
                                            </div>

                                            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Clock className="w-4 h-4 text-primary-600" />
                                                    <span className="text-xs font-bold text-primary-900 uppercase tracking-wider">Próxima Cita</span>
                                                </div>
                                                <p className="text-lg font-extrabold text-primary-600">{record.nextAppointment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;
