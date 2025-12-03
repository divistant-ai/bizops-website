'use client';

import type { ServiceAddon } from '../data/pricingData';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AppWindow,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  CreditCard,
  Factory,
  FileCheck,
  FileText,
  Globe,
  Globe2,
  GraduationCap,
  HardDrive,
  HardHat,
  Headphones,
  HelpCircle,
  Info,
  LayoutGrid,
  MapPin,
  Minus,
  MoreHorizontal,
  Package,
  PieChart,
  Plug,
  Plus,
  Printer,
  Rocket,
  Server,
  Settings,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  User,
  UserCheck,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addOns, pricingPlans } from '../data/pricingData';
import Button from './ui/Button';

type Step = 'assessment' | 'recommendation' | 'customize' | 'checkout' | 'thankyou';

type AssessmentData = {
  userCount: number;
  industry: string;
  companySize: string;
  branchCount: number;
  hasMultiCompany: boolean;
  deployment: string;
  serverLocation: string;
  hasLegacySystem: boolean;
  dataVolume: 'low' | 'medium' | 'high';
  // Core Modules
  needsCRM: boolean;
  needsAccounting: boolean;
  needsInventory: boolean;
  needsProcurement: boolean;
  needsHRM: boolean;
  // Specialized Modules
  needsManufacturing: boolean;
  needsProjectMgmt: boolean;
  needsAssetMgmt: boolean;
  needsHelpdesk: boolean;
  needsPOS: boolean;
  needsEcommerce: boolean;
  // Advanced Modules
  needsQualityControl: boolean;
  needsFleet: boolean;
  needsDMS: boolean;
  needsBI: boolean;

  apiIntegrations: number;
  customReports: number;
  needsCustomModule: boolean;
  supportLevel: string;
  goLiveTimeline: string;
  trainingPreference: 'online' | 'hybrid' | 'onsite';
};

// --- Internal Components ---

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative z-50 ml-1 inline-flex items-center">
    <HelpCircle className="hover:text-primary-400 h-3 w-3 cursor-help text-slate-500" />
    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-800 p-2 text-[10px] text-slate-200 shadow-xl group-hover:block">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
);

