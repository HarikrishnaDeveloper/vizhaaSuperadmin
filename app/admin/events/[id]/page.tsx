'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/api-client';
import {
  Avatar, Badge, Card, DetailRow, EVENT_STATUS_LABELS, StateMessage, apiError, formatCurrency, formatDate, td, th, useApi,
} from '@/lib/admin-ui';

type Enrollment = {
  id: string;
  status: string;
  enrolledAt: string;
  supplier: { id: string; user: { id: string; name: string | null; mobile: string; gender: string | null } };
};
type EventPost = {
  id: string;
  status: string;
  isPublished: boolean;
  menRequired: number;
  womenRequired: number;
  enrolledMen: number;
  enrolledWomen: number;
  payPerPerson: number;
  reportingTime: string;
  uniformRequirements: string;
  enrollments: Enrollment[];
};
type Payment = { id: string; amount: number; purpose: string; status: string; isTest: boolean; createdAt: string };
type EventDetail = {
  id: string;
  name: string;
  type: string;
  location: string;
  locationName: string | null;
  formattedAddress: string | null;
  city: string | null;
  date: string;
  inTime: string;
  outTime: string;
  suppliers: number;
  menCount: number;
  womenCount: number;
  dressCode: string;
  services: string[];
  costPerHead: number;
  totalCost: number;
  advancePaid: number;
  status: string;
  adminNotes: string | null;
  approvedAt: string | null;
  createdAt: string;
  managerName: string | null;
  managerPhone: string | null;
  supervisorName: string | null;
  supervisorPhone: string | null;
  [field: string]: unknown;
  user: { id: string; name: string | null; mobile: string; email: string | null; companyName: string | null; businessName: string | null };
  payments: Payment[];
  eventPost: EventPost | null;
};
type Step = { key: string; field: string; label: string };

const inputCls =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10';
const primaryBtn = 'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60';
const secondaryBtn = 'rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60';

const formatDateTime = (d: unknown) =>
  typeof d === 'string'
    ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
    : '';

