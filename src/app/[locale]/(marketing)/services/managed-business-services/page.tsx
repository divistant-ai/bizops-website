import Link from 'next/link';
import { Building, Users, ShieldCheck, DollarSign, Laptop, CheckCircle, Handshake } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { Section } from '@/components/layout';
import { CardSlider } from '@/components/ui';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Enterprise Managed Services | Virtual Head Office',
  description: 'Layanan pengelolaan operasional bisnis end-to-end. Finance, HR, Legal, dan IT dikelola oleh jaringan ahli terbaik, terintegrasi dengan platform BizOps.',
  url: '/services/managed-business-services',
});

export default function ManagedServicesPage() {
  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden bg-white dark:bg-slate-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] animate-pulse"></div>

        <Container size="7xl" className="relative z-10">
          <Stack direction="vertical" gap={12} className="items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-8">
                <Building className="w-4 h-4 text-primary-500" />
                <Typography variant="small" className="text-slate-600 dark:text-slate-400">New Offering</Typography>
              </div>
              
              <Typography variant="h1" as="h1" className="font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                Your Virtual <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Head Office.</span>
              </Typography>
              
              <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Fokus pada inti bisnis Anda. Biarkan jaringan ahli kami menangani operasional pendukung—Finance, HR, Legal, hingga IT—dengan standar kelas dunia.
              </Typography>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="px-8 rounded-2xl shadow-lg shadow-primary-500/20">
                  Konsultasi Gratis
                </Button>
                <Link href="/partners">
                  <Button variant="outline" size="lg" className="px-8 rounded-2xl">
                    Lihat Partner Kami
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Stack>
        </Container>
      </Section>

      {/* PROBLEM & SOLUTION */}
      <Section className="bg-slate-50 dark:bg-slate-950 py-20">
        <Container size="4xl" className="text-center mb-16">
          <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white mb-4">
            Business Operations is Distracting.
          </Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            CEO seharusnya fokus pada Strategi, Inovasi, dan Pertumbuhan. Bukan terjebak mengurus laporan pajak bulanan, rekrutmen staff admin, atau maintenance server.
          </Typography>
        </Container>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <CardSlider mobileItemWidth="w-[85vw] sm:w-[350px]">
            {[
              { title: "Finance & Tax", desc: "Virtual CFO, Bookkeeping, Tax Planning & Reporting.", icon: DollarSign, color: "text-green-500" },
              { title: "HR & Payroll", desc: "Talent Acquisition, Payroll Processing, Compliance.", icon: Users, color: "text-blue-500" },
              { title: "Legal & Corporate", desc: "Legal Drafting, Licensing, Corporate Secretary.", icon: ShieldCheck, color: "text-purple-500" },
              { title: "IT & Security", desc: "Managed DevOps, Security Monitoring, Tech Support.", icon: Laptop, color: "text-orange-500" },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="h-full">
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 ${service.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white mb-3">{service.title}</Typography>
                    <Typography variant="body" className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</Typography>
                  </div>
                </div>
              );
            })}
          </CardSlider>
        </div>

        {/* Desktop Grid */}
        <Container size="7xl" className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Finance & Tax", desc: "Virtual CFO, Bookkeeping, Tax Planning & Reporting.", icon: DollarSign, color: "text-green-500" },
            { title: "HR & Payroll", desc: "Talent Acquisition, Payroll Processing, Compliance.", icon: Users, color: "text-blue-500" },
            { title: "Legal & Corporate", desc: "Legal Drafting, Licensing, Corporate Secretary.", icon: ShieldCheck, color: "text-purple-500" },
            { title: "IT & Security", desc: "Managed DevOps, Security Monitoring, Tech Support.", icon: Laptop, color: "text-orange-500" },
          ].map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 ${service.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white mb-3">{service.title}</Typography>
                <Typography variant="body" className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</Typography>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* PARTNER ECOSYSTEM */}
      <Section className="py-24 bg-white dark:bg-slate-900">
        <Container size="7xl">
          <Grid cols={2} gap={12} className="items-center">
            <div>
              <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white mb-6">
                Powered by <br/>
                <span className="text-primary-600">Vetted Expert Network</span>
              </Typography>
              <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-10">
                Kami tidak bekerja sendirian. BizOps bermitra dengan firma konsultan top-tier yang telah melalui proses kurasi ketat. Anda mendapatkan kualitas Big 4 dengan fleksibilitas startup.
              </Typography>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Konsultan Pajak Bersertifikat (Brevet A/B/C)",
                  "HR Consultant & Headhunter Senior",
                  "Advokat & Notaris Terpercaya",
                  "Certified Ethical Hackers & DevOps"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="md" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl px-8 h-12">
                Pelajari Standar Kualitas Kami
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 rounded-[2rem] transform rotate-3"></div>
              <div className="relative bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-700">
                <Grid cols={2} gap={6}>
                  {[
                    { name: "Global Tax Firm", type: "Tax Partner" },
                    { name: "Elite Talents", type: "HR Partner" },
                    { name: "CyberGuard", type: "Security Partner" },
                    { name: "Legal Corp", type: "Legal Partner" },
                  ].map((partner, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm text-center border border-slate-100 dark:border-slate-800">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400">
                        <Handshake className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{partner.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{partner.type}</div>
                    </div>
                  ))}
                </Grid>
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
                  <Typography variant="small" className="text-slate-500 dark:text-slate-400">Ingin bergabung sebagai partner ahli?</Typography>
                  <Link href="/partners" className="text-primary-600 font-bold hover:underline block mt-2">
                    Daftar Partner Network →
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-24 bg-slate-50 dark:bg-slate-950">
        <Container size="7xl" className="text-center">
          <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white mb-6">
            Siap Meng-upgrade Operasional Anda?
          </Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-8">
            Jadwalkan sesi konsultasi gratis untuk memetakan kebutuhan operasional bisnis Anda.
          </Typography>
          <Stack direction="vertical" gap={4} className="justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto px-10 text-lg rounded-2xl shadow-xl shadow-primary-500/20">
                Hubungi Kami
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 text-lg rounded-2xl bg-white dark:bg-slate-900">
                Lihat Estimasi Biaya
              </Button>
            </Link>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}