const SelectableCard = ({ selected, onClick, title, description, icon: Icon, badge, tooltip }: any) => (
  <motion.div
    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.08)' }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`group relative flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all duration-200
      ${selected ? 'border-primary-500 bg-primary-500/10 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
  >
    {selected && <div className="text-primary-500 absolute top-2 right-2"><CheckCircle2 className="h-4 w-4" /></div>}
    {badge && <div className="absolute top-2 left-2 rounded border border-amber-500/20 bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-amber-400 uppercase">{badge}</div>}
    {tooltip && <div className="absolute top-2 right-2"><Tooltip text={tooltip} /></div>}
    {Icon && <Icon className={`h-6 w-6 transition-colors ${selected ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'}`} />}
    <div>
      <h4 className={`mb-0.5 text-sm font-bold ${selected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{title}</h4>
      {description && <p className="mx-auto max-w-[120px] text-[10px] leading-tight text-slate-500 group-hover:text-slate-400">{description}</p>}
    </div>
  </motion.div>
);

type AddonItemProps = {
  addon: ServiceAddon;
  quantity: number;
  onToggle: (addonId: string, isSelected: boolean) => void;
  onQuantityChange: (addonId: string, delta: number) => void;
  formatIDR: (amount: number) => string;
  isExclusive?: boolean;
};

const AddonItem: React.FC<AddonItemProps> = ({ addon, quantity, onToggle, onQuantityChange, formatIDR, isExclusive }) => {
  const isSelected = quantity > 0;
  const isConfigurable = !isExclusive && (addon.unit.includes('per') || addon.unit.includes('sistem') || addon.unit.includes('sesi'));

  return (
    <div
      onClick={() => !isConfigurable && onToggle(addon.id, isSelected)}
      className={`group flex items-center justify-between rounded-xl border p-4 transition-all
        ${isSelected ? 'bg-primary-900/10 border-primary-500/40 shadow-md' : 'border-white/10 bg-white/5 hover:border-white/10 hover:bg-white/10'}
        ${!isConfigurable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex flex-grow items-center gap-4">
        <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-600 bg-transparent'}`}>
          {isSelected && <Check className="h-3.5 w-3.5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-bold ${isSelected ? 'text-primary-300' : 'text-white'}`}>{addon.name}</h4>
            {addon.tooltip && <Tooltip text={addon.tooltip} />}
          </div>
          <p className="max-w-md text-[10px] text-slate-400">{addon.description}</p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-6">
        <div className="text-right">
          <span className={`block text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{formatIDR(addon.price)}</span>
          <span className="text-[9px] text-slate-500">{addon.unit}</span>
        </div>

        {isConfigurable
          ? (
              <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-0.5" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => onQuantityChange(addon.id, -1)}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  disabled={quantity === 0}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className={`w-8 text-center text-xs font-bold ${quantity > 0 ? 'text-white' : 'text-slate-500'}`}>{quantity}</span>
                <button
                  onClick={() => onQuantityChange(addon.id, 1)}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          : (
              <div className="w-8"></div>
            )}
      </div>
    </div>
  );
};

// --- Main Component ---

const PricingCalculator: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<Step>('assessment');
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [assessment, setAssessment] = useState<AssessmentData>({
    userCount: 20,
    industry: '',
    companySize: '',
    branchCount: 1,
    hasMultiCompany: false,
    deployment: '',
    serverLocation: 'jakarta',
    hasLegacySystem: false,
    dataVolume: 'low',
    // Modules
    needsCRM: true,
    needsAccounting: true,
    needsInventory: true,
    needsProcurement: false,
    needsHRM: true,
    needsManufacturing: false,
    needsProjectMgmt: false,
    needsAssetMgmt: false,
    needsHelpdesk: false,
    needsPOS: false,
    needsEcommerce: false,
    needsQualityControl: false,
    needsFleet: false,
    needsDMS: false,
    needsBI: false,

    apiIntegrations: 0,
    customReports: 0,
    needsCustomModule: false,
    supportLevel: 'standard',
    goLiveTimeline: '3months',
    trainingPreference: 'online',
  });

  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedAddOns, setSelectedAddOns] = useState<{ [key: string]: number }>({});

  const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '', email: '', company: '', phone: '', role: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [quotationId, setQuotationId] = useState('');

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [_discountError, setDiscountError] = useState('');

  // --- LOGIC ---
  const changeStep = (direction: 'next' | 'prev' | 'jump', target?: any) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (direction === 'next') {
        setAssessmentStep(prev => prev + 1);
      } else if (direction === 'prev') {
        setAssessmentStep(prev => prev - 1);
      } else if (direction === 'jump' && target) {
        if (typeof target === 'number') {
          setAssessmentStep(target);
        } else {
          setCurrentStep(target);
        }
      }
      setIsTransitioning(false);
    }, 200);
  };

  const complexityScore = useMemo(() => {
    let score = 0;
    score += assessment.userCount * 0.5;
    score += assessment.branchCount * 5;
    if (assessment.hasMultiCompany) {
      score += 30;
    }

    if (assessment.needsManufacturing) {
      score += 20;
    }
    if (assessment.needsEcommerce) {
      score += 15;
    }
    if (assessment.needsAccounting) {
      score += 5;
    }
    if (assessment.needsHRM) {
      score += 5;
    }
    if (assessment.needsPOS) {
      score += 10;
    }
    if (assessment.needsBI) {
      score += 15;
    }

    if (assessment.hasLegacySystem) {
      score += 15;
    }
    if (assessment.dataVolume === 'high') {
      score += 10;
    }

    if (assessment.apiIntegrations > 0) {
      score += (assessment.apiIntegrations * 5);
    }
    if (assessment.deployment === 'onprem') {
      score += 25;
    }
    return score;
  }, [assessment]);

  const recommendedPlanId = useMemo(() => {
    let score = 0;
    if (assessment.userCount > 300) {
      score += 40;
    } else if (assessment.userCount > 50) {
      score += 15;
    }
    if (assessment.hasMultiCompany) {
      score += 40;
    }
    if (assessment.branchCount > 5) {
      score += 20;
    }

    if (assessment.industry === 'manufacturing') {
      score += 25;
    }
    if (assessment.industry === 'healthcare') {
      score += 15;
    }

    if (assessment.deployment === 'onprem') {
      score += 50;
    } else if (assessment.deployment === 'dedicated') {
      score += 25;
    }
    if (complexityScore > 80) {
      score += 30;
    } else if (complexityScore > 40) {
      score += 15;
    }
    if (assessment.needsCustomModule) {
      score += 35;
    }

    if (score >= 60) {
      return 'enterprise';
    }
    if (score >= 25) {
      return 'growth';
    }
    return 'business';
  }, [assessment, complexityScore]);

  useEffect(() => {
    if (currentStep === 'customize' && Object.keys(selectedAddOns).length === 0) {
      const recommended: { [key: string]: number } = {};
      if (assessment.goLiveTimeline === 'urgent') {
        recommended['impl-express'] = 1;
      } else if (complexityScore > 60 || assessment.hasMultiCompany) {
        recommended['impl-pro'] = 1;
      } else {
        recommended['impl-standard'] = 1;
      }

      if (assessment.userCount > 100 || assessment.dataVolume === 'high') {
        recommended['dedicated-ip'] = 1;
        recommended['extra-storage'] = Math.ceil(assessment.userCount / 50);
      }
      if (assessment.hasLegacySystem) {
        recommended['data-migration'] = 1;
      }
      if (assessment.apiIntegrations > 0) {
        recommended['api-integration'] = assessment.apiIntegrations;
      }
      if (assessment.customReports > 0) {
        recommended['custom-report'] = assessment.customReports;
      }

      // Training logic
      if (assessment.trainingPreference === 'onsite') {
        recommended['onsite-visit'] = 3;
      } else if (assessment.trainingPreference === 'hybrid') {
        recommended['onsite-visit'] = 1;
      }

      if (assessment.trainingPreference === 'onsite' || assessment.userCount > 50) {
        recommended['training-extra'] = Math.ceil(assessment.userCount / 20);
      }

      setSelectedAddOns(recommended);
    }
  }, [currentStep, assessment, complexityScore]);

  useEffect(() => {
    if (currentStep === 'recommendation' && !selectedPlanId) {
      setSelectedPlanId(recommendedPlanId);
    }
  }, [currentStep, recommendedPlanId, selectedPlanId]);

  const selectedPlanData = pricingPlans.find(p => p.id === selectedPlanId);

  const calculations = useMemo(() => {
    if (!selectedPlanData) {
      return { basePrice: 0, monthlyRecurring: 0, oneTimeFees: 0, subtotal: 0, discountAmount: 0, totalFirstPayment: 0 };
    }
    const basePrice = billingCycle === 'yearly' ? selectedPlanData.priceYearly : selectedPlanData.priceMonthly;
    const recurringAddOnsTotal = Object.entries(selectedAddOns).reduce((sum, [addOnId, quantity]) => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (!addOn || addOn.unit.includes('one-time') || addOn.unit.includes('per')) {
        return sum;
      }
      return sum + (addOn.price * quantity);
    }, 0);
    const oneTimeFees = Object.entries(selectedAddOns).reduce((sum, [addOnId, quantity]) => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn && (addOn.unit.includes('one-time') || addOn.unit.includes('per'))) {
        return sum + (addOn.price * quantity);
      }
      return sum;
    }, 0);
    const monthlyRecurring = basePrice + recurringAddOnsTotal;
    const subtotal = billingCycle === 'yearly' ? (monthlyRecurring * 12) + oneTimeFees : monthlyRecurring + oneTimeFees;
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent / 100) : 0;
    const totalFirstPayment = subtotal - discountAmount;
    return { basePrice, monthlyRecurring, oneTimeFees, subtotal, discountAmount, totalFirstPayment };
  }, [selectedPlanId, billingCycle, selectedAddOns, selectedPlanData, appliedDiscount]);

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'BIZOPS10') {
      setAppliedDiscount({ code: 'BIZOPS10', percent: 10 }); setDiscountError('');
    } else if (discountCode.toUpperCase() === 'PARTNER20') {
      setAppliedDiscount({ code: 'PARTNER20', percent: 20 }); setDiscountError('');
    } else {
      setDiscountError('Invalid code'); setAppliedDiscount(null);
    }
  };

  const validateCheckout = () => {
    const errors: { [key: string]: string } = {};
    if (!contactInfo.firstName) {
      errors.firstName = 'Required';
    }
    if (!contactInfo.email) {
      errors.email = 'Required';
    }
    if (!contactInfo.company) {
      errors.company = 'Required';
    }
    if (!contactInfo.phone) {
      errors.phone = 'Required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestQuotation = () => {
    if (validateCheckout()) {
      setQuotationId(`QT-${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`);
      changeStep('jump', 'thankyou');
    }
  };

  const handlePrint = () => window.print();
  const formatIDR = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  const handleAddOnChange = (addOnId: string, quantity: number) => {
    setSelectedAddOns((prev) => {
      if (quantity === 0) {
        const newAddOns = { ...prev }; delete newAddOns[addOnId]; return newAddOns;
      }
      return { ...prev, [addOnId]: quantity };
    });
  };

  // Helper for addon selection logic (Mutually Exclusive Toggles)
  const handleToggleAddon = (addonId: string, isSelected: boolean) => {
    if (addonId.includes('impl')) {
      const newAddOns = { ...selectedAddOns };
      Object.keys(newAddOns).forEach((k) => {
        if (k.includes('impl')) {
          delete newAddOns[k];
        }
      });
      if (!isSelected) {
        newAddOns[addonId] = 1;
      }
      setSelectedAddOns(newAddOns);
    } else {
      handleAddOnChange(addonId, isSelected ? 0 : 1);
    }
  };

  const handleQuantityChange = (addonId: string, delta: number) => {
    setSelectedAddOns((prev) => {
      const current = prev[addonId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addonId]: next };
    });
  };

  const updateAssessment = (field: keyof AssessmentData, value: any) => setAssessment(prev => ({ ...prev, [field]: value }));

  const StepIndicator = () => (
    <div className="mx-auto mb-4 w-full max-w-2xl px-4">
      <div className="relative z-10 flex items-center justify-between">
        {['Profile', 'Tech', 'Modules', 'Integ', 'Time', 'Review'].map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = assessmentStep === stepNum;
          const isPast = assessmentStep > stepNum;
          return (
            <div key={label} className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-70'}`}>
              <div className={`mb-1 flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-bold
                 ${isActive
              ? 'bg-primary-600 border-primary-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]'
              : isPast
                ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                : 'border-slate-700 bg-slate-800 text-slate-500'}`}
              >
                {isPast ? <Check className="h-3 w-3" /> : stepNum}
              </div>
              <span className="hidden text-[9px] font-bold tracking-wider uppercase sm:block">{label}</span>
            </div>
          );
        })}
      </div>
      <div className="absolute top-[0.6rem] right-0 left-0 -z-0 mx-auto hidden h-[1px] w-full max-w-2xl bg-white/5 sm:block" />
      <motion.div
        className="bg-primary-500 absolute top-[0.6rem] right-0 left-0 -z-0 mx-auto hidden h-[1px] shadow-[0_0_8px_rgba(37,99,235,0.8)] sm:block"
        initial={{ width: '0%' }}
        animate={{ width: `${((assessmentStep - 1) / 5) * 100}%` }}
        style={{ maxWidth: '42rem' }}
      />
    </div>
  );

  const SummaryPanel = () => (
    <div className="flex h-full flex-col border-l border-white/5 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
        <Sparkles className="h-3 w-3 text-amber-400" />
        {' '}
        Live Summary
      </h3>
      <div className="space-y-5">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>Estimated Users</span>
            <Tooltip text="Jumlah pengguna yang memiliki akses login ke sistem." />
          </div>
          <div className="text-xl font-bold text-white">
            {assessment.userCount}
            {' '}
            <span className="text-sm font-normal text-slate-500">accounts</span>
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs text-slate-500">Industry</div>
          <div className="flex items-center gap-2 text-sm font-medium text-white capitalize">
            {assessment.industry ? assessment.industry : <span className="text-slate-600 italic">Not selected</span>}
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs text-slate-500">Modules</div>
          <div className="flex flex-wrap gap-1">
            {Object.keys(assessment).filter(k => k.startsWith('needs') && assessment[k as keyof AssessmentData] === true).length > 0
              ? (
                  <span className="text-sm font-medium text-white">
                    {Object.keys(assessment).filter(k => k.startsWith('needs') && assessment[k as keyof AssessmentData] === true).length}
                    {' '}
                    Selected
                  </span>
                )
              : <span className="text-xs text-slate-600 italic">None</span>}
          </div>
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="from-primary-900/20 border-primary-500/20 mb-4 rounded-xl border bg-gradient-to-br to-blue-900/20 p-4">
          <div className="text-primary-300 mb-1 text-xs font-bold uppercase">Current Status</div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${assessmentStep === 6 ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
            <span className="text-sm font-medium text-white">{assessmentStep === 6 ? 'Ready to Calculate' : 'Gathering Requirements...'}</span>
          </div>
        </div>

        {/* Desktop Navigation Actions */}
        <div className="hidden gap-3 lg:grid">
          {assessmentStep < 6
            ? (
                <Button variant="primary" onClick={() => changeStep('next')} className="shadow-primary-500/20 h-12 w-full rounded-xl bg-white text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-200">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )
            : (
                <Button variant="primary" onClick={() => changeStep('jump', 'recommendation')} className="h-12 w-full rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400">
                  Calculate Price
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
              )}
          <Button variant="ghost" onClick={() => changeStep('prev')} disabled={assessmentStep === 1 || isTransitioning} className="h-10 w-full text-xs font-medium text-slate-400 hover:text-white">Back to Previous</Button>
        </div>
      </div>
    </div>
  );

  // --- RENDER STEPS ---

  const renderAssessment = () => (
    <div className="flex h-full flex-col overflow-hidden pb-20 lg:pb-0">
      <div className="flex-shrink-0 pt-4 pb-2">
        <StepIndicator />
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Left Panel: Interaction */}
        <motion.div
          key={assessmentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1 overflow-y-auto p-6"
        >
          {/* ... Content skipped for brevity since it's same logic ... */}
          {/* Re-implementing Step 1-6 fully below to ensure no missing parts */}
          <div className="mx-auto max-w-3xl">
            {assessmentStep === 1 && (
              <div className="space-y-6">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Company Profile</h2>
                  <p className="text-sm text-slate-400">Tentukan skala bisnis Anda untuk estimasi kapasitas server.</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-base font-bold text-white">
                      <Users className="text-primary-400 h-4 w-4" />
                      {' '}
                      User Capacity
                      <Tooltip text="Jumlah total karyawan yang akan memiliki akses login ke sistem ERP." />
                    </label>
                    <span className="text-primary-400 text-2xl font-black">{assessment.userCount}</span>
                  </div>
                  <input type="range" min="5" max="500" step="5" value={assessment.userCount} onChange={e => updateAssessment('userCount', Number.parseInt(e.target.value))} className="accent-primary-500 hover:accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 transition-all" />
                  <div className="mt-2 flex justify-between text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                    <span>Small Team (5-20)</span>
                    <span>Growing (50-100)</span>
                    <span>Enterprise (200+)</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-base font-bold text-white">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      {' '}
                      Branch / Warehouse
                      <Tooltip text="Jumlah lokasi fisik (kantor cabang, gudang, pabrik) yang akan terhubung." />
                    </label>
                    <span className="text-2xl font-black text-amber-400">{assessment.branchCount}</span>
                  </div>
                  <input type="range" min="1" max="50" step="1" value={assessment.branchCount} onChange={e => updateAssessment('branchCount', Number.parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-amber-500 transition-all hover:accent-amber-400" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'startup', title: 'Small Business', desc: 'Fokus pada efisiensi & growth.', icon: Rocket },
                    { id: 'sme', title: 'Medium (SME)', desc: 'Butuh kontrol operasional ketat.', icon: Building2 },
                    { id: 'enterprise', title: 'Large Enterprise', desc: 'Keamanan & kustomisasi tinggi.', icon: Globe },
                  ].map(opt => <SelectableCard key={opt.id} selected={assessment.companySize === opt.id} onClick={() => updateAssessment('companySize', opt.id)} {...opt} />)}
                </div>
                <div>
                  <label className="mb-3 block flex items-center gap-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                    Industry Sector
                    <Tooltip text="Kami akan merekomendasikan modul spesifik berdasarkan industri Anda." />
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { id: 'retail', name: 'Retail', icon: Store },
                      { id: 'manufacturing', name: 'Factory', icon: Factory },
                      { id: 'services', name: 'Service', icon: UserCheck },
                      { id: 'construction', name: 'Construction', icon: HardHat },
                      { id: 'education', name: 'Education', icon: GraduationCap },
                      { id: 'healthcare', name: 'Healthcare', icon: Stethoscope },
                      { id: 'fnb', name: 'Food & Beverage', icon: Info },
                      { id: 'other', name: 'Other', icon: MoreHorizontal },
                    ].map(ind => (
                      <div
                        key={ind.id}
                        onClick={() => updateAssessment('industry', ind.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault(); updateAssessment('industry', ind.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={assessment.industry === ind.id}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-2.5 transition-all ${assessment.industry === ind.id ? 'bg-primary-500/20 border-primary-500' : 'border-transparent bg-white/5 hover:bg-white/5'}`}
                      >
                        <ind.icon className={`h-4 w-4 ${assessment.industry === ind.id ? 'text-primary-400' : 'text-slate-500'}`} />
                        <span className={`text-xs font-medium ${assessment.industry === ind.id ? 'text-white' : 'text-slate-400'} text-center leading-tight`}>{ind.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {assessmentStep === 2 && (
              <div className="space-y-6">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Infrastructure</h2>
                  <p className="text-sm text-slate-400">Pilih opsi hosting yang sesuai dengan kebijakan IT Anda.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'cloud', title: 'Shared Cloud', desc: 'Hemat Biaya, Fully Managed.', icon: Cloud, tooltip: 'Resource server dibagi dengan tenant lain. Paling ekonomis.' },
                    { id: 'dedicated', title: 'Private VPS', desc: 'High Performance & Security.', icon: Server, tooltip: 'Resource server khusus untuk Anda. Performa stabil & isolasi data.' },
                    { id: 'onprem', title: 'On-Premise', desc: 'Self Hosted di kantor Anda.', icon: HardDrive, tooltip: 'Install di server fisik milik Anda. Kontrol penuh, butuh tim IT internal.' },
                  ].map(opt => <SelectableCard key={opt.id} selected={assessment.deployment === opt.id} onClick={() => updateAssessment('deployment', opt.id)} {...opt} />)}
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                    Server Region
                    <Tooltip text="Lokasi penyimpanan data fisik." />
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { id: 'jakarta', label: 'Jakarta (ID)', sub: 'Sesuai Regulasi UU PDP' },
                      { id: 'singapore', label: 'Singapore (SG)', sub: 'Tier 3 Data Center' },
                      { id: 'usa', label: 'Global (US)', sub: 'Hemat Biaya' },
                    ].map(loc => (
                      <button key={loc.id} onClick={() => updateAssessment('serverLocation', loc.id)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border py-3 text-xs font-bold transition-all ${assessment.serverLocation === loc.id ? 'border-white bg-white text-slate-900' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>
                        <span>{loc.label}</span>
                        <span className={`text-[9px] font-normal ${assessment.serverLocation === loc.id ? 'text-slate-600' : 'text-slate-500'}`}>{loc.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  onClick={() => updateAssessment('hasMultiCompany', !assessment.hasMultiCompany)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault(); updateAssessment('hasMultiCompany', !assessment.hasMultiCompany);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={assessment.hasMultiCompany}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-5 py-4 transition-colors ${assessment.hasMultiCompany ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <Globe2 className={`h-5 w-5 ${assessment.hasMultiCompany ? 'text-indigo-500' : 'text-slate-500'}`} />
                    <div>
                      <div className={`text-sm font-bold ${assessment.hasMultiCompany ? 'text-white' : 'text-slate-300'}`}>Multi-Entity Setup</div>
                      <div className="text-[10px] text-slate-500">Untuk perusahaan holding dengan banyak anak perusahaan (PT) dalam satu sistem.</div>
                    </div>
                  </div>
                  <div className={`h-5 w-9 rounded-full p-0.5 ${assessment.hasMultiCompany ? 'bg-indigo-500' : 'bg-slate-700'}`}><div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${assessment.hasMultiCompany ? 'translate-x-4' : ''}`} /></div>
                </div>
              </div>
            )}

            {assessmentStep === 3 && (
              <div className="space-y-8">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Business Modules</h2>
                  <p className="text-sm text-slate-400">Pilih fungsionalitas yang dibutuhkan operasional Anda.</p>
                </div>
                <div>
                  <h4 className="text-primary-400 mb-3 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                    <LayoutGrid className="h-3 w-3" />
                    {' '}
                    Core Operations
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      { key: 'needsCRM', label: 'CRM & Sales', desc: 'Leads, Pipeline, Quotation', icon: UserCheck },
                      { key: 'needsAccounting', label: 'Finance', desc: 'Jurnal, Neraca, Laba Rugi', icon: Wallet },
                      { key: 'needsInventory', label: 'Inventory', desc: 'Stock, Warehouse, Transfer', icon: Package },
                      { key: 'needsProcurement', label: 'Procurement', desc: 'PO, PR, Supplier Portal', icon: ShoppingCart },
                      { key: 'needsHRM', label: 'HRM & Payroll', desc: 'Absensi, Cuti, Gaji, PPh21', icon: Users },
                    ].map(m => (
                      <div
                        key={m.key}
                        onClick={() => updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData])}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault(); updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData]);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={!!assessment[m.key as keyof AssessmentData]}
                        className={`flex min-h-[80px] cursor-pointer flex-col justify-center gap-1 rounded-xl border p-3 transition-all ${assessment[m.key as keyof AssessmentData] ? 'bg-primary-500/20 border-primary-500' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-2">
                          <m.icon className={`h-4 w-4 ${assessment[m.key as keyof AssessmentData] ? 'text-primary-400' : 'text-slate-500'}`} />
                          <span className={`text-sm font-medium ${assessment[m.key as keyof AssessmentData] ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
                        </div>
                        <span className="pl-6 text-[10px] leading-tight text-slate-500">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-blue-400 uppercase">
                    <Settings className="h-3 w-3" />
                    {' '}
                    Specialized
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      { key: 'needsManufacturing', label: 'Manufacturing', desc: 'BOM, Work Order, Planning', icon: Factory },
                      { key: 'needsProjectMgmt', label: 'Project Management', desc: 'Task, Timesheet, Costing', icon: Briefcase },
                      { key: 'needsAssetMgmt', label: 'Asset Management', desc: 'Maintenance, Depreciation', icon: BarChart3 },
                      { key: 'needsHelpdesk', label: 'Helpdesk', desc: 'Ticket, SLA, Customer Portal', icon: Headphones },
                      { key: 'needsPOS', label: 'Point of Sales', desc: 'Kasir Retail / F&B', icon: Store },
                      { key: 'needsEcommerce', label: 'E-Commerce', desc: 'Webstore & Payment Gateway', icon: Globe },
                    ].map(m => (
                      <div
                        key={m.key}
                        onClick={() => updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData])}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault(); updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData]);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={!!assessment[m.key as keyof AssessmentData]}
                        className={`flex min-h-[80px] cursor-pointer flex-col justify-center gap-1 rounded-xl border p-3 transition-all ${assessment[m.key as keyof AssessmentData] ? 'border-blue-500 bg-blue-500/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-2">
                          <m.icon className={`h-4 w-4 ${assessment[m.key as keyof AssessmentData] ? 'text-blue-400' : 'text-slate-500'}`} />
                          <span className={`text-sm font-medium ${assessment[m.key as keyof AssessmentData] ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
                        </div>
                        <span className="pl-6 text-[10px] leading-tight text-slate-500">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-purple-400 uppercase">
                    <Activity className="h-3 w-3" />
                    {' '}
                    Advanced
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                    {[
                      { key: 'needsQualityControl', label: 'Quality Control', desc: 'Inspections & Goals', icon: Activity },
                      { key: 'needsFleet', label: 'Fleet Management', desc: 'Vehicle Tracking & Fuel', icon: Truck },
                      { key: 'needsDMS', label: 'Document Management', desc: 'Digital Archive & Versioning', icon: FileCheck },
                      { key: 'needsBI', label: 'Business Intelligence', desc: 'Advanced Dashboard', icon: PieChart },
                    ].map(m => (
                      <div
                        key={m.key}
                        onClick={() => updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData])}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault(); updateAssessment(m.key as keyof AssessmentData, !assessment[m.key as keyof AssessmentData]);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={!!assessment[m.key as keyof AssessmentData]}
                        className={`flex min-h-[80px] cursor-pointer flex-col justify-center gap-1 rounded-xl border p-3 transition-all ${assessment[m.key as keyof AssessmentData] ? 'border-purple-500 bg-purple-500/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-2">
                          <m.icon className={`h-4 w-4 ${assessment[m.key as keyof AssessmentData] ? 'text-purple-400' : 'text-slate-500'}`} />
                          <span className={`text-sm font-medium ${assessment[m.key as keyof AssessmentData] ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
                        </div>
                        <span className="pl-6 text-[10px] leading-tight text-slate-500">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {assessmentStep === 4 && (
              <div className="space-y-6">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Integration & Customization</h2>
                  <p className="text-sm text-slate-400">Kompleksitas ekosistem IT yang dibutuhkan.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                    Data Migration Scope
                    <Tooltip text="Volume data yang akan dipindahkan dari sistem lama." />
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { id: 'low', label: 'Master Data Only', sub: 'Customer, Vendor, Item' },
                      { id: 'medium', label: 'Active Transactions', sub: 'Open PO/SO/Invoice' },
                      { id: 'high', label: 'Full History', sub: 'All Historical Data' },
                    ].map(vol => (
                      <button key={vol.id} onClick={() => updateAssessment('dataVolume', vol.id)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border py-3 text-xs font-bold transition-all ${assessment.dataVolume === vol.id ? 'border-white bg-white text-slate-900' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>
                        <span>{vol.label}</span>
                        <span className={`text-[9px] font-normal ${assessment.dataVolume === vol.id ? 'text-slate-600' : 'text-slate-500'}`}>{vol.sub}</span>
                      </button>
                    ))}
                  </div>
                  <div
                    className="mt-4 border-t border-white/5 pt-4"
                    onClick={() => updateAssessment('hasLegacySystem', !assessment.hasLegacySystem)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); updateAssessment('hasLegacySystem', !assessment.hasLegacySystem);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={assessment.hasLegacySystem}
                  >
                    <div className="flex cursor-pointer items-center gap-2">
                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${assessment.hasLegacySystem ? 'border-amber-500 bg-amber-500' : 'border-slate-500'}`}>
                        {assessment.hasLegacySystem && <Check className="h-3 w-3 text-black" />}
                      </div>
                      <span className="text-xs text-slate-300">Need Legacy System Cleansing Service?</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex justify-between">
                    <label className="flex items-center gap-2 text-sm font-bold text-white">
                      <Plug className="h-4 w-4 text-purple-400" />
                      {' '}
                      API Integrations
                      <Tooltip text="Koneksi ke sistem lain seperti Marketplace (Tokopedia/Shopee), Bank, Payment Gateway, atau Logistics." />
                    </label>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-400">
                      {assessment.apiIntegrations}
                      {' '}
                      connections
                    </span>
                  </div>
                  <input type="range" max="10" value={assessment.apiIntegrations} onChange={e => updateAssessment('apiIntegrations', Number.parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-purple-500" />
                  <p className="mt-2 text-[10px] text-slate-500">Geser untuk estimasi jumlah sistem pihak ketiga yang akan dihubungkan.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 flex justify-between">
                    <label className="flex items-center gap-2 text-sm font-bold text-white">
                      <FileText className="h-4 w-4 text-purple-400" />
                      {' '}
                      Custom Reports Dev
                      <Tooltip text="Pembuatan laporan format khusus yang tidak tersedia di standar (misal: Laporan Pajak format spesifik)." />
                    </label>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-400">
                      {assessment.customReports}
                      {' '}
                      reports
                    </span>
                  </div>
                  <input type="range" max="20" value={assessment.customReports} onChange={e => updateAssessment('customReports', Number.parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-purple-500" />
                </div>
                <div
                  onClick={() => updateAssessment('needsCustomModule', !assessment.needsCustomModule)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault(); updateAssessment('needsCustomModule', !assessment.needsCustomModule);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={assessment.needsCustomModule}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all ${assessment.needsCustomModule ? 'border-purple-500 bg-purple-500/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-2 ${assessment.needsCustomModule ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}><AppWindow className="h-5 w-5" /></div>
                    <div>
                      <div className={`text-sm font-bold ${assessment.needsCustomModule ? 'text-white' : 'text-slate-300'}`}>Develop Custom Module</div>
                      <div className="text-[10px] text-slate-500">Centang jika Anda memiliki alur bisnis unik yang tidak umum.</div>
                    </div>
                  </div>
                  <div className={`h-5 w-9 rounded-full p-0.5 ${assessment.needsCustomModule ? 'bg-purple-500' : 'bg-slate-700'}`}><div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${assessment.needsCustomModule ? 'translate-x-4' : ''}`} /></div>
                </div>
              </div>
            )}

            {assessmentStep === 5 && (
              <div className="space-y-8">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Timeline & SLA</h2>
                  <p className="text-sm text-slate-400">Rencana Go-Live dan Tingkat Dukungan yang diharapkan.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'urgent', title: 'Urgent', desc: '< 1 Month', icon: Zap, tooltip: 'Membutuhkan tim Fast-Track Deployment.' },
                    { id: '1month', title: 'Standard', desc: '1-2 Months', icon: Clock, tooltip: 'Timeline implementasi standar.' },
                    { id: '3months', title: 'Planned', desc: '3+ Months', icon: CreditCard, tooltip: 'Implementasi bertahap (Phased).' },
                  ].map(t => <SelectableCard key={t.id} selected={assessment.goLiveTimeline === t.id} onClick={() => updateAssessment('goLiveTimeline', t.id)} {...t} />)}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                    Training Preference
                    <Tooltip text="Metode pelatihan user yang diinginkan." />
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { id: 'online', label: 'Online (Zoom)', sub: 'Flexible & Recorded' },
                      { id: 'hybrid', label: 'Hybrid Mix', sub: 'Online + 1 Day Onsite' },
                      { id: 'onsite', label: 'Full Onsite', sub: 'Intensive Face-to-Face' },
                    ].map(tp => (
                      <button key={tp.id} onClick={() => updateAssessment('trainingPreference', tp.id)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border py-3 text-xs font-bold transition-all ${assessment.trainingPreference === tp.id ? 'border-white bg-white text-slate-900' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>
                        <span>{tp.label}</span>
                        <span className={`text-[9px] font-normal ${assessment.trainingPreference === tp.id ? 'text-slate-600' : 'text-slate-500'}`}>{tp.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="mb-4 text-center text-sm font-bold text-white">Support SLA Level</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['standard', 'priority', 'premium'].map(lvl => <button key={lvl} onClick={() => updateAssessment('supportLevel', lvl)} className={`rounded-xl border py-3 text-xs font-bold tracking-wider uppercase transition-all ${assessment.supportLevel === lvl ? 'bg-primary-600 border-primary-500 shadow-primary-500/20 text-white shadow-lg' : 'border-slate-700 bg-transparent text-slate-400 hover:border-slate-500 hover:text-white'}`}>{lvl}</button>)}
                  </div>
                  <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4 text-center">
                    {assessment.supportLevel === 'standard' && (
                      <div className="text-xs text-slate-400">
                        <span className="font-bold text-white">Email Support Only</span>
                        . Response time max 2x24 jam kerja. Cocok untuk tim IT mandiri.
                      </div>
                    )}
                    {assessment.supportLevel === 'priority' && (
                      <div className="text-xs text-slate-400">
                        <span className="font-bold text-white">Chat & Email Support</span>
                        . Response time max 12 jam kerja. Bantuan kendala teknis operasional.
                      </div>
                    )}
                    {assessment.supportLevel === 'premium' && (
                      <div className="text-xs text-slate-400">
                        <span className="font-bold text-white">Dedicated Account Manager & 24/7 Hotline</span>
                        . Response time &lt; 2 jam. Prioritas penanganan isu kritis.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {assessmentStep === 6 && (
              <div className="space-y-6">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">Review Data</h2>
                  <p className="text-sm text-slate-400">Pastikan spesifikasi kebutuhan Anda sudah lengkap & akurat.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Profile Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Building2 className="text-primary-400 h-4 w-4" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">Business Profile</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Industry</span>
                        <span className="font-medium text-white capitalize">{assessment.industry || 'Not Set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size</span>
                        <span className="font-medium text-white capitalize">{assessment.companySize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Estimated Users</span>
                        <span className="font-bold text-white">
                          {assessment.userCount}
                          {' '}
                          Accounts
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Branches</span>
                        <span className="font-bold text-white">
                          {assessment.branchCount}
                          {' '}
                          Locations
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Server className="h-4 w-4 text-blue-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">Infrastructure</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Deployment</span>
                        <span className="font-medium text-white capitalize">{assessment.deployment === 'onprem' ? 'On-Premise' : assessment.deployment === 'dedicated' ? 'Private Cloud' : 'Shared Cloud'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Region</span>
                        <span className="font-medium text-white capitalize">{assessment.serverLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Multi-Entity</span>
                        <span className={`font-medium ${assessment.hasMultiCompany ? 'text-indigo-400' : 'text-white'}`}>{assessment.hasMultiCompany ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Modules Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10 md:col-span-2">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <LayoutGrid className="h-4 w-4 text-emerald-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">Selected Modules</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(assessment).filter(k => k.startsWith('needs') && assessment[k as keyof AssessmentData] === true).map(k => (
                        <span key={k} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 capitalize">
                          {k.replace('needs', '').replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      ))}
                      {Object.keys(assessment).filter(k => k.startsWith('needs') && assessment[k as keyof AssessmentData] === true).length === 0 && (
                        <span className="text-sm text-slate-500 italic">No modules selected</span>
                      )}
                    </div>
                  </div>

                  {/* Integration & Tech Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Cpu className="h-4 w-4 text-purple-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">Technical Specifications</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Data Migration</span>
                        <span className="font-medium text-white capitalize">
                          {assessment.dataVolume}
                          {' '}
                          Volume
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">API Integrations</span>
                        <span className="font-bold text-white">
                          {assessment.apiIntegrations}
                          {' '}
                          Endpoints
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Custom Module</span>
                        <span className={`font-medium ${assessment.needsCustomModule ? 'text-purple-400' : 'text-white'}`}>{assessment.needsCustomModule ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">Plan & Service</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Go-Live Target</span>
                        <span className="font-medium text-white capitalize">{assessment.goLiveTimeline === 'urgent' ? '< 1 Month' : assessment.goLiveTimeline === '1month' ? '1-2 Months' : '3+ Months'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Training</span>
                        <span className="font-medium text-white capitalize">{assessment.trainingPreference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Support Level</span>
                        <span className="font-medium text-white capitalize">
                          {assessment.supportLevel}
                          {' '}
                          SLA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Panel: Summary */}
        <div className="hidden w-[320px] flex-shrink-0 lg:block">
          <SummaryPanel />
        </div>
      </div>

      {/* Footer Nav (Mobile Only) */}
      <div className="fixed right-0 bottom-0 left-0 z-20 flex items-center justify-between border-t border-white/10 bg-[#0B0F19]/80 p-4 backdrop-blur-md lg:hidden">
        <Button variant="ghost" onClick={() => changeStep('prev')} disabled={assessmentStep === 1 || isTransitioning} className="h-10 px-4 text-sm font-medium text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {' '}
          Back
        </Button>
        {assessmentStep < 6
          ? (
              <Button variant="primary" onClick={() => changeStep('next')} className="shadow-primary-500/20 h-10 rounded-full bg-white px-6 text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-200">
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )
          : (
              <Button variant="primary" onClick={() => changeStep('jump', 'recommendation')} className="h-10 rounded-full bg-emerald-500 px-8 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400">
                Calculate Price
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            )}
      </div>
    </div>
  );

  const renderRecommendation = () => {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-[#0B0F19]">
        <div className="scrollbar-thin scrollbar-thumb-white/10 flex-grow overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 pt-4 text-center">
              <h2 className="mb-2 text-3xl font-bold text-white">Rekomendasi Paket</h2>
              <p className="text-sm text-slate-400">Solusi terbaik berdasarkan profil bisnis & kebutuhan teknis Anda.</p>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="mb-8 flex justify-center">
              <div className="relative flex rounded-xl border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`relative z-10 rounded-lg px-6 py-2 text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`relative z-10 rounded-lg px-6 py-2 text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Tahunan
                  {' '}
                  <span className="ml-1 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] text-white">-20%</span>
                </button>
                <motion.div
                  className="bg-primary-600 absolute top-1 bottom-1 rounded-lg shadow-lg"
                  initial={false}
                  animate={{
                    left: billingCycle === 'monthly' ? '4px' : '50%',
                    width: billingCycle === 'monthly' ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                    x: billingCycle === 'monthly' ? 0 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <div className="grid items-center gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                const isRec = plan.id === recommendedPlanId;
                const priceValue = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative flex h-full cursor-pointer flex-col rounded-3xl border p-6 transition-all duration-300
                                ${isSelected ? 'border-primary-500 ring-primary-500 z-10 scale-105 bg-slate-800/80 shadow-2xl ring-1' : 'scale-100 border-white/5 bg-slate-900/50 opacity-80 hover:border-white/10 hover:bg-slate-800/50 hover:opacity-100'}`}
                  >
                    {isRec && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg shadow-emerald-500/20">Best Match</div>}
                    <div className="mt-2 mb-6 text-center">
                      <h3 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{plan.name}</h3>
                      <div className="mt-2 flex items-baseline justify-center gap-1">
                        {priceValue > 0
                          ? (
                              <>
                                <span className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-slate-400'}`}>{priceValue / 1000000}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Juta / bln</span>
                              </>
                            )
                          : (
                              <span className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-slate-400'}`}>Custom</span>
                            )}
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500">
                        {plan.id === 'enterprise' ? 'Custom SLA & Integrations' : billingCycle === 'yearly' ? 'Dibayar per tahun' : 'Dibayar per bulan'}
                      </div>
                    </div>
                    <div className="mb-8 flex-grow space-y-3">
                      {plan.features.slice(0, 5).map((f, i) => (
                        <div key={i} className="flex gap-3 text-xs text-slate-400">
                          <CheckCircle2 className={`h-3 w-3 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                          {' '}
                          {f}
                        </div>
                      ))}
                    </div>
                    <Button fullWidth variant={isSelected ? 'primary' : 'outline'} className={`h-10 rounded-xl text-xs font-bold ${isSelected ? 'bg-white text-slate-900 shadow-lg hover:bg-slate-200' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{isSelected ? 'Paket Terpilih' : 'Pilih Paket Ini'}</Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="z-20 flex justify-center border-t border-white/10 bg-[#0B0F19]/90 p-4 backdrop-blur">
          <Button variant="primary" onClick={() => changeStep('jump', 'customize')} className="shadow-primary-500/20 bg-primary-600 hover:bg-primary-500 h-12 rounded-full px-12 text-sm font-bold text-white shadow-xl">
            Lanjut Konfigurasi Add-ons
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomize = () => {
    // Separate addons into 4 distinct groups
    const infrastructureAddons = addOns.filter(a => a.category === 'infrastructure');
    const implementationAddons = addOns.filter(a => a.category === 'implementation');
    const supportAddons = addOns.filter(a => a.category === 'support');
    const integrationAddons = addOns.filter(a => a.category === 'integration');
    const managedServicesAddons = addOns.filter(a => a.category === 'managed-services');

    const sections = [
      { title: 'Infrastructure & Hardware', icon: Server, color: 'text-blue-400', items: infrastructureAddons },
      { title: 'Implementation Services', icon: Rocket, color: 'text-emerald-400', items: implementationAddons },
      { title: 'Support & Maintenance', icon: Headphones, color: 'text-amber-400', items: supportAddons },
      { title: 'Integrations & Customization', icon: Plug, color: 'text-purple-400', items: integrationAddons },
      { title: 'Enterprise Managed Services', icon: Briefcase, color: 'text-rose-400', items: managedServicesAddons },
    ];

    return (
      <div className="flex h-full flex-col overflow-hidden bg-[#0B0F19]">
        <div className="scrollbar-thin scrollbar-thumb-white/10 flex-grow overflow-y-auto p-6">
          <div className="mx-auto grid h-full max-w-6xl gap-8 lg:grid-cols-12">
            <div className="space-y-8 pb-12 lg:col-span-8">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400"><CreditCard className="h-5 w-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Siklus Pembayaran</h3>
                    <p className="text-xs text-slate-400">Hemat 20% dengan pembayaran tahunan.</p>
                  </div>
                </div>
                <div className="flex rounded-xl border border-white/5 bg-black/40 p-1">
                  <button onClick={() => setBillingCycle('monthly')} className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-white'}`}>Bulanan</button>
                  <button onClick={() => setBillingCycle('yearly')} className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-primary-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>Tahunan (-20%)</button>
                </div>
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <section.icon className={`h-4 w-4 ${section.color}`} />
                    <h3 className="text-sm font-bold tracking-wider text-white uppercase">{section.title}</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {section.items.map((addon) => {
                      if (addon.availableFor.includes(selectedPlanId) || selectedPlanId === 'enterprise') {
                        return (
                          <AddonItem
                            key={addon.id}
                            addon={addon}
                            quantity={selectedAddOns[addon.id] || 0}
                            onToggle={handleToggleAddon}
                            onQuantityChange={handleQuantityChange}
                            formatIDR={formatIDR}
                            isExclusive={addon.id.includes('impl')}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Summary */}
            <div className="flex h-full flex-col lg:col-span-4">
              <div className="sticky top-6 flex flex-grow flex-col overflow-hidden rounded-3xl border border-slate-800 bg-[#0F1623] shadow-2xl">
                <div className="border-b border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    <Wallet className="h-3 w-3" />
                    {' '}
                    Estimated Investment
                  </h3>
                  <div className="text-3xl font-black tracking-tight text-white">{calculations.totalFirstPayment > 0 ? formatIDR(calculations.totalFirstPayment) : 'Custom'}</div>
                  <p className="mt-1 text-[10px] text-slate-500">Total pembayaran awal (termasuk pajak)</p>
                </div>
                <div className="flex-grow space-y-4 overflow-y-auto p-6">
                  <div className="flex justify-between border-b border-white/5 pb-3 text-xs text-slate-400">
                    <span>
                      Paket (
                      {billingCycle === 'yearly' ? 'Tahunan' : 'Bulanan'}
                      )
                    </span>
                    <span className="font-medium text-white">
                      {calculations.basePrice > 0 ? formatIDR(billingCycle === 'yearly' ? calculations.basePrice * 12 : calculations.basePrice) : 'Custom'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(selectedAddOns).map(([id, qty]) => {
                      const item = addOns.find(a => a.id === id); if (!item || qty === 0) {
                        return null;
                      }
                      const price = (item.unit.includes('one-time') || item.unit.includes('per')) ? item.price * qty : item.price * qty * (billingCycle === 'yearly' ? 12 : 1);
                      return (
                        <div key={id} className="flex justify-between text-[10px] text-slate-500">
                          <span>
                            {item.name}
                            {' '}
                            {qty > 1 && `(${qty}x)`}
                          </span>
                          {' '}
                          <span className="text-slate-300">{formatIDR(price)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-sm font-bold text-white">
                    <span>Subtotal</span>
                    {' '}
                    <span>{calculations.subtotal > 0 ? formatIDR(calculations.subtotal) : 'Custom'}</span>
                  </div>
                </div>
                <div className="mt-auto border-t border-white/5 bg-black/20 p-6">
                  <Button fullWidth variant="primary" onClick={() => changeStep('jump', 'checkout')} className="h-12 rounded-xl bg-white text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-200">Checkout</Button>
                  <button onClick={() => changeStep('jump', 'recommendation')} className="mt-3 w-full text-center text-[10px] text-slate-500 transition-colors hover:text-white">Ubah Paket</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckout = () => (
    <div className="flex h-full items-center justify-center overflow-y-auto bg-[#0B0F19] p-6">
      <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-primary-500/20 text-primary-400 flex h-8 w-8 items-center justify-center rounded-full"><User className="h-4 w-4" /></div>
            <h3 className="text-lg font-bold text-white">Informasi Kontak</h3>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">Nama Depan</label>
                <input type="text" className="focus:border-primary-500 w-full rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white transition-colors outline-none focus:bg-black/40" value={contactInfo.firstName} onChange={e => setContactInfo({ ...contactInfo, firstName: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">Nama Belakang</label>
                <input type="text" className="focus:border-primary-500 w-full rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white transition-colors outline-none focus:bg-black/40" value={contactInfo.lastName} onChange={e => setContactInfo({ ...contactInfo, lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">Email Bisnis</label>
              <input type="email" className="focus:border-primary-500 w-full rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white transition-colors outline-none focus:bg-black/40" value={contactInfo.email} onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
              <input type="text" className="focus:border-primary-500 w-full rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white transition-colors outline-none focus:bg-black/40" value={contactInfo.company} onChange={e => setContactInfo({ ...contactInfo, company: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">No. Telepon / WhatsApp</label>
              <input type="tel" className="focus:border-primary-500 w-full rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white transition-colors outline-none focus:bg-black/40" value={contactInfo.phone} onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })} />
            </div>

            <div className="border-t border-white/5 pt-4">
              <label className="mb-1 ml-1 block text-[10px] font-bold text-slate-500 uppercase">Kode Voucher</label>
              <div className="flex gap-2">
                <input type="text" className="focus:border-primary-500 flex-1 rounded-xl border border-slate-700 bg-black/20 px-4 py-3 text-sm text-white uppercase outline-none" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                <Button variant="outline" onClick={handleApplyDiscount} className="rounded-xl border-slate-700 px-6 text-xs hover:bg-white/5 hover:text-white">Gunakan</Button>
              </div>
              {appliedDiscount && (
                <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {' '}
                  Voucher berhasil digunakan!
                </p>
              )}
              {Object.keys(formErrors).length > 0 && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {' '}
                  Mohon lengkapi semua field wajib.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between space-y-6">
          <div className="relative flex-grow overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
            <div className="bg-primary-500/10 pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl"></div>
            <h3 className="mb-6 text-xl font-bold text-white">Ringkasan Pesanan</h3>
            <div className="relative z-10 space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-3 text-slate-400">
                <span>Paket Terpilih</span>
                {' '}
                <span className="font-bold text-white">{selectedPlanData?.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 text-slate-400">
                <span>Siklus</span>
                {' '}
                <span className="font-bold text-white capitalize">{billingCycle === 'yearly' ? 'Tahunan' : 'Bulanan'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 text-slate-400">
                <span>Total User</span>
                {' '}
                <span className="font-bold text-white">
                  {assessment.userCount}
                  {' '}
                  Akun
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 text-slate-400">
                <span>Add-ons</span>
                {' '}
                <span className="font-bold text-white">
                  {Object.keys(selectedAddOns).length}
                  {' '}
                  Item
                </span>
              </div>
              <div className="flex items-end justify-between pt-4">
                <span className="text-lg font-bold text-white">Grand Total</span>
                <div className="text-right">
                  <span className="block text-3xl font-black text-white">{calculations.totalFirstPayment > 0 ? formatIDR(calculations.totalFirstPayment) : 'Custom'}</span>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Estimasi Awal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Button fullWidth variant="primary" onClick={handleRequestQuotation} className="h-14 rounded-2xl bg-white text-base font-bold text-slate-900 shadow-xl hover:bg-slate-200">Dapatkan Penawaran Resmi</Button>
            <button onClick={() => changeStep('jump', 'customize')} className="w-full py-2 text-center text-xs text-slate-500 transition-colors hover:text-white">Kembali ke Konfigurasi</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="h-full w-full overflow-y-auto bg-[#0B0F19]">
      <div className="flex min-h-full flex-col items-center justify-start p-8 pb-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </motion.div>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Penawaran Siap!</h2>
        <p className="mb-8 text-base text-slate-400">
          Dokumen resmi telah dikirim ke
          <span className="font-bold text-white">{contactInfo.email}</span>
        </p>

        {/* Visible Quotation Preview */}
        <div className="relative mx-auto mb-8 w-full max-w-4xl overflow-hidden rounded-lg bg-white p-12 text-left text-slate-900 shadow-2xl">
          <div className="mb-12 flex items-start justify-between border-b-2 border-slate-900 pb-8">
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900">QUOTATION</h1>
              <p className="font-sans text-sm tracking-widest text-slate-500 uppercase">
                Reference: #
                {quotationId}
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-primary-900 mb-1 text-2xl font-bold tracking-tight">BizOps</h2>
              <p className="font-sans text-sm text-slate-600">PT Divistant Teknologi Indonesia</p>
              <p className="mt-1 ml-auto max-w-[200px] font-sans text-xs text-slate-500">
                Eco-S Sahid Sudirman Residence
                {' '}
                <br />
                Jl. Jenderal Sudirman No.86, Jakarta 10250
              </p>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-2 gap-12">
            <div>
              <h3 className="mb-3 font-sans text-xs font-bold tracking-wider text-slate-400 uppercase">Quotation For</h3>
              <div className="text-slate-900">
                <p className="text-lg font-bold">{contactInfo.company}</p>
                <p className="mt-1 text-sm">
                  Attn:
                  {contactInfo.firstName}
                  {' '}
                  {contactInfo.lastName}
                </p>
                <p className="text-sm text-slate-600">{contactInfo.email}</p>
                <p className="text-sm text-slate-600">{contactInfo.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <h3 className="mb-1 font-sans text-xs font-bold tracking-wider text-slate-400 uppercase">Issue Date</h3>
                <p className="font-medium text-slate-900">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <h3 className="mb-1 font-sans text-xs font-bold tracking-wider text-slate-400 uppercase">Valid Until</h3>
                <p className="font-medium text-slate-900">{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <table className="mb-12 w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-900">
                <th className="w-1/2 pb-4 font-sans text-xs font-bold tracking-wider uppercase">Description</th>
                <th className="pb-4 text-right font-sans text-xs font-bold tracking-wider uppercase">Amount (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4">
                  <span className="mb-1 block text-lg font-bold text-slate-900">
                    {selectedPlanData?.name}
                    {' '}
                    Package
                  </span>
                  <span className="font-sans text-sm text-slate-500">
                    Billing Cycle:
                    {billingCycle === 'yearly' ? 'Yearly (-20%)' : 'Monthly'}
                  </span>
                </td>
                <td className="py-4 text-right text-lg font-bold text-slate-900">
                  {calculations.basePrice > 0
                    ? formatIDR(billingCycle === 'yearly' ? calculations.basePrice * 12 : calculations.basePrice)
                    : 'Custom Price'}
                </td>
              </tr>
              {Object.entries(selectedAddOns).map(([id, qty]) => {
                const item = addOns.find(a => a.id === id); if (!item) {
                  return null;
                }
                const price = (item.unit.includes('one-time') || item.unit.includes('per')) ? item.price * qty : item.price * qty * (billingCycle === 'yearly' ? 12 : 1);
                return (
                  <tr key={id}>
                    <td className="py-4">
                      <span className="block font-medium text-slate-800">{item.name}</span>
                      <span className="font-sans text-xs text-slate-500">
                        Qty:
                        {qty}
                        {' '}
                        x
                        {item.unit}
                      </span>
                    </td>
                    <td className="py-4 text-right font-medium text-slate-700">{formatIDR(price)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900">
                <td className="pt-6 text-xl font-bold tracking-tight text-slate-900 uppercase">Total Investment</td>
                <td className="text-primary-900 pt-6 text-right text-2xl font-black">{calculations.totalFirstPayment > 0 ? formatIDR(calculations.totalFirstPayment) : 'Custom'}</td>
              </tr>
              {appliedDiscount && (
                <tr>
                  <td className="pt-2 font-sans text-sm text-emerald-600 italic">
                    Includes discount
                    {appliedDiscount.percent}
                    % (
                    {appliedDiscount.code}
                    )
                  </td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="pt-2 text-right font-sans text-xs text-slate-400 italic">* Prices include applicable taxes</td>
              </tr>
            </tfoot>
          </table>

          <div className="grid break-inside-avoid grid-cols-2 gap-12 border-t border-slate-100 pt-8">
            <div>
              <h4 className="mb-2 font-sans text-sm font-bold text-slate-900">Payment Terms</h4>
              <ul className="list-disc space-y-1 pl-4 font-sans text-xs text-slate-600">
                <li>Payment is due within 14 days of invoice date.</li>
                <li>Bank transfer to BCA 1234567890 a/n PT Divistant Teknologi Indonesia.</li>
                <li>Please include invoice number in transfer description.</li>
              </ul>
            </div>
            <div className="mt-8 text-center">
              <div className="flex h-20 items-end justify-center">
                <p className="font-handwriting rotate-[-5deg] text-2xl text-slate-300 opacity-50">Authorized</p>
              </div>
              <div className="mx-auto w-48 border-t border-slate-300 pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase">Authorized Signature</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-6 text-center font-sans text-[10px] text-slate-400">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            PT Divistant Teknologi Indonesia. All rights reserved.
            <br />
            This is a computer-generated document. No signature is required.
          </div>
        </div>

        <div className="mb-12 flex gap-4">
          <Button variant="primary" onClick={handlePrint} className="h-12 rounded-full bg-white px-8 font-bold text-slate-900 shadow-lg hover:bg-slate-200">
            <Printer className="mr-2 h-4 w-4" />
            {' '}
            Download / Print PDF
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} className="h-12 rounded-full border-slate-700 px-8 text-slate-300 hover:bg-white/5 hover:text-white">Buat Baru</Button>
        </div>
      </div>

      {/* Hidden Print Area (Preserved for print layout consistency) */}
      <div className="fixed inset-0 z-[9999] hidden bg-white p-16 text-black print:block" ref={quoteRef}>
        <div className="mb-16 flex items-start justify-between border-b-2 border-black pb-8">
          <div>
            <h1 className="mb-4 text-5xl font-bold tracking-tight">QUOTATION</h1>
            <p className="text-sm tracking-widest text-gray-500 uppercase">
              Reference: #
              {quotationId}
            </p>
          </div>
          <div className="text-right">
            <h2 className="mb-2 text-3xl font-bold">BizOps</h2>
            <p className="text-base font-bold">PT Divistant Teknologi Indonesia</p>
            <p className="mt-1 ml-auto max-w-[250px] text-sm text-gray-600">
              Eco-S Sahid Sudirman Residence
              {' '}
              <br />
              Jl. Jenderal Sudirman No.86, Jakarta 10250
            </p>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-16">
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase">Quotation For</h3>
            <div className="space-y-1 text-black">
              <p className="text-xl font-bold">{contactInfo.company}</p>
              <p className="text-base">
                Attn:
                {contactInfo.firstName}
                {' '}
                {contactInfo.lastName}
              </p>
              <p className="text-base text-gray-600">{contactInfo.email}</p>
              <p className="text-base text-gray-600">{contactInfo.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-6">
              <h3 className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Issue Date</h3>
              <p className="text-lg font-medium">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Valid Until</h3>
              <p className="text-lg font-medium">{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        <table className="mb-16 w-full text-left">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="w-1/2 pb-4 text-xs font-bold tracking-wider uppercase">Description</th>
              <th className="pb-4 text-right text-xs font-bold tracking-wider uppercase">Amount (IDR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-4">
                <span className="mb-1 block text-lg font-bold">
                  {selectedPlanData?.name}
                  {' '}
                  Package
                </span>
                <span className="text-sm text-gray-600">
                  Billing Cycle:
                  {billingCycle === 'yearly' ? 'Yearly (-20%)' : 'Monthly'}
                </span>
              </td>
              <td className="py-4 text-right text-lg font-bold">
                {calculations.basePrice > 0
                  ? formatIDR(billingCycle === 'yearly' ? calculations.basePrice * 12 : calculations.basePrice)
                  : 'Custom Price'}
              </td>
            </tr>
            {Object.entries(selectedAddOns).map(([id, qty]) => {
              const item = addOns.find(a => a.id === id); if (!item) {
                return null;
              }
              const price = (item.unit.includes('one-time') || item.unit.includes('per')) ? item.price * qty : item.price * qty * (billingCycle === 'yearly' ? 12 : 1);
              return (
                <tr key={id}>
                  <td className="py-4">
                    <span className="block font-medium">{item.name}</span>
                    <span className="text-xs text-gray-600">
                      Qty:
                      {qty}
                      {' '}
                      x
                      {item.unit}
                    </span>
                  </td>
                  <td className="py-4 text-right font-medium text-gray-800">{formatIDR(price)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-black">
              <td className="pt-6 text-xl font-bold tracking-tight uppercase">Total Investment</td>
              <td className="pt-6 text-right text-2xl font-black">{calculations.totalFirstPayment > 0 ? formatIDR(calculations.totalFirstPayment) : 'Custom'}</td>
            </tr>
            {appliedDiscount && (
              <tr>
                <td className="pt-2 text-sm text-gray-600 italic">
                  Includes discount
                  {appliedDiscount.percent}
                  % (
                  {appliedDiscount.code}
                  )
                </td>
                <td></td>
              </tr>
            )}
            <tr>
              <td colSpan={2} className="pt-2 text-right text-xs text-gray-500 italic">* Prices include applicable taxes</td>
            </tr>
          </tfoot>
        </table>

        <div className="grid grid-cols-2 gap-16 border-t border-gray-200 pt-8">
          <div>
            <h4 className="mb-2 text-sm font-bold">Payment Terms</h4>
            <ul className="list-disc space-y-1 pl-4 text-xs text-gray-600">
              <li>Payment is due within 14 days of invoice date.</li>
              <li>Bank transfer to BCA 1234567890 a/n PT Divistant Teknologi Indonesia.</li>
              <li>Please include invoice number in transfer description.</li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <div className="flex h-20 items-end justify-center">
              {/* Empty space for signature */}
            </div>
            <div className="mx-auto w-48 border-t border-gray-400 pt-2">
              <p className="text-xs font-bold uppercase">Authorized Signature</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-6 text-center text-[10px] text-gray-500">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          PT Divistant Teknologi Indonesia. All rights reserved.
          <br />
          This is a computer-generated document. No signature is required.
        </div>
      </div>
    </div>
  );

  return (
    <div className="selection:bg-primary-500/30 h-full font-sans text-slate-200">
      {currentStep === 'assessment' && renderAssessment()}
      {currentStep === 'recommendation' && renderRecommendation()}
      {currentStep === 'customize' && renderCustomize()}
      {currentStep === 'checkout' && renderCheckout()}
      {currentStep === 'thankyou' && renderThankYou()}
    </div>
  );
};

export default PricingCalculator;