// Runs an admin action, then reloads the page data
function useAction(onDone: () => void) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const run = async (key: string, fn: () => Promise<unknown>, fallback: string) => {
    setBusy(key);
    setError('');
    try {
      await fn();
      onDone();
      return true;
    } catch (err) {
      setError(apiError(err, fallback));
      return false;
    } finally {
      setBusy(null);
    }
  };
  return { busy, error, run };
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, reload } = useApi<{ event: EventDetail; steps: Step[] }>(`/admin/events/${id}`);
  const e = data?.event;

  if (!e) {
    return (
      <>
        <BackLink />
        <Card><StateMessage loading={loading} error={error} /></Card>
      </>
    );
  }

  const accepted = ['APPROVED', 'IN_PROGRESS', 'COMPLETED'].includes(e.status);
  const paid = e.payments.filter((p) => p.status === 'captured').reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <BackLink />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-xl font-semibold text-slate-900">{e.name}</h1>
        <Badge value={e.status} label={EVENT_STATUS_LABELS[e.status]} />
        <p className="w-full text-sm text-slate-500">
          {e.type} · {e.date} · Requested {formatDate(e.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Event details</h2>
            <dl>
              <DetailRow label="Date" value={e.date} />
              <DetailRow label="Timing" value={`${e.inTime} – ${e.outTime}`} />
              <DetailRow label="Venue" value={e.locationName || e.location} />
              <DetailRow label="Address" value={e.formattedAddress} />
              <DetailRow label="Suppliers" value={e.suppliers} />
              <DetailRow label="Dress code" value={e.dressCode} />
              <DetailRow label="Services" value={e.services.join(', ')} />
              <DetailRow label="Cost per head" value={formatCurrency(e.costPerHead)} />
              <DetailRow label="Total" value={formatCurrency(e.totalCost)} />
              <DetailRow label="Paid" value={formatCurrency(paid)} />
              <DetailRow label="Balance" value={formatCurrency(Math.max(0, e.totalCost - paid))} />
            </dl>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Organizer</h2>
            <Link href={`/admin/organizers/${e.user.id}`} className="flex items-center gap-3 rounded-lg -m-2 p-2 hover:bg-slate-50">
              <Avatar name={e.user.name || e.user.companyName} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{e.user.name || 'Unnamed organizer'}</p>
                <p className="truncate text-xs text-slate-500">{e.user.companyName || e.user.businessName || e.user.mobile}</p>
              </div>
            </Link>
            <dl className="mt-3">
              <DetailRow label="Mobile" value={e.user.mobile} />
              <DetailRow label="Email" value={e.user.email} />
            </dl>
          </Card>

          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Payments</h2>
            </div>
            <StateMessage empty={!e.payments.length} emptyText="No payments yet (pay later)." />
            <ul className="divide-y divide-slate-100">
              {e.payments.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{formatCurrency(p.amount)} <span className="text-xs font-normal text-slate-500">{p.purpose.toLowerCase()}</span></p>
                    <p className="text-xs text-slate-500">{formatDate(p.createdAt)}{p.isTest && ' · test'}</p>
                  </div>
                  <Badge value={p.status} />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ReviewCard event={e} onChange={reload} />
          {accepted && <TrackingCard event={e} steps={data.steps} onChange={reload} />}
          {accepted && <TeamCard key={`${e.managerName}|${e.supervisorName}`} event={e} onChange={reload} />}
          {accepted && <SupplierPostCard event={e} onChange={reload} />}
        </div>
      </div>
    </>
  );
}

// ─── Approve / reject ────────────────────────────────────────────────────────

function ReviewCard({ event: e, onChange }: { event: EventDetail; onChange: () => void }) {
  const [notes, setNotes] = useState('');
  const { busy, error, run } = useAction(onChange);
  const reviewable = e.status === 'PENDING' || e.status === 'REJECTED';

  const act = (action: 'approve' | 'reject') =>
    run(action, () => apiClient.put(`/admin/events/${e.id}/${action}`, { adminNotes: notes.trim() || undefined }), `Could not ${action} the event.`)
      .then((ok) => ok && setNotes(''));

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-sm font-semibold text-slate-900">Review</h2>
        {e.approvedAt && <p className="text-xs text-slate-500">Approved {formatDate(e.approvedAt)}</p>}
      </div>

      {e.adminNotes && (
        <div className={`mb-4 rounded-lg border px-3.5 py-2.5 text-sm ${e.status === 'REJECTED' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          {e.status === 'REJECTED' ? 'Rejected: ' : 'Note: '}{e.adminNotes}
        </div>
      )}

      {reviewable ? (
        <>
          <p className="text-sm text-slate-500 mb-3">
            {e.status === 'PENDING'
              ? 'The organizer sees this event as “Pending approval” until you approve or reject it.'
              : 'This event was rejected. You can still approve it.'}
          </p>
          <textarea
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
            rows={2}
            placeholder="Note to the organizer (shown as the reason if you reject, e.g. date unavailable)"
            className={inputCls}
          />
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
          <div className="mt-3 flex gap-2">
            <button disabled={!!busy} onClick={() => act('approve')} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60">
              {busy === 'approve' ? 'Approving…' : 'Approve event'}
            </button>
            {e.status === 'PENDING' && (
              <button disabled={!!busy} onClick={() => act('reject')} className={secondaryBtn}>
                {busy === 'reject' ? 'Rejecting…' : 'Reject'}
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          Approved. Assign the on-site team, publish the supplier post and update the live tracking below; the organizer sees each change in the app.
        </p>
      )}
    </Card>
  );
}

// ─── Live tracking (fixed steps) ─────────────────────────────────────────────

function TrackingCard({ event: e, steps, onChange }: { event: EventDetail; steps: Step[]; onChange: () => void }) {
  const { busy, error, run } = useAction(onChange);
  const lastDone = steps.reduce((acc, s, i) => (e[s.field] ? i : acc), -1);

  const setStep = (step: Step, done: boolean) =>
    run(step.key, () => apiClient.put(`/admin/events/${e.id}/progress`, { step: step.key, done }), 'Could not update tracking.');

  const rows = [{ key: 'created', label: 'Event Created', time: e.createdAt as unknown }, ...steps.map((s) => ({ key: s.key, label: s.label, time: e[s.field] }))];

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-1">Live tracking</h2>
      <p className="text-sm text-slate-500 mb-4">Shown to the organizer on the Live Tracking screen.</p>
      <ol className="space-y-1">
        {rows.map((r, i) => {
          const done = !!r.time;
          const step = i > 0 ? steps[i - 1] : null;
          const isNext = step && i - 1 === lastDone + 1;
          return (
            <li key={r.key} className="flex items-center gap-3 rounded-lg px-2 py-2">
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${done ? 'bg-emerald-500 text-white' : isNext ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
                {done ? '✓' : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${done || isNext ? 'text-slate-900' : 'text-slate-400'}`}>{r.label}</p>
                <p className="text-xs text-slate-500">{done ? formatDateTime(r.time) : isNext ? 'Up next' : 'In queue'}</p>
              </div>
              {step && !done && isNext && (
                <button disabled={!!busy} onClick={() => setStep(step, true)} className={primaryBtn}>
                  {busy === step.key ? 'Saving…' : 'Mark done'}
                </button>
              )}
              {step && done && i - 1 === lastDone && (
                <button disabled={!!busy} onClick={() => setStep(step, false)} className="text-sm font-medium text-slate-500 hover:text-rose-600 disabled:opacity-60">
                  Undo
                </button>
              )}
            </li>
          );
        })}
      </ol>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </Card>
  );
}

