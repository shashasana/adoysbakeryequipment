import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Mail,
    Phone,
    CheckCircle2,
    Clock,
    AlertCircle,
    X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import type { Client } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }: { status: Client['paymentStatus'] }) => {
    const styles = {
        Paid: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50",
        Pending: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50",
        Unsettled: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50",
        Overdue: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50 shadow-sm"
    };

    const Icon = {
        Paid: CheckCircle2,
        Pending: Clock,
        Unsettled: AlertCircle,
        Overdue: AlertCircle
    }[status];

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border transition-all hover:scale-105", styles[status])}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
};

export default function Clients() {
    const { clients, addClient } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newClient, setNewClient] = useState({
        name: '',
        leadType: 'Hot' as Client['leadType'],
        email: '',
        phone: ''
    });

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        addClient(newClient);
        setNewClient({ name: '', leadType: 'Hot', email: '', phone: '' });
        setIsAddModalOpen(false);
    };

    return (
        <div className="space-y-8 pb-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Bakery Partners</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage your bakeshop accounts and equipment service leads.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Client
                </button>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 bg-background/30">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search bakeries by name, contact..."
                            className="w-full h-11 pl-10 pr-4 text-sm bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:bg-accent transition-all text-[11px] font-black uppercase tracking-widest shadow-sm active:scale-95">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-accent/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border">
                                <th className="px-6 py-5">Bakery / Client</th>
                                <th className="px-6 py-5">Primary Contact</th>
                                <th className="px-6 py-5">Lead Type</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Service Balance</th>
                                <th className="px-6 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredClients.map((client) => (
                                <motion.tr
                                    layout
                                    key={client.id}
                                    className="group hover:bg-accent/20 transition-colors"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                                                {client.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold tracking-tight">{client.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">ID: {client.id.padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                                <Mail className="w-3 h-3 text-primary" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                                <Phone className="w-3 h-3 text-primary" />
                                                {client.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={cn(
                                            "inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                                            client.leadType === 'Hot' ? "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:border-rose-800/50" :
                                                client.leadType === 'Warm' ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:border-amber-800/50" :
                                                    client.leadType === 'Cold' ? "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-950/30 dark:border-slate-800/50" :
                                                        "bg-primary/5 text-primary border-primary/10"
                                        )}>
                                            {client.leadType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={client.paymentStatus} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className={cn("text-sm font-black tracking-tight", client.balance > 0 ? "text-rose-600" : "text-emerald-600")}>
                                            ₱{client.balance.toLocaleString()}
                                        </p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">of ₱{client.totalSpent.toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 rounded-lg hover:bg-accent opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                                            <MoreHorizontal className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Client Modal Overlay */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg p-8 bg-card rounded-2xl shadow-2xl border border-border"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Register New Bakery</h3>
                                    <p className="text-xs text-muted-foreground font-medium mt-1">Add a new partner or equipment lead</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={handleAddClient}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Bakery Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full h-11 px-4 bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all font-medium text-sm"
                                            placeholder="Crescent Flour Bakeshop"
                                            value={newClient.name}
                                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Lead Type</label>
                                        <select
                                            className="w-full h-11 px-4 bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all font-bold text-xs uppercase tracking-wider"
                                            value={newClient.leadType}
                                            onChange={(e) => setNewClient({ ...newClient, leadType: e.target.value as Client['leadType'] })}
                                        >
                                            <option value="Hot">Hot Lead</option>
                                            <option value="Warm">Warm Lead</option>
                                            <option value="Cold">Cold Lead</option>
                                            <option value="Customer">Active Partner</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full h-11 px-4 bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all font-medium text-sm"
                                        placeholder="owner@crescentbakery.com"
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 pt-6">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="h-12 px-6 border border-border rounded-xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all active:scale-95">
                                        Cancel
                                    </button>
                                    <button type="submit" className="h-12 px-6 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        Confirm Registration
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
