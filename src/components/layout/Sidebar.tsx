import { NavLink } from 'react-router-dom';
import {
    Home,
    Users,
    BarChart3,
    ArrowLeftRight,
    Wallet,
    Settings,
    Package,
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: BarChart3, label: 'Sales & Revenue', path: '/revenue' },
    { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
    { icon: Wallet, label: 'Expenses', path: '/expenses' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-background/50">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-black tracking-tight uppercase italic leading-none">
                                Adoy's <br />
                                <span className="text-primary text-xs not-italic tracking-[0.2em] -mt-1 block">Bakery Equip</span>
                            </span>
                        </div>
                        <button className="lg:hidden p-2 hover:bg-accent rounded-lg" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose()}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/10"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground font-medium"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                                    "text-inherit"
                                )} />
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-border bg-background/30 mt-auto">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground font-bold"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground font-medium"
                            )}
                        >
                            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                            <span className="text-sm">Settings</span>
                        </NavLink>
                    </div>
                </div>
            </aside>
        </>
    );
}
