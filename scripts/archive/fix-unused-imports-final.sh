#!/bin/bash
# Fix all unused imports that cause build failures

cd "$(dirname "$0")"

echo "Fixing unused imports..."

# Footer.tsx
sed -i '' 's/MapPin, //g; s/, MapPin//g; s/Phone, //g; s/, Phone//g' src/components/layout/Footer.tsx 2>/dev/null || \
sed -i 's/MapPin, //g; s/, MapPin//g; s/Phone, //g; s/, Phone//g' src/components/layout/Footer.tsx
sed -i '' '/^import Button from/d' src/components/layout/Footer.tsx 2>/dev/null || \
sed -i '/^import Button from/d' src/components/layout/Footer.tsx
sed -i '' '/^import { cn }/d' src/components/layout/Footer.tsx 2>/dev/null || \
sed -i '/^import { cn }/d' src/components/layout/Footer.tsx

# Navbar.tsx - ChevronDown
sed -i '' 's/ChevronDown, //g; s/, ChevronDown//g' src/components/layout/Navbar.tsx 2>/dev/null || \
sed -i 's/ChevronDown, //g; s/, ChevronDown//g' src/components/layout/Navbar.tsx

# MethodologyReference.tsx
sed -i '' '/^import { motion }/d' src/components/MethodologyReference.tsx 2>/dev/null || \
sed -i '/^import { motion }/d' src/components/MethodologyReference.tsx
sed -i '' 's/CheckCircle2, //g; s/, CheckCircle2//g' src/components/MethodologyReference.tsx 2>/dev/null || \
sed -i 's/CheckCircle2, //g; s/, CheckCircle2//g' src/components/MethodologyReference.tsx

# MegaMenu.tsx
sed -i '' 's/ChevronDown, //g; s/, ChevronDown//g' src/components/navbar/MegaMenu.tsx 2>/dev/null || \
sed -i 's/ChevronDown, //g; s/, ChevronDown//g' src/components/navbar/MegaMenu.tsx
sed -i '' 's/Search, //g; s/, Search//g' src/components/navbar/MegaMenu.tsx 2>/dev/null || \
sed -i 's/Search, //g; s/, Search//g' src/components/navbar/MegaMenu.tsx
sed -i '' 's/servicesItems, //g; s/, servicesItems//g' src/components/navbar/MegaMenu.tsx 2>/dev/null || \
sed -i 's/servicesItems, //g; s/, servicesItems//g' src/components/navbar/MegaMenu.tsx

echo "✅ Unused imports fixed"

