'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  QrCode, 
  Share2, 
  Plus, 
  ChevronRight,
  MessageCircle,
  X,
  Download,
  Share as ShareIcon,
  Instagram,
  Facebook,
  Globe
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CardData } from '@/lib/company-locations';

export default function DigitalBusinessCardClient({ data }: { data: CardData }) {
  const [mounted, setMounted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const [isWebsiteExpanded, setIsWebsiteExpanded] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddContact = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.name}`,
      `ORG:${data.company}`,
      `TITLE:${data.title}`,
      `TEL;TYPE=CELL:${data.phone}`,
      `EMAIL:${data.email}`,
      `URL:${data.website}`,
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.name} | ${data.company}`,
          text: `Check out ${data.name}'s digital business card.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${data.name.replace(/\s+/g, '_')}_QR.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-['Be_Vietnam_Pro',sans-serif]">
      {/* 1. Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="h-full w-full object-cover saturate-[0.7] brightness-[0.8]"
          poster="/home-hero-bg-lg.png"
        >
          <source src={data.assets.backgroundVideo} type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 z-10" 
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)' }} 
        />
      </div>

      <div className="relative z-10 px-5 py-5 md:py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-md space-y-6"
        >
          {/* 2. Main Profile Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] bg-[#111] shadow-2xl h-[85vh] min-h-[500px] max-h-[700px] sm:max-h-[800px] flex flex-col justify-end border border-white/10"
          >
            {/* Profile Image with Gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={data.assets.profileImage} 
                alt={data.name} 
                className="h-full w-full object-cover object-center"
              />
              <div 
                className="absolute inset-0" 
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} 
              />
            </div>

            {/* Profile Info Overlay (Left aligned at the bottom) */}
            <div className="relative z-10 p-8 flex flex-col items-start w-full text-left">
              <h1 className="text-4xl sm:text-[44px] font-bold leading-tight text-white tracking-tight">
                {data.name}
              </h1>
              <p className="mt-2 text-[17px] text-white/90 font-medium tracking-wide flex items-center gap-2">
                <span>{data.company}</span>
                <span className="text-white/40">|</span>
                <span>{data.title}</span>
              </p>

              {/* Logo implementation matching the uploaded image */}
              <div className="mt-4 mb-6 flex flex-col items-start">
                 <div className="flex items-center gap-0.5 font-bold text-[20px] sm:text-[24px] tracking-[0.05em] sm:tracking-[0.1em] uppercase text-white leading-none">
                   <span>EA</span>
                   <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center -mt-0.5 mx-0.5">
                      <img src={data.assets.logo} className="w-full h-full object-contain filter brightness-0 invert" alt="Logo" />
                   </div>
                   <span>VERSEAS</span>
                 </div>
                 <div className="text-[7px] sm:text-[8px] tracking-[0.15em] mt-1.5 text-white/70 font-medium uppercase">POWERED BY SAAVIK SOLUTION</div>
              </div>
            </div>
          </motion.div>

          {/* 3. Contact Info Section Cards */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/95 backdrop-blur-md rounded-[20px] px-5 pt-5 pb-6 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                  <Phone size={20} />
                </div>
                <span className="text-xl font-semibold text-gray-900">Contact</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-5" />

              {/* Phone */}
              <a href={`tel:${data.phone}`} className="block mb-5 group">
                <p className="text-[15px] font-bold text-gray-900 group-hover:text-black transition-colors">Phone No.</p>
                <p className="text-[14px] text-gray-500 mt-0.5">{data.phone}</p>
              </a>

              {/* Email */}
              <a href={`mailto:${data.email}`} className="block group">
                <p className="text-[15px] font-bold text-gray-900 group-hover:text-black transition-colors">Email</p>
                <p className="text-[14px] text-gray-500 mt-0.5">{data.email}</p>
              </a>
            </motion.div>

            {/* Social Media - Always Expanded */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-[20px] overflow-hidden shadow-xl"
            >


              {/* Always visible social links */}
              <div className="p-2 space-y-1">
                <a 
                  href={data.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 rounded-xl p-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm">
                    <Facebook size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm">Facebook</p>
                    <p className="text-[12px] text-gray-400">Follow us on Facebook</p>
                  </div>
                </a>
                
                <a 
                  href={data.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 rounded-xl p-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-sm">
                    <Instagram size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm">Instagram</p>
                    <p className="text-[12px] text-gray-400">Follow us on Instagram</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* EAOverseas Direct Link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-md rounded-[20px] overflow-hidden shadow-xl"
            >
              <a 
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4 p-4 transition-all hover:bg-gray-50/50 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 overflow-hidden p-2">
                  <img src={data.assets.logo} alt="EAOverseas" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800">{data.company}</p>
                  <p className="text-sm text-gray-500 font-medium">Visit {data.company}</p>
                </div>
              </a>
            </motion.div>
          </div>
          
          <div className="h-28" /> {/* Spacer for bottom actions */}
        </motion.div>
      </div>

      {/* 4. Fixed Floating Action Controls */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-end justify-between px-6 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: '#1f2937' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareModal(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl transition-all border border-white/10"
          >
            <QrCode size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: '#1f2937' }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl transition-all border border-white/10"
          >
            <Share2 size={20} />
          </motion.button>
        </div>
        
        <div className="pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.05, translateY: -2, backgroundColor: '#1f2937' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddContact}
            className="flex items-center gap-3 rounded-full bg-black px-6 py-3 text-white shadow-2xl transition-all border border-white/10"
          >
            <Plus size={20} />
            <span className="font-bold text-base">Add to Contact</span>
          </motion.button>
        </div>
      </div>

      {/* 5. Share Modal Overlay */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-[340px] overflow-hidden flex flex-col shadow-2xl border border-white/10"
            >
              {/* Modal Header - Compact & Darker */}
              <div className="bg-[#111827] p-4 text-center relative">
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="mx-auto w-14 h-14 rounded-full border border-white/20 p-0.5 mb-2 overflow-hidden bg-gray-800">
                  <img 
                    src={data.assets.profileImage} 
                    alt={data.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-white leading-tight">{data.name}</h3>
                <p className="text-[11px] text-white/60 font-medium">{data.title}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-0.5 font-bold">{data.company}</p>
              </div>

              {/* Modal Body - QR View Only */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.15em] mb-4 text-center">Scan to get this digital business card</p>
                
                <div 
                  ref={qrRef}
                  className="bg-white p-4 rounded-3xl shadow-lg border-4 border-gray-50 flex items-center justify-center"
                >
                  <QRCodeSVG 
                    value={typeof window !== 'undefined' ? window.location.href : 'https://saaviksolutions.com'} 
                    size={180}
                    level="H"
                    imageSettings={{
                      src: data.assets.logo,
                      x: undefined,
                      y: undefined,
                      height: 36,
                      width: 36,
                      excavate: true,
                    }}
                  />
                </div>

                <div className="w-full mt-8 space-y-3">
                  <button 
                    onClick={handleAddContact}
                    className="w-full bg-[#111827] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:bg-[#1f2937] transition-all"
                  >
                    <Plus size={20} />
                    Save Contact
                  </button>

                  <div className="flex gap-3">
                    <button 
                      onClick={handleDownloadQR}
                      className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100"
                    >
                      <Download size={18} />
                      Save QR
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100"
                    >
                      <ShareIcon size={18} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
