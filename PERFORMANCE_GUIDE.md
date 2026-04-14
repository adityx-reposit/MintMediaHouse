# 🚀 MINT MEDIA HOUSE - PERFORMANCE & OPTIMIZATION GUIDE

## CORE WEB VITALS TARGETS

### Current vs Target

| Metric | Current (Est.) | Target | Priority |
|--------|---|---|---|
| Largest Contentful Paint (LCP) | 4-6s | <2.5s | CRITICAL |
| First Input Delay (FID) | 200-400ms | <100ms | CRITICAL |
| Cumulative Layout Shift (CLS) | >0.1 | <0.1 | HIGH |
| First Contentful Paint (FCP) | >2s | <1.8s | HIGH |
| Time to Interactive (TTI) | >5s | <3.5s | MEDIUM |

---

## 🖼️ IMAGE OPTIMIZATION

### 1. Format Conversion
```bash
# Convert all PNG/JPG to WebP with fallbacks
# Use tool: Squoosh, ImageMagick, or Next.js built-in

# Example:
# Original: logo.png (512KB)
# WebP: logo.webp (89KB) - 83% reduction
# Fallback: logo.png (kept for older browsers)
```

### 2. Responsive Images Implementation
```tsx
// Use Next.js Image component with proper sizing
<Image
  src="/client-logo.svg"
  alt="Client logo"
  width={200}
  height={120}
  sizes="(max-width: 768px) 150px, 200px"
  quality={85}
  priority={false}
  loading="lazy"
/>
```

### 3. Client Logos Optimization
- Current: 3 client logos likely >200KB each
- Target: <50KB each via WebP
- Implement: `<img loading="lazy">` for below-fold images

### 4. Hero Video Optimization
- Bitrate: Reduce to 1.5-2.5 Mbps (from likely 5-10 Mbps)
- Format: MP4 + WebM for cross-browser support
- Delivery: Stream via CDN, not hosted locally
- Auto-play: Muted only, with preload="none"

---

## ⚡ CODE SPLITTING & LAZY LOADING

### 1. Component-Level Code Splitting
```tsx
// lazy.ts - Lazy load heavy components
import dynamic from 'next/dynamic';

export const CaseStudies = dynamic(() => import('@/components/CaseStudies'), {
  loading: () => <div className="h-96 bg-[#0a0a0a] animate-pulse"></div>,
  ssr: true,
});

export const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-96 bg-[#0a0a0a] animate-pulse"></div>,
  ssr: true,
});

// In page.tsx
import { CaseStudies, FAQ } from '@/lib/lazy';
```

### 2. Intersection Observer for Scroll-triggered Loading
```tsx
// Already implemented in components via framer-motion's whileInView
// Ensures animations only run when visible = better performance
```

### 3. JavaScript Deferral

**Critical Path (must load immediately):**
- Hero section
- Navigation
- Client logos (above fold)

**Defer these:**
- FAQ animations
- Case study details
- Testimonial carousels
- Analytics scripts

### 4. CSS Optimization
```css
/* Split critical CSS for above-fold content */
/* Critical: Hero, Nav, Typography */
/* Defer: Animations, hover states, footer styles */
```

---

## 🌐 CDN & CACHING STRATEGY

### 1. Next.js/Vercel Deployment
```
✅ Already using Vercel Analytics & Speed Insights
✅ Automatic CDN edge caching
✅ Automatic image optimization via next/image
```

### 2. Asset Caching Headers (vercel.json)
```json
{
  "headers": [
    {
      "source": "/public/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ]
}
```

