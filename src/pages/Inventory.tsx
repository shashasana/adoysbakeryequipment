import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Package,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ShieldAlert
} from 'lucide-react';
import { useData } from '../context/DataContext';
import type { InventoryItem } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }: { status: InventoryItem['status'] }) => {
    const styles = {
        'In Stock': "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50",
        'Maintenance': "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50",
        'Ordered': "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/50",
        'Out of Stock': "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50"
    };

    const Icon = {
        'In Stock': CheckCircle2,
        'Maintenance': AlertTriangle,
        'Ordered': Clock,
        'Out of Stock': ShieldAlert
    }[status];

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border", styles[status])}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
};

export default function Inventory() {
    const { inventory } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Inventory</h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage bakery machinery and equipment stock.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <Plus className="w-5 h-5" />
                    Add Equipment
                </button>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 bg-background/30">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search equipment by name or category..."
                            className="w-full h-11 pl-10 pr-4 text-sm bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:bg-accent transition-all text-[11px] font-black uppercase tracking-widest shadow-sm">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-accent/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border">
                                <th className="px-6 py-5">Equipment</th>
                                <th className="px-6 py-5">Category</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Stock Level</th>
                                <th className="px-6 py-5 text-right">Unit Price</th>
                                <th className="px-6 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredInventory.map((item) => (
                                <motion.tr
                                    layout
                                    key={item.id}
                                    className="group hover:bg-accent/20 transition-colors"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black shadow-sm group-hover:rotate-6 transition-transform">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold tracking-tight">{item.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">ID: {item.id.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.category}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-sm font-black",
                                                item.stock === 0 ? "text-rose-600" : item.stock < 3 ? "text-amber-600" : "text-emerald-600"
                                            )}>
                                                {item.stock} units
                                            </span>
                                            <div className="flex-1 w-16 h-1.5 bg-accent rounded-full overflow-hidden hidden sm:block">
                                                <div
                                                    className={cn("h-full rounded-full", item.stock === 0 ? "bg-rose-500" : item.stock < 3 ? "bg-amber-500" : "bg-emerald-500")}
                                                    style={{ width: `${Math.min(item.stock * 20, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="text-sm font-black tracking-tight">₱{item.price.toLocaleString()}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase italic">Retail</p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 rounded-lg hover:bg-accent opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                                            <MoreVertical className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
