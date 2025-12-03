# Animation Guide

Panduan lengkap menggunakan animasi di BizOps Website V3 dengan Framer Motion.

## 📚 Table of Contents

- [Overview](#overview)
- [Animation Constants](#animation-constants)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Performance Tips](#performance-tips)

## 🎨 Overview

BizOps Website V3 menggunakan **Framer Motion** untuk animasi yang smooth dan performant. Semua animation constants disimpan di `src/utils/animation.ts` untuk konsistensi.

## 🔧 Animation Constants

### SPRING_TRANSITION

Transisi spring yang "snappy" untuk animasi cepat dan responsif.

```tsx
import { SPRING_TRANSITION } from '@/utils/animation';

<motion.div
  animate={{ x: 100 }}
  transition={SPRING_TRANSITION}
/>;
```

**Properties:**
- `type: 'spring'`
- `stiffness: 400` - Kekakuan spring (lebih tinggi = lebih cepat)
- `damping: 30` - Redaman (lebih tinggi = lebih sedikit bounce)
- `mass: 1` - Massa objek

### SOFT_SPRING

Transisi spring yang lebih lembut untuk animasi yang smooth.

```tsx
import { SOFT_SPRING } from '@/utils/animation';

<motion.div
  animate={{ scale: 1.1 }}
  transition={SOFT_SPRING}
/>;
```

**Properties:**
- `type: 'spring'`
- `stiffness: 200` - Lebih lembut dari SPRING_TRANSITION
- `damping: 20` - Lebih banyak bounce

### FADE_UP_VARIANTS

Variants untuk fade-in dari bawah (paling umum digunakan).

```tsx
import { FADE_UP_VARIANTS } from '@/utils/animation';

<motion.div
  variants={FADE_UP_VARIANTS}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Content
</motion.div>;
```

**States:**
- `hidden`: `{ opacity: 0, y: 20 }`
- `visible`: `{ opacity: 1, y: 0, transition: SPRING_TRANSITION }`
- `exit`: `{ opacity: 0, y: -20, transition: { duration: 0.2 } }`

### STAGGER_CONTAINER

Container untuk animasi stagger (animasi berurutan).

```tsx
import { FADE_UP_VARIANTS, STAGGER_CONTAINER } from '@/utils/animation';

<motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={FADE_UP_VARIANTS}>
      {item.content}
    </motion.div>
  ))}
</motion.div>;
```

**Properties:**
- `staggerChildren: 0.05` - Delay 50ms antar child
- `delayChildren: 0.1` - Delay 100ms sebelum mulai

## 💡 Usage Examples

### 1. Basic Fade In

```tsx
import { motion } from 'framer-motion';
import { FADE_UP_VARIANTS } from '@/utils/animation';

export const Card = () => (
  <motion.div
    variants={FADE_UP_VARIANTS}
    initial="hidden"
    animate="visible"
  >
    <h2>Card Title</h2>
    <p>Card content</p>
  </motion.div>
);
```

### 2. Stagger List

```tsx
import { motion } from 'framer-motion';
import { FADE_UP_VARIANTS, STAGGER_CONTAINER } from '@/utils/animation';

export const FeatureList = ({ features }) => (
  <motion.div
    variants={STAGGER_CONTAINER}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
  >
    {features.map(feature => (
      <motion.div key={feature.id} variants={FADE_UP_VARIANTS}>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </motion.div>
    ))}
  </motion.div>
);
```

### 3. Hover Animation

```tsx
import { motion } from 'framer-motion';
import { SOFT_SPRING } from '@/utils/animation';

export const Button = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={SOFT_SPRING}
  >
    Click Me
  </motion.button>
);
```

### 4. Page Transition

```tsx
import { motion } from 'framer-motion';
import { FADE_UP_VARIANTS } from '@/utils/animation';

export default function Page() {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Page Content</h1>
    </motion.div>
  );
}
```

### 5. Scroll-triggered Animation

```tsx
import { motion } from 'framer-motion';
import { FADE_UP_VARIANTS } from '@/utils/animation';

export const Section = () => (
  <motion.section
    variants={FADE_UP_VARIANTS}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <h2>Section Title</h2>
  </motion.section>
);
```

## ✅ Best Practices

### 1. Use Variants for Consistency

❌ **Bad:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
>
```

✅ **Good:**
```tsx
import { FADE_UP_VARIANTS } from '@/utils/animation';

<motion.div variants={FADE_UP_VARIANTS} initial="hidden" animate="visible">
```

### 2. Use `whileInView` for Scroll Animations

```tsx
<motion.div
  variants={FADE_UP_VARIANTS}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
>
```

**Why:**
- `once: true` - Animasi hanya sekali (performance)
- `margin: '-100px'` - Trigger sebelum elemen terlihat

### 3. Respect Reduced Motion

```tsx
import { useReducedMotion } from '@/hooks';

export const AnimatedComponent = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : FADE_UP_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      Content
    </motion.div>
  );
};
```

### 4. Optimize Layout Animations

❌ **Bad (causes layout shift):**
```tsx
<motion.div animate={{ width: 300 }}>
```

✅ **Good (uses transform):**
```tsx
<motion.div animate={{ scaleX: 1.5 }}>
```

### 5. Use `layoutId` for Shared Element Transitions

```tsx
<motion.div layoutId="shared-element">
  {/* Content */}
</motion.div>;
```

## 🚀 Performance Tips

### 1. Animate Transform & Opacity Only

**Fast (GPU-accelerated):**
- `x`, `y`, `scale`, `rotate`, `opacity`

**Slow (causes reflow):**
- `width`, `height`, `top`, `left`

### 2. Use `will-change` Sparingly

```tsx
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
>
```

**Warning:** Hanya gunakan jika benar-benar perlu!

### 3. Lazy Load Framer Motion

```tsx
import { domAnimation, LazyMotion, m } from 'framer-motion';

<LazyMotion features={domAnimation}>
  <m.div animate={{ x: 100 }}>
    Content
  </m.div>
</LazyMotion>;
```

### 4. Disable Animations on Low-end Devices

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { x: 100 }}
>
```

### 5. Use `viewport={{ once: true }}`

```tsx
<motion.div
  whileInView="visible"
  viewport={{ once: true }} // ✅ Animasi hanya sekali
>
```

## 📊 Animation Checklist

Before deploying:

- [ ] All animations use constants from `@/utils/animation`
- [ ] Scroll animations use `viewport={{ once: true }}`
- [ ] Only animating `transform` and `opacity`
- [ ] Respecting `prefers-reduced-motion`
- [ ] No layout shifts during animation
- [ ] Tested on mobile devices
- [ ] Smooth 60fps performance

## 🔗 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Performance](https://web.dev/animations/)
- [Reduced Motion](https://web.dev/prefers-reduced-motion/)

---

**Last Updated:** December 1, 2024
