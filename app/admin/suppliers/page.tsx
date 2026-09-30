'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Avatar, Badge, Card, PageHeader, SearchInput, StateMessage, formatCurrency, formatDate, td, th, useApi, useDebounced,
} from '@/lib/admin-ui';

type Supplier = {
  id: string;
  name: string | null;
  mobile: string;
  gender: string | null;
  city: string | null;
  createdAt: string;
  supplierProfile: {
    id: string;
    kycStatus: string;
    walletBalance: number;
    kycSubmittedAt: string | null;
    _count: { enrollments: number };
  } | null;
};

// Effective KYC state: a profile is only "pending review" once documents are submitted
const kycState = (s: Supplier) => (s.supplierProfile?.kycSubmittedAt ? s.supplierProfile.kycStatus : 'NOT_SUBMITTED');

const TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending review' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
  { key: 'NOT_SUBMITTED', label: 'Not submitted' },
];

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

  // Dashboard links here with ?kyc=PENDING; an explicit tab click takes over
  const kycParam = searchParams.get('kyc');
  const tab = selectedTab ?? (TABS.some((t) => t.key === kycParam) ? kycParam! : 'ALL');

  const all = data?.suppliers || [];
  const suppliers = tab === 'ALL' ? all : all.filter((s) => kycState(s) === tab);
  const count = (key: string) => (key === 'ALL' ? all.length : all.filter((s) => kycState(s) === key).length);

  return (
    <>
      <PageHeader
        title="Suppliers"
        subtitle="Event staff, their KYC status and wallets"
        action={<SearchInput value={search} onChange={setSearch} placeholder="Search name, mobile, city" />}
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
                  <th className={th}>Gender</th>
                  <th className={th}>City</th>
                  <th className={th}>KYC</th>
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
                    <td className={td}>{s.gender || '—'}</td>
                    <td className={td}>{s.city || '—'}</td>
                    <td className={td}><Badge value={kycState(s)} label={kycState(s) === 'PENDING' ? 'Pending review' : undefined} /></td>
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
