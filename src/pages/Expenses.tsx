import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';
import { Wallet, Receipt, ShoppingCart, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

const expenseCategories = [
    { name: 'Raw Materials', value: 35, color: '#0017FE', icon: Zap },
    { name: 'Manufacturing', value: 25, color: '#2563EB', icon: ShoppingCart },
    { name: 'Logistics', value: 15, color: '#3B82F6', icon: Wallet },
    { name: 'Showroom Rent', value: 15, color: '#60A5FA', icon: Receipt },
    { name: 'Marketing', value: 10, color: '#93C5FD', icon: Wallet },
];

export default function Expenses() {
    const { transactions } = useData();

    // Derive total outbound transactions
    const totalExpenses = transactions
        .filter(t => t.type === 'Outbound')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Expenses</h1>
                <p className="text-muted-foreground text-sm font-medium">Track and categorize your business spending.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-black uppercase tracking-tight">Spending by Category</h3>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Distribution of monthly operational costs</p>
                    </div>
                    <div className="flex-1 h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseCategories}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {expenseCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{
                                        paddingTop: '30px',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-4">
                    {expenseCategories.map((cat) => (
                        <div key={cat.name} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 group hover:border-primary/50 transition-all active:scale-[0.98]">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${cat.color}10`, color: cat.color, borderColor: `${cat.color}20` }}>
                                <cat.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm tracking-tight">{cat.name}</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Allocation</p>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-lg tracking-tighter">{cat.value}%</p>
                                <div className="w-20 h-1.5 bg-accent/50 rounded-full mt-2 overflow-hidden border border-border/10">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl mt-4 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Total Expenses</h4>
                            <p className="text-4xl font-black mt-1 tracking-tighter">₱{totalExpenses.toLocaleString()}</p>
                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 uppercase">
                                <Zap className="w-3 h-3 fill-current" />
                                15% under budget
                            </p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                            <Wallet className="w-24 h-24 text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
