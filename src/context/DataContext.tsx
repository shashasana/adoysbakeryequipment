import React, { createContext, useContext, useState, useMemo } from 'react';
import type {
    Client,
    Transaction,
    RevenueData,
    InventoryItem
} from '../data/mockData';
import {
    mockClients,
    mockTransactions,
    mockRevenue,
    mockInventory
} from '../data/mockData';

interface DataContextType {
    clients: Client[];
    transactions: Transaction[];
    revenue: RevenueData[];
    inventory: InventoryItem[];
    addClient: (client: Omit<Client, 'id' | 'balance' | 'totalSpent' | 'lastContact' | 'paymentStatus'>) => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
    updateInventoryStock: (id: string, newStock: number) => void;

    // Derived Stats
    stats: {
        totalRevenue: number;
        activePartners: number;
        serviceOrders: number;
        leadsConverted: number;
        revenueGrowth: number;
    };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
    const [revenue] = useState<RevenueData[]>(mockRevenue);

    const addClient = (clientData: Omit<Client, 'id' | 'balance' | 'totalSpent' | 'lastContact' | 'paymentStatus'>) => {
        const newClient: Client = {
            ...clientData,
            id: (clients.length + 1).toString(),
            balance: 0,
            totalSpent: 0,
            lastContact: new Date().toISOString().split('T')[0],
            paymentStatus: 'Pending'
        };
        setClients(prev => [newClient, ...prev]);
    };

    const addTransaction = (txData: Omit<Transaction, 'id' | 'date'>) => {
        const newTx: Transaction = {
            ...txData,
            id: `t${transactions.length + 1}`,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions(prev => [newTx, ...prev]);

        // Logical update: if it's an inbound transaction for a client, update their totalSpent
        if (txData.type === 'Inbound' && txData.clientId !== '0') {
            setClients(prevClients => prevClients.map(c =>
                c.id === txData.clientId
                    ? { ...c, totalSpent: c.totalSpent + txData.amount }
                    : c
            ));
        }
    };

    const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>) => {
        const newItem: InventoryItem = {
            ...itemData,
            id: `inv${inventory.length + 1}`
        };
        setInventory(prev => [newItem, ...prev]);
    };

    const updateInventoryStock = (id: string, newStock: number) => {
        setInventory(prev => prev.map(item =>
            item.id === id ? { ...item, stock: newStock } : item
        ));
    };

    const stats = useMemo(() => {
        const totalRevenue = transactions
            .filter(t => t.type === 'Inbound' && t.status === 'Completed')
            .reduce((sum, t) => sum + t.amount, 0);

        const activePartners = clients.filter(c => c.leadType === 'Customer').length;

        const serviceOrders = transactions
            .filter(t => t.status === 'Pending')
            .reduce((sum, t) => sum + t.amount, 0);

        const leadsConverted = clients.filter(c => c.leadType === 'Customer').length;
        const totalLeads = clients.length;
        const conversionRate = totalLeads > 0 ? (leadsConverted / totalLeads) * 100 : 0;

        return {
            totalRevenue,
            activePartners,
            serviceOrders,
            leadsConverted: parseFloat(conversionRate.toFixed(1)),
            revenueGrowth: 12.5 // Placeholder for growth calculation logic
        };
    }, [clients, transactions]);

    return (
        <DataContext.Provider value={{
            clients,
            transactions,
            revenue,
            inventory,
            addClient,
            addTransaction,
            addInventoryItem,
            updateInventoryStock,
            stats
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