// ─── On-site team ────────────────────────────────────────────────────────────

function TeamCard({ event: e, onChange }: { event: EventDetail; onChange: () => void }) {
  const [form, setForm] = useState({
    managerName: e.managerName || '',
    managerPhone: e.managerPhone || '',
    supervisorName: e.supervisorName || '',
    supervisorPhone: e.supervisorPhone || '',
  });
  const { busy, error, run } = useAction(onChange);
  const field = (key: keyof typeof form, placeholder: string, type = 'text') => (
    <input
      type={type}
      value={form[key]}
      onChange={(ev) => setForm((f) => ({ ...f, [key]: ev.target.value }))}
      placeholder={placeholder}
      className={inputCls}
    />
  );

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-1">On-site team</h2>
      <p className="text-sm text-slate-500 mb-4">Manager and supervisor appear as “On-Site Support” in the organizer app.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Manager</p>
          {field('managerName', 'Name')}
          {field('managerPhone', 'Phone', 'tel')}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Supervisor</p>
          {field('supervisorName', 'Name')}
          {field('supervisorPhone', 'Phone', 'tel')}
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      <button
        disabled={!!busy}
        onClick={() => run('team', () => apiClient.put(`/admin/events/${e.id}/team`, form), 'Could not save the team.')}
        className={`${primaryBtn} mt-4`}
      >
        {busy ? 'Saving…' : 'Save team'}
      </button>
    </Card>
  );
}

// ─── Supplier post & enrollments ─────────────────────────────────────────────

