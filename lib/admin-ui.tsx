'use client';

import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import apiClient from '@/lib/api-client';

// ─── Data fetching ──────────────────────────────────────────────────────────

export function apiError(err: unknown, fallback: string) {
  if (isAxiosError(err)) {
    if (!err.response) return 'Cannot reach the server. Check that the API is running.';
    return (err.response.data as { message?: string })?.message || fallback;
  }
  return fallback;
}

// Fetches `url`; keeps the previous data visible while a new request (search, reload) is in flight
export function useApi<T>(url: string) {
  const [reloadKey, setReloadKey] = useState(0);
  const key = `${url}#${reloadKey}`;
  const [result, setResult] = useState<{ key: string | null; data: T | null; error: string }>({ key: null, data: null, error: '' });

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get<T>(url)
      .then((res) => !cancelled && setResult({ key, data: res.data, error: '' }))
      .catch((err) => !cancelled && setResult((prev) => ({ key, data: prev.data, error: apiError(err, 'Could not load data.') })));
    return () => {
      cancelled = true;
    };
  }, [url, key]);

  return {
    data: result.data,
    error: result.key === key ? result.error : '',
    loading: result.key !== key,
    reload: () => setReloadKey((k) => k + 1),
  };
}

export function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Formatting ─────────────────────────────────────────────────────────────

export const formatCurrency = (n: number | null | undefined) =>
  `₹${(n ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export const formatDate = (d: string | null | undefined) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export const initials = (name?: string | null) =>
  (name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

// ─── Components ─────────────────────────────────────────────────────────────

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>;
}

// Event.status → label (matches the organizer app, except APPROVED shown there as "Confirmed")
export const EVENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending approval',
  APPROVED: 'Approved',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
};

const badgeStyles: Record<string, string> = {
  APPROVED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  COMPLETED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  ATTENDED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  CREDIT: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  captured: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  ENROLLED: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  OPEN: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  IN_PROGRESS: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  FILLED: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  REJECTED: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  NO_SHOW: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  DEBIT: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  CANCELLED: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  // Supplier onboarding
  DRAFT: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  KYC_PENDING: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  UNDER_REVIEW: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  SUSPENDED: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

// Supplier lifecycle (SupplierProfile.status), in onboarding order
export const SUPPLIER_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Profile incomplete',
  KYC_PENDING: 'Awaiting KYC',
  UNDER_REVIEW: 'Under review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  SUSPENDED: 'Suspended',
};

export function Badge({ value, label }: { value?: string | null; label?: string }) {
  const v = value || 'NOT_SUBMITTED';
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        badgeStyles[v] || 'bg-slate-100 text-slate-600 ring-slate-500/20'
      }`}
    >
      {label || v.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
    </span>
  );
}

export function Avatar({ name }: { name?: string | null }) {
  return (
    <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-semibold">
      {initials(name)}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative w-full sm:w-72">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.38 9.84l3.14 3.14a.75.75 0 1 0 1.06-1.06l-3.14-3.14A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}

export function StateMessage({ loading, error, empty, emptyText = 'Nothing here yet.' }: { loading?: boolean; error?: string; empty?: boolean; emptyText?: string }) {
  if (loading) return <div className="p-10 text-center text-sm text-slate-400">Loading…</div>;
  if (error) return <div className="p-10 text-center text-sm text-rose-600">{error}</div>;
  if (empty) return <div className="p-10 text-center text-sm text-slate-400">{emptyText}</div>;
  return null;
}

export function DetailRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm border-b border-slate-100 last:border-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-900 font-medium text-right break-all">{value || '—'}</dd>
    </div>
  );
}

export const th = 'px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap';
export const td = 'px-4 py-3 text-sm text-slate-700 whitespace-nowrap';
