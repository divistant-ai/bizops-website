import { AlertTriangle, Server, Smartphone, Wifi } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { sysReqData } from '@/data/supportContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'System Requirements | Spesifikasi Teknis BizOps',
  description: 'Spesifikasi minimum server dan perangkat untuk menjalankan BizOps ERP secara optimal.',
});

export default function SystemRequirementsPage() {
  const { server, client, network } = sysReqData;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="border-b border-neutral-200 bg-white pt-32 pb-12">
        <Container>
          <h1 className="mb-6 text-4xl font-bold text-neutral-900">System Requirements</h1>
          <p className="max-w-3xl text-xl text-neutral-600">
            Panduan spesifikasi teknis untuk deployment On-Premise dan kompatibilitas perangkat pengguna.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Server Specs */}
            <div>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-neutral-900">
                <Server className="text-primary-600 h-6 w-6" />
                {' '}
                Spesifikasi Server (On-Premise)
              </h2>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                      <th className="p-4 font-bold text-neutral-900">Komponen</th>
                      <th className="p-4 font-bold text-neutral-900">Spesifikasi Minimum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {server.map((req, i) => (
                      <tr key={i} className="hover:bg-neutral-50">
                        <td className="p-4 font-medium text-neutral-700">{req.item}</td>
                        <td className="p-4 text-neutral-600">{req.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p>Untuk deployment &gt; 100 user concurrent, kami menyarankan arsitektur High Availability dengan pemisahan Database dan App Server. Hubungi tim Solution Architect kami.</p>
              </div>
            </div>

            {/* Client & Network */}
            <div className="space-y-12">
              {/* Client */}
              <div>
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-neutral-900">
                  <Smartphone className="text-primary-600 h-6 w-6" />
                  {' '}
                  Perangkat Pengguna
                </h2>
                <div className="space-y-4">
                  {client.map((req, i) => (
                    <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4">
                      <h3 className="mb-1 font-bold text-neutral-900">{req.item}</h3>
                      <p className="text-neutral-600">{req.spec}</p>
                      {req.note && (
                        <p className="mt-2 text-xs text-neutral-400 italic">
                          *
                          {req.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Network */}
              <div>
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-neutral-900">
                  <Wifi className="text-primary-600 h-6 w-6" />
                  {' '}
                  Firewall & Network
                </h2>
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                      <tr>
                        <th className="p-4 font-bold text-neutral-900">Port</th>
                        <th className="p-4 font-bold text-neutral-900">Arah</th>
                        <th className="p-4 font-bold text-neutral-900">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {network.map((req, i) => (
                        <tr key={i} className="hover:bg-neutral-50">
                          <td className="text-primary-600 p-4 font-mono font-bold">{req.port}</td>
                          <td className="p-4 text-neutral-600">{req.dir}</td>
                          <td className="p-4 text-neutral-600">{req.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
