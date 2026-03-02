import { Menu, Sun, Moon, Bell, Search, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b border-border bg-background/80 backdrop-blur-md lg:px-6">
            <button
                className="p-2 mr-4 rounded-lg lg:hidden hover:bg-accent hover:text-accent-foreground"
                onClick={onMenuClick}
            >
                <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center flex-1 gap-4">
                <div className="relative flex-1 max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-10 pl-10 pr-4 text-sm bg-accent/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />}
                </button>

                <button className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors relative group">
                    <Bell className="w-5 h-5 group-hover:shake" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-background" />
                </button>

                <div className="flex items-center gap-3 pl-2 ml-2 border-l border-border">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-bold">John Doe</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Administrator</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
