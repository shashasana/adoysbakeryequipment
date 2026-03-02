import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { DollarSign, Download, Calendar } from 'lucide-react';

export default function Revenue() {
    const { stats, revenue } = useData();

    return (
        <div className="space-y-8 pb-12 text-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight uppercase italic text-primary">Sales & Revenue</h1>
                    <p className="text-muted-foreground text-sm font-medium">Detailed breakdown of your business earnings.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-card border border-border font-bold rounded-xl transition-all hover:bg-accent shadow-sm active:scale-95">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Export Report</span>
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm group hover:border-primary/50 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30">
                            <DollarSign className="w-4 h-4" />
                        </div>
                        Projected Revenue
                    </p>
                    <h3 className="text-3xl font-black tracking-tight">₱{stats.totalRevenue.toLocaleString()}</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-800/50">+{stats.revenueGrowth}%</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">vs last month</span>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm group hover:border-primary/50 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-primary/5 text-primary border border-primary/10">
                            <Calendar className="w-4 h-4" />
                        </div>
                        Recurring Revenue
                    </p>
                    <h3 className="text-3xl font-black tracking-tight">₱85,400</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-lg border border-primary/10">72%</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">of total revenue</span>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm group hover:border-primary/50 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/30">
                            <Download className="w-4 h-4" />
                        </div>
                        Outstanding Invoices
                    </p>
                    <h3 className="text-3xl font-black tracking-tight">₱{stats.serviceOrders.toLocaleString()}</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-lg border border-rose-100 dark:border-rose-800/50">Active Orders</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">pending</span>
                    </div>
                </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                <div className="mb-10">
                    <h3 className="text-xl font-black uppercase tracking-tight">Revenue vs Expenses</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Comparison of gross earnings and operational costs</p>
                </div>
                <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenue}>
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
                                cursor={{ fill: 'var(--accent)', opacity: 0.1 }}
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
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: '30px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
                            />
                            <Bar dataKey="revenue" name="REVENUE" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="expenses" name="EXPENSES" fill="var(--color-brand-secondary)" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
