'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/api-client';
import {
  Avatar, Badge, Card, DetailRow, StateMessage, SUPPLIER_STATUS_LABELS, apiError, formatCurrency, formatDate, td, th, useApi,
} from '@/lib/admin-ui';

type Enrollment = {
  id: string;
  status: string;
  enrolledAt: string;
  penaltyAmount: number;
  eventPost: { payPerPerson: number; event: { name: string; date: string } };
};
type Transaction = { id: string; amount: number; type: string; reason: string; status: string; note: string | null; createdAt: string };
type Supplier = {
  id: string;
  name: string | null;
  mobile: string;
  email: string | null;
  gender: string | null;
  dob: string | null;
  city: string | null;
  address: string | null;
  createdAt: string;
  supplierProfile: {
    id: string;
    status: string;
    statusReason: string | null;
    ownerName: string | null;
    email: string | null;
    gender: string | null;
    dob: string | null;
    businessName: string | null;
    businessType: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
    latitude: number | null;
    longitude: number | null;
    transportMode: string | null;
    aadhaarFrontUrl: string | null;
    aadhaarBackUrl: string | null;
    panCardUrl: string | null;
    selfieUrl: string | null;
    kycStatus: string;
    kycRejectionReason: string | null;
    kycSubmittedAt: string | null;
    kycApprovedAt: string | null;
    walletBalance: number;
    enrollments: Enrollment[];
    transactions: Transaction[];
  } | null;
};

