'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Avatar, Badge, Card, DetailRow, EVENT_STATUS_LABELS, StateMessage, formatCurrency, formatDate, td, th, useApi,
} from '@/lib/admin-ui';

type Payment = { id: string; amount: number; purpose: string; status: string; isTest: boolean; createdAt: string };
type OrganizerEvent = {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string | null;
  date: string;
  inTime: string;
  outTime: string;
  menCount: number;
  womenCount: number;
  totalCost: number;
  advancePaid: number;
  status: string;
  createdAt: string;
  eventPost: { id: string; status: string; isPublished: boolean; _count: { enrollments: number } } | null;
  payments: Payment[];
};
type Organizer = {
  id: string;
  name: string | null;
  mobile: string;
  email: string | null;
  emailVerified: boolean;
  companyName: string | null;
  businessName: string | null;
  businessType: string | null;
  city: string | null;
  address: string | null;
  gst: string | null;
  createdAt: string;
  events: OrganizerEvent[];
};

export default function OrganizerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, loading, error } = useApi<{ organizer: Organizer }>(`/admin/organizers/${id}`);
  const o = data?.organizer;

  if (!o) {
    return (
      <>
        <BackLink />
        <Card><StateMessage loading={loading} error={error} /></Card>
      </>
    );
  }

  const booked = o.events.reduce((sum, e) => sum + e.totalCost, 0);
  const paid = o.events.flatMap((e) => e.payments).filter((p) => p.status === 'captured').reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <BackLink />

      <div className="flex items-center gap-4 mb-6">
        <Avatar name={o.name || o.companyName} />
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{o.name || 'Unnamed organizer'}</h1>
          <p className="text-sm text-slate-500">{o.companyName || o.businessName || 'No company'} · Joined {formatDate(o.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Profile</h2>
          <dl>
            <DetailRow label="Mobile" value={o.mobile} />
            <DetailRow
              label="Email"
              value={o.email && (
                <span>
                  {o.email} {o.emailVerified && <Badge value="APPROVED" label="Verified" />}
                </span>
              )}
            />
            <DetailRow label="Company" value={o.companyName} />
            <DetailRow label="Business name" value={o.businessName} />
            <DetailRow label="Business type" value={o.businessType} />
            <DetailRow label="GST" value={o.gst} />
            <DetailRow label="City" value={o.city} />
            <DetailRow label="Address" value={o.address} />
          </dl>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Events" value={o.events.length.toString()} />
            <Stat label="Total booked" value={formatCurrency(booked)} />
            <Stat label="Paid" value={formatCurrency(paid)} />
          </div>

          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Events</h2>
            </div>
            <StateMessage empty={!o.events.length} emptyText="This organizer hasn't requested any events yet." />
            {!!o.events.length && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className={th}>Event</th>
                      <th className={th}>Date</th>
                      <th className={th}>Staff</th>
                      <th className={`${th} text-right`}>Total</th>
                      <th className={`${th} text-right`}>Advance</th>
                      <th className={th}>Status</th>
                      <th className={th}>Post</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {o.events.map((e) => (
                      <tr key={e.id} onClick={() => router.push(`/admin/events/${e.id}`)} className="cursor-pointer hover:bg-slate-50">
                        <td className={td}>
                          <p className="font-medium text-slate-900">{e.name}</p>
                          <p className="text-xs text-slate-500">{e.type} · {e.city || e.location}</p>
                        </td>
                        <td className={td}>
                          <p>{e.date}</p>
                          <p className="text-xs text-slate-500">{e.inTime} – {e.outTime}</p>
                        </td>
                        <td className={td}>{e.menCount}M / {e.womenCount}W</td>
                        <td className={`${td} text-right`}>{formatCurrency(e.totalCost)}</td>
                        <td className={`${td} text-right`}>{formatCurrency(e.advancePaid)}</td>
                        <td className={td}><Badge value={e.status} label={EVENT_STATUS_LABELS[e.status]} /></td>
                        <td className={td}>
                          {e.eventPost ? (
                            <span className="text-xs text-slate-600">
                              <Badge value={e.eventPost.status} /> {e.eventPost._count.enrollments} enrolled
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Not posted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1.5 text-lg font-semibold text-slate-900">{value}</p>
    </Card>
  );
}

function BackLink() {
  return (
    <Link href="/admin/organizers" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-4">
      ← Organizers
    </Link>
  );
}
