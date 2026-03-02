import { useData } from '../context/DataContext';
import { cn } from '../utils/cn';
import { ArrowDownLeft, ArrowUpRight, Search, Filter, MoreVertical } from 'lucide-react';

export default function Transactions() {
    const { transactions } = useData();

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Transactions</h1>
                <p className="text-muted-foreground text-sm font-medium">Monitor all incoming and outgoing financial activity.</p>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between gap-4 bg-background/30">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full h-11 pl-10 pr-4 bg-accent/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:bg-accent transition-all text-[11px] font-black uppercase tracking-widest shadow-sm active:scale-95">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-accent/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border">
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Activity</th>
                                <th className="px-6 py-5">Date</th>
                                <th className="px-6 py-5 text-right">Amount</th>
                                <th className="px-6 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="group hover:bg-accent/20 transition-colors">
                                    <td className="px-6 py-5">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                                            tx.status === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50" :
                                                tx.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50" :
                                                    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50"
                                        )}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110",
                                                tx.type === 'Inbound'
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-800/50"
                                                    : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:border-rose-800/50"
                                            )}>
                                                {tx.type === 'Inbound' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold tracking-tight">{tx.description}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">{tx.clientName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-bold text-muted-foreground uppercase">{tx.date}</p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className={cn(
                                            "text-sm font-black tracking-tight",
                                            tx.type === 'Inbound' ? "text-emerald-600" : "text-rose-600"
                                        )}>
                                            {tx.type === 'Inbound' ? '+' : '-'}₱{tx.amount.toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 rounded-lg hover:bg-accent opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
