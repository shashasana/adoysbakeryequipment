export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    leadType: 'Hot' | 'Warm' | 'Cold' | 'Customer';
    paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'Unsettled';
    balance: number;
    totalSpent: number;
    lastContact: string;
}

export interface Transaction {
    id: string;
    date: string;
    clientId: string;
    clientName: string;
    amount: number;
    type: 'Inbound' | 'Outbound';
    status: 'Completed' | 'Pending' | 'Failed';
    description: string;
}

export interface RevenueData {
    month: string;
    revenue: number;
    expenses: number;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: 'Ovens' | 'Mixers' | 'Proofers' | 'Refrigeration' | 'Smallwares';
    status: 'In Stock' | 'Maintenance' | 'Ordered' | 'Out of Stock';
    price: number;
    stock: number;
    lastService: string;
}

export const mockClients: Client[] = [
    { id: '1', name: 'Sunny Bakeshop', email: 'hello@sunnybakes.com', phone: '+1 555-0101', leadType: 'Customer', paymentStatus: 'Paid', balance: 0, totalSpent: 12500, lastContact: '2024-02-28' },
    { id: '2', name: 'Artisan Pastries', email: 'staff@artisanpastries.com', phone: '+1 555-0102', leadType: 'Warm', paymentStatus: 'Pending', balance: 1200, totalSpent: 4500, lastContact: '2024-03-01' },
    { id: '3', name: 'Golden Crust Bakery', email: 'owner@goldencrust.co', phone: '+1 555-0103', leadType: 'Hot', paymentStatus: 'Unsettled', balance: 3500, totalSpent: 0, lastContact: '2024-02-15' },
    { id: '4', name: 'Flour Power Cafe', email: 'manager@flourpower.com', phone: '+1 555-0104', leadType: 'Customer', paymentStatus: 'Paid', balance: 0, totalSpent: 8900, lastContact: '2024-02-20' },
    { id: '5', name: 'Sweet Kneads', email: 'orders@sweetkneads.io', phone: '+1 555-0105', leadType: 'Cold', paymentStatus: 'Overdue', balance: 500, totalSpent: 1500, lastContact: '2024-01-10' },
];

export const mockInventory: InventoryItem[] = [
    { id: 'inv1', name: 'Industrial Deck Oven', category: 'Ovens', status: 'In Stock', price: 8500, stock: 3, lastService: '2024-01-15' },
    { id: 'inv2', name: '60qt Planetary Mixer', category: 'Mixers', status: 'In Stock', price: 4200, stock: 5, lastService: '2024-02-10' },
    { id: 'inv3', name: 'Double Door Proofer', category: 'Proofers', status: 'Maintenance', price: 2800, stock: 1, lastService: '2024-03-01' },
    { id: 'inv4', name: 'Blast Chiller', category: 'Refrigeration', status: 'Ordered', price: 5400, stock: 0, lastService: 'N/A' },
    { id: 'inv5', name: 'Dough Sheeter', category: 'Smallwares', status: 'In Stock', price: 3100, stock: 2, lastService: '2023-12-20' },
];

export const mockTransactions: Transaction[] = [
    { id: 't1', date: '2024-03-01', clientId: '1', clientName: 'Sunny Bakeshop', amount: 8500, type: 'Inbound', status: 'Completed', description: 'Industrial Deck Oven' },
    { id: 't2', date: '2024-03-01', clientId: '2', clientName: 'Artisan Pastries', amount: 1200, type: 'Inbound', status: 'Pending', description: 'Mixer Repair Service' },
    { id: 't3', date: '2024-02-28', clientId: '4', clientName: 'Flour Power Cafe', amount: 3100, type: 'Inbound', status: 'Completed', description: 'Double Dough Sheeter' },
    { id: 't4', date: '2024-02-27', clientId: '0', clientName: 'Steel Supplies', amount: 1450, type: 'Outbound', status: 'Completed', description: 'Baking Rack Materials' },
];

export const mockRevenue: RevenueData[] = [
    { month: 'Sep', revenue: 45000, expenses: 32000 },
    { month: 'Oct', revenue: 52000, expenses: 34000 },
    { month: 'Nov', revenue: 48000, expenses: 31000 },
    { month: 'Dec', revenue: 61000, expenses: 38000 },
    { month: 'Jan', revenue: 55000, expenses: 35000 },
    { month: 'Feb', revenue: 67000, expenses: 40000 },
    { month: 'Mar', revenue: 72000, expenses: 42000 },
];
