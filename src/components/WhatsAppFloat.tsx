'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const whatsappNumber = '622139702834';
  const defaultMessage = 'Halo BizOps, saya ingin bertanya tentang platform ERP';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  if (isMinimized) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip/Message Bubble (on hover) */}
      {isHovered && (
        <div className="animate-fade-in-up rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-2xl">
          <p className="mb-1 text-sm font-semibold text-slate-900">Butuh Bantuan?</p>
          <p className="text-xs text-slate-600">Chat dengan tim kami via WhatsApp</p>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="relative">
        {/* Close button (small X) */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close WhatsApp button"
        >
          <X className="h-3 w-3" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-all hover:scale-110 hover:bg-green-600 hover:shadow-green-500/50"
          aria-label="Chat via WhatsApp"
        >
          {/* Ping animation */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

          {/* Icon */}
          <MessageCircle className="relative h-8 w-8 transition-transform group-hover:rotate-12" />
        </a>
      </div>
    </div>
  );
}
