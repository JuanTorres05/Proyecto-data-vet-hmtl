import { ChevronDown, AlertCircle } from 'lucide-react';

const SelectField = ({
    label,
    name,
    options,
    icon: Icon,
    required = false,
    value,
    onChange,
    error
}) => (
    <div className="group">
        <label className="block text-xs font-extrabold text-surface-700 uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-primary-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-surface-400 group-focus-within:text-primary-600 transition-colors duration-300">
                {Icon && <Icon className="h-5 w-5" />}
            </div>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`block w-full ${Icon ? 'pl-11' : 'pl-4'} pr-10 py-3 bg-white border rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-4 transition-all duration-300 shadow-sm appearance-none cursor-pointer
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-surface-200 hover:border-surface-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'
                    }`}
            >
                <option value="">Seleccionar</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-surface-400">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
        {error && (
            <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500 text-xs font-medium animate-fade-in">
                <AlertCircle className="w-3 h-3" />
                <span>{error}</span>
            </div>
        )}
    </div>
);

export default SelectField;
