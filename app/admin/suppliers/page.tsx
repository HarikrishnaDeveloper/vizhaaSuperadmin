'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Avatar, Badge, Card, PageHeader, SearchInput, StateMessage, SUPPLIER_STATUS_LABELS, formatCurrency, formatDate, td, th, useApi, useDebounced,
} from '@/lib/admin-ui';

type Supplier = {
  id: string;
  name: string | null;
  mobile: string;
  city: string | null;
  createdAt: string;
  supplierProfile: {
    id: string;
    status: string;
    kycStatus: string;
    walletBalance: number;
    kycSubmittedAt: string | null;
    businessName: string | null;
    businessType: string | null;
    city: string | null;
    _count: { enrollments: number };
  } | null;
};

const statusOf = (s: Supplier) => s.supplierProfile?.status ?? 'DRAFT';

// Needs-action first, then the rest of the lifecycle
const TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'UNDER_REVIEW', label: 'Under review' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
  { key: 'KYC_PENDING', label: 'Awaiting KYC' },
  { key: 'DRAFT', label: 'Profile incomplete' },
  { key: 'SUSPENDED', label: 'Suspended' },
];

// Older links (e.g. the dashboard's "Pending KYC" card) use ?kyc=PENDING
const LEGACY_TABS: Record<string, string> = { PENDING: 'UNDER_REVIEW', NOT_SUBMITTED: 'KYC_PENDING' };

export default function SuppliersPage() {
  return (
    <Suspense>
      <Suppliers />
    </Suspense>
  );
}

function Suppliers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedTab, setTab] = useState<string | null>(null);
  const q = useDebounced(search.trim());
  const { data, loading, error } = useApi<{ suppliers: Supplier[] }>(
    `/admin/suppliers${q ? `?q=${encodeURIComponent(q)}` : ''}`
  );

  // Links may preselect a tab with ?status=… (or the older ?kyc=…); a tab click takes over
  const param = searchParams.get('status') ?? searchParams.get('kyc') ?? '';
  const linked = LEGACY_TABS[param] ?? param;
  const tab = selectedTab ?? (TABS.some((t) => t.key === linked) ? linked : 'ALL');

  const all = data?.suppliers || [];
  const suppliers = tab === 'ALL' ? all : all.filter((s) => statusOf(s) === tab);
  const count = (key: string) => (key === 'ALL' ? all.length : all.filter((s) => statusOf(s) === key).length);

  return (
    <>
      <PageHeader
        title="Suppliers"
        subtitle="Supplier onboarding, verification and wallets"
        action={<SearchInput value={search} onChange={setSearch} placeholder="Search name, business, mobile, city" />}
      />

      <div className="flex gap-1 overflow-x-auto mb-4 -mx-1 px-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.label}
            {data && <span className="ml-1.5 text-xs text-slate-400">{count(t.key)}</span>}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <StateMessage
          loading={loading && !data}
          error={error}
          empty={!!data && !suppliers.length}
          emptyText={q || tab !== 'ALL' ? 'No suppliers match these filters.' : 'No suppliers have signed up yet.'}
        />
        {!!suppliers.length && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className={th}>Supplier</th>
                  <th className={th}>Business</th>
                  <th className={th}>City</th>
                  <th className={th}>Status</th>
                  <th className={`${th} text-right`}>Enrollments</th>
                  <th className={`${th} text-right`}>Wallet</th>
                  <th className={th}>Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map((s) => (
                  <tr key={s.id} onClick={() => router.push(`/admin/suppliers/${s.id}`)} className="cursor-pointer hover:bg-slate-50">
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Avatar name={s.name} />
                        <div>
                          <p className="font-medium text-slate-900">{s.name || '—'}</p>
                          <p className="text-xs text-slate-500">{s.mobile}</p>
                        </div>
                      </div>
                    </td>
                    <td className={td}>
                      <p className="text-slate-900">{s.supplierProfile?.businessName || '—'}</p>
                      <p className="text-xs text-slate-500">{s.supplierProfile?.businessType || ''}</p>
                    </td>
                    <td className={td}>{s.supplierProfile?.city || s.city || '—'}</td>
                    <td className={td}><Badge value={statusOf(s)} label={SUPPLIER_STATUS_LABELS[statusOf(s)]} /></td>
                    <td className={`${td} text-right`}>{s.supplierProfile?._count.enrollments ?? 0}</td>
                    <td className={`${td} text-right`}>{formatCurrency(s.supplierProfile?.walletBalance)}</td>
                    <td className={td}>{formatDate(s.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
