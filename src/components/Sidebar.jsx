import { LayoutDashboard, UserPlus, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ currentView, setCurrentView }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'register', label: 'Nuevo Registro', icon: UserPlus },
    ];

    return (
        <aside
            className={`bg-white border-r border-surface-200/60 transition-all duration-500 ease-in-out flex flex-col z-40 h-screen sticky top-0 ${isCollapsed ? 'w-20' : 'w-72'
                }`}
        >
            {/* Sidebar Header */}
            <div className="p-8 flex items-center justify-between mb-4">
                {!isCollapsed && (
                    <div className="flex items-center gap-3 animate-fade-in">
                        <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 ring-4 ring-white/50">
                            <span className="text-white font-extrabold text-xl">D</span>
                        </div>
                        <div>
                            <h2 className="font-extrabold text-surface-900 text-xl tracking-tight leading-none">
                                DataVet
                            </h2>
                            <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest leading-none mt-1.5 ml-0.5">Admin Panel</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2.5 hover:bg-surface-100 rounded-xl transition-all duration-300 text-surface-400 hover:text-primary-600 hover:scale-105 active:scale-95 ${isCollapsed ? 'mx-auto' : ''}`}
                >
                    {isCollapsed ? (
                        <Menu className="w-6 h-6" />
                    ) : (
                        <div className="bg-surface-50 p-1.5 rounded-lg border border-surface-100">
                            <X className="w-4 h-4" />
                        </div>
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 py-2">
                <ul className="space-y-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentView(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 translate-x-1'
                                        : 'text-surface-600 hover:bg-white/50 hover:text-primary-700 hover:shadow-sm'
                                        } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    {!isCollapsed && (
                                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                    )}

                                    {/* Active Indicator Dot for collapsed state */}
                                    {isCollapsed && isActive && (
                                        <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-surface-100/50">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-surface-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group ${isCollapsed ? 'justify-center' : ''}`}>
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {!isCollapsed && <span className="font-bold text-sm">Cerrar Sesión</span>}
                </button>

                {!isCollapsed && (
                    <div className="mt-6 flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-surface-200 border-2 border-white shadow-sm"></div>
                        <div>
                            <p className="text-xs font-bold text-surface-900">Dr. Veterinario</p>
                            <p className="text-[10px] text-surface-500 font-medium">Admin</p>
                        </div>
                        <Settings className="w-4 h-4 text-surface-400 ml-auto cursor-pointer hover:text-primary-600 transition-colors" />
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
