import { maturityLevels } from '@/data/assessmentQuestions';

export function MethodologyReference() {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h4 className="mb-3 font-bold text-white">Referensi Framework</h4>
        <p className="leading-relaxed text-slate-400">
          Assessment ini menggunakan kombinasi dari
          {' '}
          <strong>CMMI (Capability Maturity Model Integration)</strong>
          {' '}
          dan
          {' '}
          <strong>TM Forum Digital Maturity Model</strong>
          {' '}
          yang telah diadaptasi untuk konteks bisnis Indonesia.
        </p>
      </div>

      <div>
        <h4 className="mb-3 font-bold text-white">5 Level Maturity</h4>
        <div className="space-y-3">
          {maturityLevels.map((level, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className={`size-3 rounded-full ${level.color}`} />
                <span className="font-bold text-white">
                  {level.level}
                  :
                  {level.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{level.description}</p>
              <div className="mt-2 text-xs text-slate-500">
                Skor:
                {' '}
                {level.minScore.toFixed(1)}
                {' '}
                -
                {' '}
                {level.maxScore.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-bold text-white">5 Dimensi Penilaian</h4>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-amber-400">●</span>
            <div>
              <strong className="text-white">Strategy & Leadership:</strong>
              {' '}
              Visi digital, dukungan manajemen, alokasi
              budget
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-red-400">●</span>
            <div>
              <strong className="text-white">Customer Experience:</strong>
              {' '}
              Customer journey, omnichannel, personalisasi
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-400">●</span>
            <div>
              <strong className="text-white">Operations & Process:</strong>
              {' '}
              Otomatisasi, agilitas, supply chain, SOP
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-purple-400">●</span>
            <div>
              <strong className="text-white">Technology & Data:</strong>
              {' '}
              Arsitektur, data maturity, keamanan, integrasi
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-400">●</span>
            <div>
              <strong className="text-white">People & Culture:</strong>
              {' '}
              Digital skills, budaya inovasi, change
              management
            </div>
          </li>
        </ul>
      </div>

      <div className="border-primary-500/20 bg-primary-900/10 rounded-xl border p-4">
        <p className="text-xs leading-relaxed text-slate-300">
          <strong>Catatan:</strong>
          {' '}
          Skor dihitung berdasarkan rata-rata dari semua jawaban Anda. Setiap pertanyaan
          memiliki bobot yang sama. Rekomendasi modul disesuaikan dengan gap terbesar di setiap dimensi.
        </p>
      </div>
    </div>
  );
}
