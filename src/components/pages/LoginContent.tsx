'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Eye, EyeOff, Handshake, Lock, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Checkbox, Input } from '@/components/Form';
import Container from '@/components/layout/Container';
import { Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

type LoginType = 'employee' | 'admin' | 'partner';

export function LoginContent() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<LoginType>('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    router.push('/coming-soon');
  };

  const getLoginTitle = () => {
    switch (loginType) {
      case 'employee': return 'Employee Self-Service';
      case 'admin': return 'Admin Console';
      case 'partner': return 'Partner Portal';
    }
  };

  const getLoginDesc = () => {
    switch (loginType) {
      case 'employee': return 'Access payroll, attendance, and requests.';
      case 'admin': return 'Manage organization settings and users.';
      case 'partner': return 'Access sales tools and client management.';
    }
  };

  return (
    <Stack direction="horizontal" gap={4} className="min-h-screen bg-white font-sans dark:bg-slate-950">
      {/* LEFT: FORM SECTION */}
      <Stack direction="vertical" gap={4} justify="center" className="relative z-10 w-full px-8 py-12 sm:px-12 lg:w-1/2 lg:px-24">
        <Container className="w-full">

          {/* Logo Mobile Only */}
          <Link href="/" className="mb-8 flex w-fit items-center gap-2 lg:hidden">
            <Stack direction="horizontal" gap={4} align="center" justify="center" className="h-8 w-8 rounded-lg bg-slate-900">
              <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
            </Stack>
            <span className="text-xl font-bold text-slate-900 dark:text-white">BizOps</span>
          </Link>

          <div className="mb-8">
            <Typography variant="h1" as="h1">Welcome back</Typography>
            <Typography variant="body" className="text-slate-500 dark:text-slate-400">Please select your login type to continue.</Typography>
          </div>

          {/* Login Type Switcher */}
          <Stack direction="horizontal" gap={4} className="mb-8 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
            <button
              onClick={() => setLoginType('employee')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${loginType === 'employee' ? 'text-primary-600 dark:text-primary-400 bg-white shadow-sm dark:bg-slate-800' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            >
              <Users className="h-4 w-4" />
              {' '}
              Employee
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${loginType === 'admin' ? 'text-primary-600 dark:text-primary-400 bg-white shadow-sm dark:bg-slate-800' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            >
              <Briefcase className="h-4 w-4" />
              {' '}
              Admin
            </button>
            <button
              onClick={() => setLoginType('partner')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${loginType === 'partner' ? 'text-primary-600 dark:text-primary-400 bg-white shadow-sm dark:bg-slate-800' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            >
              <Handshake className="h-4 w-4" />
              {' '}
              Partner
            </button>
          </Stack>

          <motion.div
            key={loginType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Stack direction="horizontal" gap={3} align="center" className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30 mb-6 rounded-xl border p-4">
              <div className="text-primary-600 rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800">
                {loginType === 'employee' && <Users className="h-5 w-5" />}
                {loginType === 'admin' && <Briefcase className="h-5 w-5" />}
                {loginType === 'partner' && <Handshake className="h-5 w-5" />}
              </div>
              <div>
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">{getLoginTitle()}</Typography>
                <Typography variant="body" className="text-slate-500 dark:text-slate-400">{getLoginDesc()}</Typography>
              </div>
            </Stack>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Extra field for Employee: Company Code */}
              {loginType === 'employee' && (
                <Input
                  label="Company Code"
                  placeholder="Ex: BIZOPS-ID"
                  value={companyCode}
                  onChange={e => setCompanyCode(e.target.value)}
                  className="uppercase"
                />
              )}

              <Input
                label={loginType === 'employee' ? 'Employee ID / Email' : 'Work Email'}
                type={loginType === 'employee' ? 'text' : 'email'}
                placeholder={loginType === 'employee' ? 'EMP-001' : 'name@company.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[34px] right-3 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none dark:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <Stack direction="horizontal" gap={4} align="center" justify="between">
                <Checkbox label="Remember me" name="remember" />
                <Link href="/coming-soon" className="text-primary-600 hover:text-primary-700 text-sm font-semibold hover:underline">
                  Forgot password?
                </Link>
              </Stack>

              <Button fullWidth size="md" type="submit" isLoading={isLoading} className="shadow-primary-500/20 text-base shadow-lg">
                {isLoading ? 'Signing in...' : `Sign in as ${loginType === 'admin' ? 'Administrator' : loginType === 'employee' ? 'Employee' : 'Partner'}`}
              </Button>
            </form>
          </motion.div>

          {loginType === 'partner'
            ? (
                <Typography variant="small" className="block text-center text-slate-500 dark:text-slate-400">
                  Want to become a partner?
                  {' '}
                  <Link href="/partners/apply" className="text-primary-600 hover:text-primary-700 font-bold hover:underline">Apply Now</Link>
                </Typography>
              )
            : (
                <Typography variant="small" className="block text-center text-slate-500 dark:text-slate-400">
                  Don't have an account?
                  {' '}
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-bold hover:underline">Contact Sales</Link>
                </Typography>
              )}

          <Stack direction="horizontal" gap={4} align="center" justify="center" className="mt-12 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              {' '}
              SOC2 Compliant
            </span>
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              {' '}
              256-bit SSL
            </span>
          </Stack>

        </Container>
      </Stack>

      {/* RIGHT: VISUAL SECTION (Desktop Only) */}
      <Stack direction="horizontal" gap={4} align="center" justify="center" className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:flex">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* Animated Background Shapes */}
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] animate-pulse rounded-full bg-indigo-600/30 blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]"></div>

        <div className="relative z-10 max-w-lg px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={loginType}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              {loginType === 'employee' && (
                <div className="rotate-[-2deg] transform rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-left shadow-2xl backdrop-blur-md">
                  <div className="mb-4 flex items-center gap-4 border-b border-slate-700 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">JD</div>
                    <div>
                      <div className="font-bold text-white">John Doe</div>
                      <div className="text-xs text-slate-400">Senior Engineer</div>
                    </div>
                    <div className="ml-auto text-xs text-green-400">● Active</div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-3/4 rounded-full bg-slate-700"></div>
                    <div className="h-2 w-1/2 rounded-full bg-slate-700"></div>
                    <div className="mt-4 flex gap-2">
                      <span className="rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-300">Payroll Ready</span>
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300">Payslip Generated</span>
                    </div>
                  </div>
                </div>
              )}
              {loginType === 'admin' && (
                <img
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop"
                  alt="Admin Dashboard"
                  className="rotate-2 transform rounded-2xl border border-slate-700/50 shadow-2xl transition-transform duration-700 hover:rotate-0"
                />
              )}
              {loginType === 'partner' && (
                <div className="rounded-2xl border border-indigo-700/50 bg-gradient-to-br from-indigo-900 to-purple-900 p-8 text-white shadow-2xl">
                  <Typography variant="h3" as="h3">Partner Growth</Typography>
                  <div className="mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-4xl leading-tight font-extrabold text-transparent">
                    +125%
                    {' '}
                    <span className="text-sm font-normal text-slate-300">YoY</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-2 text-sm text-indigo-200">
                      <span>Active Clients</span>
                      <span className="font-bold text-white">14</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-indigo-950">
                      <div className="h-2 w-[70%] rounded-full bg-indigo-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.blockquote
            key={`quote-${loginType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-xl leading-relaxed font-medium text-white"
          >
            {loginType === 'employee'
              ? '"Checking my payslip and requesting leave has never been this easy. The mobile app is a lifesaver."'
              : loginType === 'admin'
                ? '"BizOps has completely transformed how we manage our multi-company finance. The consolidation feature alone saved us 40 hours a month."'
                : '"The partner portal gives us full visibility into our client\'s performance and our revenue share. Transparent and efficient."'}
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Budi Santoso</div>
              <div className="text-xs text-slate-400">
                {loginType === 'employee' ? 'Staff, PT Maju Jaya' : loginType === 'admin' ? 'CFO, Nusantara Group' : 'CEO, Solusi Tekno'}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-8 text-xs text-slate-500">
          © 2024 BizOps Indonesia. All rights reserved.
        </div>
      </Stack>
    </Stack>
  );
}