export default function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, reload } = useApi<{ supplier: Supplier }>(`/admin/suppliers/${id}`);
  const s = data?.supplier;

  if (!s) {
    return (
      <>
        <BackLink />
        <Card><StateMessage loading={loading} error={error} /></Card>
      </>
    );
  }

  const p = s.supplierProfile;

  return (
    <>
      <BackLink />

      <div className="flex items-center gap-4 mb-6">
        <Avatar name={p?.ownerName || s.name} />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-slate-900">{p?.ownerName || s.name || 'Unnamed supplier'}</h1>
            {p && <Badge value={p.status} label={SUPPLIER_STATUS_LABELS[p.status]} />}
          </div>
          <p className="text-sm text-slate-500">
            {p?.businessName ? `${p.businessName} · ` : ''}{s.mobile} · Joined {formatDate(s.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Basic details</h2>
            <dl>
              <DetailRow label="Owner name" value={p?.ownerName || s.name} />
              <DetailRow label="Mobile" value={s.mobile} />
              <DetailRow label="Email" value={p?.email || s.email} />
              <DetailRow label="Gender" value={p?.gender || s.gender} />
              <DetailRow label="Date of birth" value={p?.dob || s.dob} />
              <DetailRow label="Business type" value={p?.businessType} />
              <DetailRow label="Business name" value={p?.businessName} />
            </dl>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Address</h2>
            <dl>
              <DetailRow label="Address" value={p?.address || s.address} />
              <DetailRow label="City" value={p?.city || s.city} />
              <DetailRow label="State" value={p?.state} />
              <DetailRow label="Pincode" value={p?.pincode} />
              <DetailRow label="Transport" value={p?.transportMode && p.transportMode.replace(/^\w/, (c) => c.toUpperCase())} />
              <DetailRow
                label="Location"
                value={p?.latitude != null && p?.longitude != null && (
                  <a
                    href={`https://www.google.com/maps?q=${p.latitude},${p.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    View on map
                  </a>
                )}
              />
            </dl>
          </Card>

          {p && <AccountCard userId={s.id} profile={p} onChange={reload} />}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <KycCard profile={p} onChange={reload} />

          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Enrollments</h2>
            </div>
            <StateMessage empty={!p?.enrollments.length} emptyText="No event enrollments yet." />
            {!!p?.enrollments.length && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className={th}>Event</th>
                      <th className={th}>Event date</th>
                      <th className={`${th} text-right`}>Pay</th>
                      <th className={th}>Status</th>
                      <th className={th}>Enrolled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {p.enrollments.map((e) => (
                      <tr key={e.id}>
                        <td className={`${td} font-medium text-slate-900`}>{e.eventPost.event.name}</td>
                        <td className={td}>{e.eventPost.event.date}</td>
                        <td className={`${td} text-right`}>{formatCurrency(e.eventPost.payPerPerson)}</td>
                        <td className={td}><Badge value={e.status} /></td>
                        <td className={td}>{formatDate(e.enrolledAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Recent wallet transactions</h2>
            </div>
            <StateMessage empty={!p?.transactions.length} emptyText="No wallet activity yet." />
            {!!p?.transactions.length && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className={th}>Date</th>
                      <th className={th}>Type</th>
                      <th className={th}>Note</th>
                      <th className={th}>Status</th>
                      <th className={`${th} text-right`}>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {p.transactions.map((t) => (
                      <tr key={t.id}>
                        <td className={td}>{formatDate(t.createdAt)}</td>
                        <td className={td}><Badge value={t.type} label={t.reason.replace(/_/g, ' ').toLowerCase()} /></td>
                        <td className={`${td} text-slate-500`}>{t.note || '—'}</td>
                        <td className={td}><Badge value={t.status} /></td>
                        <td className={`${td} text-right font-medium ${t.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {t.type === 'CREDIT' ? '+' : '−'}{formatCurrency(t.amount)}
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

function KycCard({ profile: p, onChange }: { profile: Supplier['supplierProfile']; onChange: () => void }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submitted = !!p?.kycSubmittedAt;
  const docs = p
    ? [
        { label: 'Aadhaar (front)', url: p.aadhaarFrontUrl },
        { label: 'Aadhaar (back)', url: p.aadhaarBackUrl },
        { label: 'PAN card', url: p.panCardUrl },
        { label: 'Selfie', url: p.selfieUrl },
      ]
    : [];

  const act = async (action: 'approve' | 'reject') => {
    if (!p) return;
    setBusy(true);
    setError('');
    try {
      await apiClient.put(`/admin/kyc/${p.id}/${action}`, action === 'reject' ? { reason: reason.trim() || undefined } : {});
      setRejecting(false);
      setReason('');
      onChange();
    } catch (err) {
      setError(apiError(err, `Could not ${action} KYC.`));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-900">KYC verification</h2>
          <Badge value={submitted ? p!.kycStatus : null} label={submitted && p!.kycStatus === 'PENDING' ? 'Pending review' : undefined} />
        </div>
        {submitted && (
          <p className="text-xs text-slate-500">
            Submitted {formatDate(p!.kycSubmittedAt)}
            {p!.kycApprovedAt && ` · Approved ${formatDate(p!.kycApprovedAt)}`}
          </p>
        )}
      </div>

      {!submitted ? (
        <p className="text-sm text-slate-500">This supplier hasn&apos;t submitted KYC documents yet.</p>
      ) : (
        <>
          {p!.kycStatus === 'REJECTED' && p!.kycRejectionReason && (
            <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-sm text-rose-700">
              Rejected: {p!.kycRejectionReason}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {docs.map((d) => (
              <a
                key={d.label}
                href={d.url || undefined}
                target="_blank"
                rel="noreferrer"
                className={`group block rounded-lg border border-slate-200 overflow-hidden ${d.url ? 'hover:border-indigo-300' : 'pointer-events-none'}`}
              >
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                  {d.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={d.url} alt={d.label} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-400">Missing</span>
                  )}
                </div>
                <p className="px-2.5 py-2 text-xs font-medium text-slate-600 group-hover:text-indigo-600">{d.label}</p>
              </a>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

          {rejecting ? (
            <div className="mt-4 space-y-3">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                placeholder="Reason shown to the supplier (e.g. PAN card photo is blurry)"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
              <div className="flex gap-2">
                <button
                  disabled={busy}
                  onClick={() => act('reject')}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-60"
                >
                  Confirm rejection
                </button>
                <button onClick={() => setRejecting(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                  Cancel
                </button>
              </div>
            </div>
          ) : p!.status === 'SUSPENDED' ? (
            <p className="mt-4 text-sm text-slate-500">Reinstate this supplier before changing their KYC decision.</p>
          ) : (
            <div className="mt-4 flex gap-2">
              {p!.kycStatus !== 'APPROVED' && (
                <button
                  disabled={busy}
                  onClick={() => act('approve')}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  {busy ? 'Saving…' : 'Approve KYC'}
                </button>
              )}
              {p!.kycStatus !== 'REJECTED' && (
                <button
                  disabled={busy}
                  onClick={() => setRejecting(true)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  Reject
                </button>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
}

// Suspend an active supplier, or reinstate a suspended one (PUT /admin/suppliers/:id/status)
function AccountCard({ userId, profile: p, onChange }: {
  userId: string;
  profile: NonNullable<Supplier['supplierProfile']>;
  onChange: () => void;
}) {
  const [suspending, setSuspending] = useState(false);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const suspended = p.status === 'SUSPENDED';

  const setStatus = async (status: 'SUSPENDED' | 'APPROVED') => {
    setBusy(true);
    setError('');
    try {
      await apiClient.put(`/admin/suppliers/${userId}/status`, { status, reason: reason.trim() || undefined });
      setSuspending(false);
      setReason('');
      onChange();
    } catch (err) {
      setError(apiError(err, 'Could not update the account.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-1">Account</h2>
      <p className="text-sm text-slate-500 mb-4">
        {suspended
          ? `Suspended${p.statusReason ? `: ${p.statusReason}` : ''}. The supplier can't edit their profile or take work.`
          : 'Suspending blocks this supplier from editing their profile and taking work.'}
      </p>

      {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}

      {suspended ? (
        p.kycStatus === 'APPROVED' ? (
          <button
            disabled={busy}
            onClick={() => setStatus('APPROVED')}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Reinstate supplier'}
          </button>
        ) : (
          <p className="text-xs text-slate-400">Only suppliers with approved KYC can be reinstated.</p>
        )
      ) : suspending ? (
        <div className="space-y-3">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder="Reason shown to the supplier (optional)"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
          <div className="flex gap-2">
            <button
              disabled={busy}
              onClick={() => setStatus('SUSPENDED')}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-60"
            >
              Confirm suspension
            </button>
            <button onClick={() => setSuspending(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setSuspending(true)}
          className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          Suspend supplier
        </button>
      )}
    </Card>
  );
}

function BackLink() {
  return (
    <Link href="/admin/suppliers" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-4">
      ← Suppliers
    </Link>
  );
}