function SupplierPostCard({ event: e, onChange }: { event: EventDetail; onChange: () => void }) {
  const post = e.eventPost;
  const { busy, error, run } = useAction(onChange);
  const [form, setForm] = useState({
    menRequired: String(e.menCount || e.suppliers),
    womenRequired: String(e.womenCount || 0),
    payPerPerson: '',
    reportingTime: e.inTime,
    uniformRequirements: e.dressCode,
    cancellationHours: '48',
    penaltyPercent: '50',
  });

  if (!post) {
    const set = (key: keyof typeof form) => (ev: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: ev.target.value }));
    const labelled = (label: string, key: keyof typeof form, type = 'text') => (
      <label className="block">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <input type={type} value={form[key]} onChange={set(key)} className={`${inputCls} mt-1`} />
      </label>
    );
    return (
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Supplier post</h2>
        <p className="text-sm text-slate-500 mb-4">Create a post so KYC-approved suppliers can enroll. The organizer requested {e.suppliers} suppliers.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {labelled('Men required', 'menRequired', 'number')}
          {labelled('Women required', 'womenRequired', 'number')}
          {labelled('Pay per person (₹)', 'payPerPerson', 'number')}
          {labelled('Reporting time', 'reportingTime')}
          {labelled('Uniform', 'uniformRequirements')}
          {labelled('Free cancellation (hours before)', 'cancellationHours', 'number')}
          {labelled('Late cancel / no-show penalty (%)', 'penaltyPercent', 'number')}
        </div>
        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
        <button
          disabled={!!busy || !form.payPerPerson}
          onClick={() => run('create', () => apiClient.post('/admin/posts', { eventId: e.id, ...form }), 'Could not create the post.')}
          className={`${primaryBtn} mt-4`}
        >
          {busy === 'create' ? 'Creating…' : 'Create post'}
        </button>
      </Card>
    );
  }

  const enrolled = post.enrollments.filter((x) => x.status !== 'CANCELLED').length;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-900">Supplier post</h2>
          <Badge value={post.isPublished ? post.status : 'PENDING'} label={post.isPublished ? undefined : 'Draft'} />
        </div>
        <div className="flex gap-2">
          {!post.isPublished && (
            <button disabled={!!busy} onClick={() => run('publish', () => apiClient.post(`/admin/posts/${post.id}/publish`), 'Could not publish.')} className={primaryBtn}>
              {busy === 'publish' ? 'Publishing…' : 'Publish to suppliers'}
            </button>
          )}
          {post.isPublished && ['OPEN', 'FILLED'].includes(post.status) && (
            <button
              disabled={!!busy}
              onClick={() => confirm('Cancel this post? Suppliers can no longer enroll.') && run('cancel', () => apiClient.put(`/admin/posts/${post.id}`, { status: 'CANCELLED' }), 'Could not cancel the post.')}
              className={secondaryBtn}
            >
              Cancel post
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 py-4 border-b border-slate-100 text-sm">
        <Metric label="Enrolled" value={`${enrolled} / ${post.menRequired + post.womenRequired}`} />
        <Metric label="Men / Women" value={`${post.enrolledMen}/${post.menRequired} · ${post.enrolledWomen}/${post.womenRequired}`} />
        <Metric label="Pay per person" value={formatCurrency(post.payPerPerson)} />
        <Metric label="Reporting" value={post.reportingTime} />
      </div>

      {error && <p className="px-5 pt-3 text-sm text-rose-600">{error}</p>}

      <StateMessage empty={!post.enrollments.length} emptyText={post.isPublished ? 'No suppliers have enrolled yet.' : 'Publish the post so suppliers can enroll.'} />
      {!!post.enrollments.length && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className={th}>Supplier</th>
                <th className={th}>Gender</th>
                <th className={th}>Enrolled</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {post.enrollments.map((en) => (
                <tr key={en.id}>
                  <td className={td}>
                    <Link href={`/admin/suppliers/${en.supplier.user.id}`} className="flex items-center gap-3 hover:text-indigo-600">
                      <Avatar name={en.supplier.user.name} />
                      <div>
                        <p className="font-medium text-slate-900">{en.supplier.user.name || '—'}</p>
                        <p className="text-xs text-slate-500">{en.supplier.user.mobile}</p>
                      </div>
                    </Link>
                  </td>
                  <td className={td}>{en.supplier.user.gender || '—'}</td>
                  <td className={td}>{formatDate(en.enrolledAt)}</td>
                  <td className={td}><Badge value={en.status} /></td>
                  <td className={`${td} text-right`}>
                    {en.status === 'ENROLLED' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={!!busy}
                          onClick={() => run(en.id, () => apiClient.put(`/admin/enrollments/${en.id}/attendance`, { attended: true }), 'Could not mark attendance.')}
                          className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                        >
                          Attended
                        </button>
                        <button
                          disabled={!!busy}
                          onClick={() => confirm('Mark as no-show? A penalty is deducted from the supplier’s wallet.') && run(en.id, () => apiClient.put(`/admin/enrollments/${en.id}/attendance`, { attended: false }), 'Could not mark attendance.')}
                          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                        >
                          No-show
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/admin/events" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-4">
      ← Events
    </Link>
  );
}
