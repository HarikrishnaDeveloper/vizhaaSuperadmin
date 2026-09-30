'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar, Card, PageHeader, SearchInput, StateMessage, formatCurrency, formatDate, td, th, useApi, useDebounced,
} from '@/lib/admin-ui';

type Organizer = {
  id: string;
  name: string | null;
  mobile: string;
  email: string | null;
  companyName: string | null;
  businessName: string | null;
  city: string | null;
  createdAt: string;
  totalSpend: number;
  _count: { events: number };
};

export default function OrganizersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const q = useDebounced(search.trim());
  const { data, loading, error } = useApi<{ organizers: Organizer[] }>(
    `/admin/organizers${q ? `?q=${encodeURIComponent(q)}` : ''}`
  );
  const organizers = data?.organizers || [];

  return (
    <>
      <PageHeader
        title="Organizers"
        subtitle={data ? `${organizers.length} organizer${organizers.length === 1 ? '' : 's'}` : 'Event organizers on Vizhaa'}
        action={<SearchInput value={search} onChange={setSearch} placeholder="Search name, company, mobile, city" />}
      />

      <Card className="overflow-hidden">
        <StateMessage
          loading={loading && !data}
          error={error}
          empty={!!data && !organizers.length}
          emptyText={q ? 'No organizers match your search.' : 'No organizers have signed up yet.'}
        />
        {!!organizers.length && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className={th}>Organizer</th>
                  <th className={th}>Mobile</th>
                  <th className={th}>Email</th>
                  <th className={th}>City</th>
                  <th className={`${th} text-right`}>Events</th>
                  <th className={`${th} text-right`}>Total booked</th>
                  <th className={th}>Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {organizers.map((o) => (
                  <tr key={o.id} onClick={() => router.push(`/admin/organizers/${o.id}`)} className="cursor-pointer hover:bg-slate-50">
                    <td className={td}>
                      <div className="flex items-center gap-3">
                        <Avatar name={o.name || o.companyName} />
                        <div>
                          <p className="font-medium text-slate-900">{o.name || '—'}</p>
                          <p className="text-xs text-slate-500">{o.companyName || o.businessName || 'No company'}</p>
                        </div>
                      </div>
                    </td>
                    <td className={td}>{o.mobile}</td>
                    <td className={td}>{o.email || '—'}</td>
                    <td className={td}>{o.city || '—'}</td>
                    <td className={`${td} text-right`}>{o._count.events}</td>
                    <td className={`${td} text-right`}>{formatCurrency(o.totalSpend)}</td>
                    <td className={td}>{formatDate(o.createdAt)}</td>
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
