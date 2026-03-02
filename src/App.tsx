import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { DataProvider } from './context/DataContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Revenue from './pages/Revenue';
import Transactions from './pages/Transactions';
import Expenses from './pages/Expenses';
import Inventory from './pages/Inventory';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="clients" element={<Clients />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="settings" element={<div className="text-2xl font-bold p-8">Settings Page (Coming Soon)</div>} />
              <Route path="*" element={<div className="text-2xl font-bold p-8">404 Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
