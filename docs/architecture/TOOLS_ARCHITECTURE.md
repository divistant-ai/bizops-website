# 🛠️ CUSTOMER TOOLS ARCHITECTURE

**Purpose:** Scalable architecture untuk customer-facing tools (calculators, checkers, analyzers)
**Use Case:** Tools seperti Cek Pajak, Hitung Gaji, Cek BPJS, dll yang menarik leads
**Date:** December 1, 2025

---

## 🎯 UNDERSTANDING THE USE CASE

### **Customer Tools Examples:**

**Finance & Tax:**
- 🧮 Kalkulator Pajak PPh 21
- 💰 Kalkulator Take Home Pay
- 📊 Simulasi BPJS Ketenagakerjaan
- 💵 Kalkulator THR
- 📈 Kalkulator Bonus & Insentif

**HR & Payroll:**
- 👥 Kalkulator Gaji Bersih
- 🏥 Cek Iuran BPJS Kesehatan
- 🏢 Kalkulator Pesangon
- ⏰ Kalkulator Lembur
- 📅 Kalkulator Cuti

**Business Operations:**
- 📦 Kalkulator Harga Pokok Penjualan
- 💼 Kalkulator Margin Profit
- 🚚 Estimator Biaya Pengiriman

---

## 📁 RECOMMENDED STRUCTURE

```
src/
├── app/
│   └── [locale]/
│       └── (resources)/
│           └── tools/
│               ├── customer/          # Customer-facing tools
│               │   ├── pajak-pph21/
│               │   ├── gaji-bersih/
│               │   ├── bpjs/
│               │   └── ...
│               └── consultant/        # Consultant/Sales tools
│                   ├── maturity-assessment/
│                   ├── needs-analysis/
│                   └── ...
├── components/
│   └── tools/
│       ├── customer/                  # Customer tool components
│       │   ├── PajakPPh21Calculator.tsx
│       │   ├── GajiBersihCalculator.tsx
│       │   └── ...
│       ├── consultant/                # Consultant tool components
│       │   ├── MaturityAssessment.tsx
│       │   └── ...
│       └── shared/                    # Shared tool components
│           ├── ErrorDisplay.tsx
│           ├── ActionButtons.tsx
│           └── ...
├── data/
│   └── tools/                         # Tool-specific data
│       ├── customer/
│       │   ├── taxRates.ts
│       │   ├── bpjsRates.ts
│       │   └── ...
│       └── consultant/
│           └── ...
└── libs/
    └── utils/
        └── tools/                     # Tool utilities
            ├── calculations.ts
            ├── validations.ts
            └── ...
```

---

## 🎯 ARCHITECTURE PRINCIPLES

1. **Category-Based Organization** - Separate customer vs consultant tools
2. **Shared Core Infrastructure** - Reusable components, hooks, utils
3. **Tool Registry System** - Centralized tool metadata
4. **Consistent UX** - Same look & feel across all tools
5. **Lead Generation** - Built-in capture mechanisms

---

For detailed implementation guide, see `docs/architecture/TOOLS_SCALABILITY.md`.
