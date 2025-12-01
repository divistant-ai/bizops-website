'use client';

import { Bell, Calendar, FileText, Info, Radio, Settings, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Button from './ui/Button';

type Notification = {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'info' | 'blog' | 'event' | 'system';
  read: boolean;
  url?: string;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Roadmap Item',
    desc: 'AI Forecasting feature is now in Beta. Try it in the sandbox.',
    time: '2 hours ago',
    type: 'info',
    read: false,
    url: '/roadmap',
  },
  {
    id: '2',
    title: 'Webinar Invitation',
    desc: 'Join us for "Tax Efficiency 2024" tomorrow at 10 AM.',
    time: '5 hours ago',
    type: 'event',
    read: false,
    url: '/events',
  },
  {
    id: '3',
    title: 'System Maintenance',
    desc: 'Scheduled maintenance on Sunday, 02:00 - 04:00 WIB.',
    time: '1 day ago',
    type: 'system',
    read: true,
    url: '/status',
  },
  {
    id: '4',
    title: 'New Blog Post',
    desc: 'Read about the new PPh 21 TER calculation method.',
    time: '2 days ago',
    type: 'blog',
    read: true,
    url: '/blog',
  },
];

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [pushEnabled, setPushEnabled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Check browser permission status safely
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setPushEnabled(true);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEnablePush = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushEnabled(true);
        new Notification('BizOps Notifications Enabled', {
          body: 'You will now receive updates about system status and events.',
          icon: '/vite.svg',
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'blog': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'system': return <Settings className="h-4 w-4 text-slate-500" />;
      default: return <Info className="text-primary-500 h-4 w-4" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-primary-600 relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 animate-pulse rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950"></span>
        )}
      </button>

      {isOpen && (
        <div className="animate-fade-in-up absolute right-0 z-50 mt-2 w-80 origin-top-right transform overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl md:w-96 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-primary-600 hover:text-primary-700 text-xs font-medium">
                Mark all read
              </button>
            )}
          </div>

          {!pushEnabled && (
            <div className="border-b border-blue-100 bg-blue-50 p-3 dark:border-blue-800/30 dark:bg-blue-900/20">
              <div className="flex items-start gap-3">
                <Radio className="mt-0.5 h-4 w-4 text-blue-600" />
                <div className="flex-grow">
                  <p className="mb-1 text-xs font-medium text-blue-800 dark:text-blue-300">Enable Push Notifications</p>
                  <p className="mb-2 text-[10px] text-blue-600 dark:text-blue-400">Get real-time updates on system status & roadmap.</p>
                  <Button size="sm" onClick={handleEnablePush} className="h-7 py-1 text-xs">Allow Access</Button>
                </div>
              </div>
            </div>
          )}

          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No notifications yet.
              </div>
            ) : (
              notifications.map(n => (
                <Link
                  key={n.id}
                  href={n.url || '#'}
                  onClick={() => markAsRead(n.id)}
                  className={`group relative block cursor-pointer border-b border-slate-50 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${!n.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-grow pr-4">
                      <div className="mb-1 flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${!n.read ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                          {n.title}
                        </h4>
                        {!n.read && <div className="bg-primary-500 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></div>}
                      </div>
                      <p className="mb-1 line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400">
                        {n.desc}
                      </p>
                      <span className="block text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>

                  {/* Delete Button (Visible on Hover) */}
                  <button
                    onClick={e => deleteNotification(e, n.id)}
                    className="absolute top-2 right-2 rounded-full p-1 text-slate-300 opacity-0 transition-all group-hover:opacity-100 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700"
                    aria-label="Remove notification"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
