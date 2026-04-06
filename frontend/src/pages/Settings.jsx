import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Bell, Shield, User, Smartphone } from 'lucide-react';
export function Settings() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState({
        bookings: true,
        tickets: true,
        comments: true,
        system: false,
    });
    const toggleNotification = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-white text-primary-600 rounded-lg font-medium shadow-sm border border-slate-200">
            <Bell className="w-5 h-5 mr-3"/> Notifications
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <User className="w-5 h-5 mr-3"/> Profile
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <Shield className="w-5 h-5 mr-3"/> Security
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Notification Preferences
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Choose what you want to be notified about.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">
                    Booking Updates
                  </h3>
                  <p className="text-sm text-slate-500">
                    Approvals, rejections, and cancellations
                  </p>
                </div>
                <button onClick={() => toggleNotification('bookings')} className={`w-11 h-6 rounded-full transition-colors relative ${notifications.bookings ? 'bg-primary-600' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.bookings ? 'translate-x-5' : 'translate-x-0'}`}/>
                </button>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">
                    Ticket Status Changes
                  </h3>
                  <p className="text-sm text-slate-500">
                    When a maintenance ticket is updated
                  </p>
                </div>
                <button onClick={() => toggleNotification('tickets')} className={`w-11 h-6 rounded-full transition-colors relative ${notifications.tickets ? 'bg-primary-600' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.tickets ? 'translate-x-5' : 'translate-x-0'}`}/>
                </button>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">New Comments</h3>
                  <p className="text-sm text-slate-500">
                    When someone comments on your ticket
                  </p>
                </div>
                <button onClick={() => toggleNotification('comments')} className={`w-11 h-6 rounded-full transition-colors relative ${notifications.comments ? 'bg-primary-600' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.comments ? 'translate-x-5' : 'translate-x-0'}`}/>
                </button>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">
                    System Announcements
                  </h3>
                  <p className="text-sm text-slate-500">
                    Platform updates and maintenance notices
                  </p>
                </div>
                <button onClick={() => toggleNotification('system')} className={`w-11 h-6 rounded-full transition-colors relative ${notifications.system ? 'bg-primary-600' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.system ? 'translate-x-5' : 'translate-x-0'}`}/>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center">
              <Smartphone className="w-8 h-8 text-slate-400 mr-4"/>
              <div>
                <h3 className="font-medium text-slate-900">
                  Push Notifications
                </h3>
                <p className="text-sm text-slate-500">
                  Enable push notifications on this device
                </p>
              </div>
              <button className="ml-auto px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
