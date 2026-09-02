import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, GitBranch } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/projects', label: 'Projects' },
  { path: '/github', label: 'GitHub' },
  { path: '/writing', label: 'Writing' },
  { path: '/interview', label: 'Interview' },
  { path: '/freelance', label: 'Freelance' },
  { path: '/dashboard', label: 'Dashboard' },
];

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = window.localStorage.getItem('career-os-theme');
  if (saved === 'light') return false;
  if (saved === 'dark') return true;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('career-os-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold">
            <span className="text-primary">career-os</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  location.pathname === item.path ||
                    (item.path === '/roadmap' && location.pathname.startsWith('/roadmap/')) ||
                    (item.path === '/projects' && location.pathname.startsWith('/projects/')) ||
                    (item.path === '/writing' && location.pathname.startsWith('/writing/')) ||
                    (item.path === '/interview' && location.pathname.startsWith('/interview/'))
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/hafizahmadhassan"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <GitBranch className="h-4 w-4" />
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-border px-4 py-2 lg:hidden">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                  location.pathname === item.path ||
                    (item.path === '/roadmap' && location.pathname.startsWith('/roadmap/')) ||
                    (item.path === '/projects' && location.pathname.startsWith('/projects/')) ||
                    (item.path === '/writing' && location.pathname.startsWith('/writing/')) ||
                    (item.path === '/interview' && location.pathname.startsWith('/interview/'))
                    ? 'bg-accent font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono">career-os</p>
          <p className="mt-1">Built with React + TypeScript + Tailwind CSS</p>
          <p className="mt-1">Deployed on GitHub Pages</p>
        </div>
      </footer>
    </div>
  );
}
