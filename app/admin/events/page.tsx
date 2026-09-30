'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Badge, Card, EVENT_STATUS_LABELS, PageHeader, SearchInput, StateMessage, formatCurrency, formatDate, td, th, useApi, useDebounced,
} from '@/lib/admin-ui';

type EventRow = {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string | null;
  date: string;
  inTime: string;
  outTime: string;
  suppliers: number;
  totalCost: number;
  advancePaid: number;
  status: string;
  createdAt: string;
  user: { id: string; name: string | null; mobile: string; companyName: string | null };
  eventPost: { id: string; status: string; isPublished: boolean; _count: { enrollments: number } } | null;
};

const TABS = [
  { key: 'ALL', label: 'All' },
  ...Object.entries(EVENT_STATUS_LABELS).map(([key, label]) => ({ key, label })),
];

export default function EventsPage() {
  return (
    <Suspense>
      <Events />
    </Suspense>
  );
}

function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedTab, setTab] = useState<string | null>(null);
  const q = useDebounced(search.trim());
  const { data, loading, error } = useApi<{ events: EventRow[] }>(`/admin/events${q ? `?q=${encodeURIComponent(q)}` : ''}`);

  // Dashboard links here with ?status=PENDING; an explicit tab click takes over
  const statusParam = searchParams.get('status');
  const tab = selectedTab ?? (TABS.some((t) => t.key === statusParam) ? statusParam! : 'ALL');

  const all = data?.events || [];
  const events = tab === 'ALL' ? all : all.filter((e) => e.status === tab);
  const count = (key: string) => (key === 'ALL' ? all.length : all.filter((e) => e.status === key).length);

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Organizer event requests: approve, staff and track them"
        action={<SearchInput value={search} onChange={setSearch} placeholder="Search event, venue, organizer" />}
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
          empty={!!data && !events.length}
          emptyText={q || tab !== 'ALL' ? 'No events match these filters.' : 'No events have been requested yet.'}
        />
        {!!events.length && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className={th}>Event</th>
                  <th className={th}>Organizer</th>
                  <th className={th}>Date</th>
                  <th className={`${th} text-right`}>Suppliers</th>
                  <th className={`${th} text-right`}>Total</th>
                  <th className={`${th} text-right`}>Paid</th>
                  <th className={th}>Status</th>
                  <th className={th}>Requested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((e) => (
                  <tr key={e.id} onClick={() => router.push(`/admin/events/${e.id}`)} className="cursor-pointer hover:bg-slate-50">
                    <td className={td}>
                      <p className="font-medium text-slate-900">{e.name}</p>
                      <p className="text-xs text-slate-500">{e.type} · {e.city || e.location}</p>
                    </td>
                    <td className={td}>
                      <p>{e.user.name || e.user.companyName || '—'}</p>
                      <p className="text-xs text-slate-500">{e.user.mobile}</p>
                    </td>
                    <td className={td}>
                      <p>{e.date}</p>
                      <p className="text-xs text-slate-500">{e.inTime} – {e.outTime}</p>
                    </td>
                    <td className={`${td} text-right`}>
                      {e.eventPost ? `${e.eventPost._count.enrollments} / ${e.suppliers}` : e.suppliers}
                    </td>
                    <td className={`${td} text-right`}>{formatCurrency(e.totalCost)}</td>
                    <td className={`${td} text-right`}>{formatCurrency(e.advancePaid)}</td>
                    <td className={td}><Badge value={e.status} label={EVENT_STATUS_LABELS[e.status]} /></td>
                    <td className={td}>{formatDate(e.createdAt)}</td>
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