### 3. Service Worker Implementation (Optional)
```tsx
// public/sw.js - Offline support + faster loads
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 📦 BUNDLE SIZE REDUCTION

### Current Dependencies (Review)
```json
{
  "framer-motion": "12.38.0",      // 30KB gzipped
  "react-player": "3.4.0",         // 25KB gzipped
  "lucide-react": "1.0.1",         // 8KB per icon used
  "lenis": "1.3.20"                // 15KB gzipped
}
```

### Optimization Actions
1. **Framer Motion**: Already optimal for animations
2. **React Player**: Only import on Work/LaunchVideos pages
   ```tsx
   const ReactPlayer = dynamic(() => import('react-player'), {
     ssr: false,
     loading: () => <div className="aspect-video bg-gray-800"></div>
   });
   ```

3. **Lucide Icons**: Tree-shake unused icons
   ```tsx
   // ✅ Good - specific imports
   import { ChevronDown, Check, TrendingUp } from 'lucide-react';
   
   // ❌ Bad - imports entire library
   import * as Icons from 'lucide-react';
   ```

---

## 🎬 ANIMATION PERFORMANCE

### Framer Motion Optimizations
```tsx
// ✅ Use will-change for animated elements
<motion.div
  animate={{ opacity: 1 }}
  style={{ willChange: 'opacity' }}
>

// ✅ Use GPU-accelerated transforms
<motion.div
  animate={{ x: 100 }}  // Good - uses transform
  style={{ willChange: 'transform' }}
>

// ❌ Avoid
animate={{ left: 100 }}  // Bad - triggers layout shift

// ✅ Reduce animation complexity
initial={{ opacity: 0 }}  // 2 properties
animate={{ opacity: 1 }}

// ❌ Avoid  
initial={{ opacity: 0, x: 50, y: 25, scale: 0.8 }}  // 4+ properties
```

### Marquee Component Fix
The audit noted marquee components causing layout shift. Apply:
```tsx
<motion.div
  style={{
    willChange: 'transform',
    overflow: 'hidden',
    contain: 'layout style paint'  // Prevent layout thrashing
  }}
>
```

---

## 🔍 SEO PERFORMANCE

### 1. Mobile-First Indexing
✅ Mobile viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`
✅ Responsive design: All breakpoints covered
✅ Touch targets: >44px minimum (implemented in forms)

### 2. Page Speed Signals
```
Target: Lighthouse >90 score
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95
```

### 3. Meta Tags (Already Implemented)
✅ Title: Keyword-rich, <60 chars
✅ Description: <155 chars with CTA
✅ Canonical: Present
✅ OG tags: Complete
✅ Twitter tags: Complete

### 4. Structured Data (JSON-LD)
✅ Organization schema: Added
✅ LocalBusiness schema: Added
✅ Product/Service schema: Added
✅ FAQPage schema: Added
✅ BreadcrumbList: Added

---

## 📊 MONITORING & TESTING

### 1. Lighthouse CI
```bash
# Run locally before deploy
npm install -g @lhci/cli@latest
lhci autorun

# Check these thresholds:
# - LCP: <2.5s
# - FID: <100ms
# - CLS: <0.1
```

### 2. WebPageTest Monitoring
- Monthly full-page tests
- 3G throttle baseline
- Compare month-over-month

### 3. Core Web Vitals Dashboard
- Install Chrome DevTools
- Use web.dev measurement API
- Set up alerts for regressions

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Critical (Week 1)
- [ ] Convert all images to WebP format
- [ ] Implement lazy loading on images
- [ ] Add dynamic imports for heavy components
- [ ] Configure CDN caching headers
- [ ] Run first Lighthouse audit

### Phase 2: High Priority (Week 2-3)
- [ ] Optimize hero video bitrate
- [ ] Implement service worker
- [ ] Add structured data (already done)
- [ ] Test mobile performance
- [ ] Set up monitoring

### Phase 3: Medium Priority (Week 4+)
- [ ] A/B test animation complexity
- [ ] Optimize font loading strategy
- [ ] Implement prefetching for likely next pages
- [ ] Monthly performance audits

---

## 📈 EXPECTED RESULTS

After implementation:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | 4-6s | 1.8-2.2s | 60-70% ⬇️ |
| FID | 200-400ms | 50-80ms | 70-80% ⬇️ |
| CLS | >0.15 | <0.05 | 67% ⬇️ |
| Lighthouse | 45-55 | 90+ | 50+ points ⬆️ |
| Conversions | Baseline | +25-40% | 📈 |

---

## 🔗 RESOURCES

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Lighthouse Scoring](https://developers.google.com/web/tools/lighthouse/scoring)
- [Core Web Vitals Guide](https://web.dev/vitals/)

