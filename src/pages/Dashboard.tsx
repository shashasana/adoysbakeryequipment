import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    CreditCard,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useData } from '../context/DataContext';
import { cn } from '../utils/cn';

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    // ... (rest of StatCard remains the same)
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 rounded-xl bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
            </div>
            <div className={cn(
                "flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border",
                trend === 'up'
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50"
                    : "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50"
            )}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {change}
            </div>
        </div>
        <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-black mt-1 tracking-tight">{value}</h3>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
            <Icon className="w-32 h-32 rotate-12" />
        </div>
    </div>
);

export default function Dashboard() {
    const { stats, transactions, revenue } = useData();

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Bakery HQ</h1>
                <p className="text-muted-foreground text-sm font-medium">Monitoring bakery equipment sales and service performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Equipment Sales"
                    value={`₱${stats.totalRevenue.toLocaleString()}`}
                    change="+12.5%"
                    trend="up"
                    icon={DollarSign}
                />
                <StatCard
                    title="Bakery Partners"
                    value={stats.activePartners.toString()}
                    change="+3.2%"
                    trend="up"
                    icon={Users}
                />
                <StatCard
                    title="Service Orders"
                    value={`₱${stats.serviceOrders.toLocaleString()}`}
                    change="-2.1%"
                    trend="down"
                    icon={CreditCard}
                />
                <StatCard
                    title="Leads Converted"
                    value={`${stats.leadsConverted}%`}
                    change="+4.3%"
                    trend="up"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Revenue Growth</h3>
                            <p className="text-xs text-muted-foreground font-medium">Monthly revenue progression</p>
                        </div>
                        <select className="bg-accent/50 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-border/50">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                />
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
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--color-primary)"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-3 bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Bakery Orders</h3>
                            <p className="text-xs text-muted-foreground font-medium">Latest equipment deliveries</p>
                        </div>
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                            Sales History <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {transactions.slice(0, 6).map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border",
                                        tx.type === 'Inbound'
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/50"
                                            : "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/50"
                                    )}>
                                        {tx.clientName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold truncate max-w-[120px]">{tx.clientName}</h4>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn(
                                        "text-sm font-black",
                                        tx.type === 'Inbound' ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                                    )}>
                                        {tx.type === 'Inbound' ? '+' : '-'}₱{tx.amount.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
