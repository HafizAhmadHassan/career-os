import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeTone = 'default' | 'primary' | 'green' | 'amber' | 'red' | 'blue' | 'muted' | 'purple';

const badgeTones: Record<BadgeTone, string> = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary/10 text-primary',
  green: 'bg-green-500/10 text-green-600',
  amber: 'bg-amber-500/10 text-amber-600',
  red: 'bg-red-500/10 text-red-500',
  blue: 'bg-blue-500/10 text-blue-500',
  muted: 'bg-muted text-muted-foreground',
  purple: 'bg-purple-500/10 text-purple-500',
};

export function Badge({ children, tone = 'default', className }: { children: React.ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', badgeTones[tone], className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-border bg-card p-5', className)}>{children}</div>;
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}>
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Stat({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon?: React.ReactNode }) {
  return (
    <Card className="flex items-start justify-between gap-2 py-4">
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
        {sub && <div className="mt-1 text-xs text-muted-foreground/70">{sub}</div>}
      </div>
      {icon && <div className="rounded-md bg-secondary p-2 text-primary">{icon}</div>}
    </Card>
  );
}

export function Section({
  id,
  icon,
  title,
  subtitle,
  right,
  children,
  className,
}: {
  id: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 rounded-lg border border-border bg-card p-5', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-0.5 rounded-md bg-secondary p-1.5 text-primary">{icon}</div>}
          <div>
            <h2 className="font-medium">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  size = 'md',
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
    ghost: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function inputClass(className?: string): string {
  return cn('w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40', className);
}