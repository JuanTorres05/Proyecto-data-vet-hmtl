import { useState } from 'react';
import RegisterClientForm from './components/forms/RegisterClientForm';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import { PawPrint, Search } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-surface-200/60 sticky top-0 z-50 transition-all duration-300">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-sm">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-surface-900 tracking-tight leading-none">
                    DataVet
                  </h1>
                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest leading-none mt-1">Manager</p>
                </div>
              </div>

              {/* Search Bar - Integrated Pill */}
              <div className="relative max-w-md w-full hidden md:block group">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Buscar paciente, propietario..."
                    className="w-full pl-12 pr-6 py-2.5 bg-surface-50 border border-surface-200 rounded-full text-sm font-medium text-surface-700 placeholder-surface-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' ? (
              <Dashboard />
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                    Registro de Pacientes
                  </h2>
                  <p className="text-slate-600 text-lg">
                    Ingresa los datos del cliente y su mascota para crear un nuevo expediente.
                  </p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <RegisterClientForm />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App
