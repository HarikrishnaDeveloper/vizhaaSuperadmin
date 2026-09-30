'use client';

import Link from 'next/link';
import { Avatar, Badge, Card, PageHeader, StateMessage, formatDate, useApi } from '@/lib/admin-ui';

type Stats = {
  totalEvents: number;
  pendingEvents: number;
  totalOrganizers: number;
  totalSuppliers: number;
  pendingKyc: number;
  openPosts: number;
  totalEnrollments: number;
};

type RecentOrganizer = { id: string; name: string | null; mobile: string; companyName: string | null; businessName: string | null; createdAt: string; _count?: { events: number } };
type RecentSupplier = { id: string; name: string | null; mobile: string; createdAt: string; supplierProfile: { kycStatus: string; kycSubmittedAt: string | null } | null };

export default function AdminDashboard() {
  const stats = useApi<{ stats: Stats }>('/admin/dashboard');
  const organizers = useApi<{ organizers: RecentOrganizer[] }>('/admin/organizers');
  const suppliers = useApi<{ suppliers: RecentSupplier[] }>('/admin/suppliers');
  const s = stats.data?.stats;

  const cards = [
    { label: 'Organizers', value: s?.totalOrganizers, href: '/admin/organizers' },
    { label: 'Suppliers', value: s?.totalSuppliers, href: '/admin/suppliers' },
    { label: 'Pending KYC', value: s?.pendingKyc, href: '/admin/suppliers?kyc=PENDING', highlight: !!s?.pendingKyc },
    { label: 'Total events', value: s?.totalEvents, href: '/admin/events' },
    { label: 'Pending events', value: s?.pendingEvents, href: '/admin/events?status=PENDING', highlight: !!s?.pendingEvents },
    { label: 'Active enrollments', value: s?.totalEnrollments },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of the Vizhaa platform" />

      {stats.error && <Card className="mb-6"><StateMessage error={stats.error} /></Card>}

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {cards.map((c) => {
          const body = (
            <Card className={`p-4 h-full transition ${c.href ? 'hover:border-indigo-300' : ''}`}>
              <p className="text-xs font-medium text-slate-500">{c.label}</p>
              <p className={`mt-2 text-2xl font-semibold ${c.highlight ? 'text-amber-600' : 'text-slate-900'}`}>
                {stats.loading ? '–' : (c.value ?? 0).toLocaleString('en-IN')}
              </p>
            </Card>
          );
          return c.href ? <Link key={c.label} href={c.href}>{body}</Link> : <div key={c.label}>{body}</div>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentList
          title="Recent organizers"
          href="/admin/organizers"
          loading={organizers.loading}
          error={organizers.error}
          rows={(organizers.data?.organizers || []).slice(0, 5).map((o) => ({
            id: o.id,
            href: `/admin/organizers/${o.id}`,
            name: o.name || o.companyName || o.mobile,
            sub: o.companyName || o.businessName || o.mobile,
            right: <span className="text-xs text-slate-500">{o._count?.events ?? 0} events</span>,
            date: o.createdAt,
          }))}
        />
        <RecentList
          title="Recent suppliers"
          href="/admin/suppliers"
          loading={suppliers.loading}
          error={suppliers.error}
          rows={(suppliers.data?.suppliers || []).slice(0, 5).map((u) => ({
            id: u.id,
            href: `/admin/suppliers/${u.id}`,
            name: u.name || u.mobile,
            sub: u.mobile,
            right: <Badge value={u.supplierProfile?.kycSubmittedAt ? u.supplierProfile.kycStatus : null} />,
            date: u.createdAt,
          }))}
        />
      </div>
    </>
  );
}

function RecentList({
  title, href, rows, loading, error,
}: {
  title: string;
  href: string;
  loading: boolean;
  error: string;
  rows: { id: string; href: string; name: string; sub: string; right: React.ReactNode; date: string }[];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <Link href={href} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</Link>
      </div>
      <StateMessage loading={loading} error={error} empty={!rows.length} emptyText="No one has signed up yet." />
      {!loading && !error && (
        <ul className="divide-y divide-slate-100">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={r.href} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                <Avatar name={r.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{r.name}</p>
                  <p className="truncate text-xs text-slate-500">{r.sub} · Joined {formatDate(r.date)}</p>
                </div>
                {r.right}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
