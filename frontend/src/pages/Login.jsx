import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Building2, Eye, EyeOff, LogIn, AlertCircle, Loader2, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Login() {
    const { loginWithCredentials, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showGoogleRolePicker, setShowGoogleRolePicker] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }
        setIsLoading(true);
        const result = await loginWithCredentials(username, password);
        setIsLoading(false);
        if (result.success) {
            navigate(from, {
                replace: true,
            });
        }
        else {
            setError(result.error || 'Login failed.');
        }
    };
    const handleGoogleLogin = (role) => {
      loginWithGoogle(role);
        navigate(from, {
            replace: true,
        });
    };
    return (<div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{
            opacity: 0,
            y: -20,
        }} animate={{
            opacity: 1,
            y: 0,
        }} className="flex justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Building2 className="w-8 h-8 text-white"/>
          </div>
        </motion.div>
        <motion.h2 initial={{
            opacity: 0,
        }} animate={{
            opacity: 1,
        }} transition={{
            delay: 0.1,
        }} className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          UniOps Platform
        </motion.h2>
        <motion.p initial={{
            opacity: 0,
        }} animate={{
            opacity: 1,
        }} transition={{
            delay: 0.2,
        }} className="mt-2 text-center text-sm text-slate-600">
          Sign in to manage facilities, bookings, and maintenance.
        </motion.p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{
            opacity: 0,
            y: 20,
        }} animate={{
            opacity: 1,
            y: 0,
        }} transition={{
            delay: 0.3,
        }} className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          {/* Username / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <input id="username" type="text" autoComplete="username" value={username} onChange={(e) => {
            setUsername(e.target.value);
            setError('');
        }} placeholder="Enter your username" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"/>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => {
            setPassword(e.target.value);
            setError('');
        }} placeholder="Enter your password" className="w-full px-4 py-2.5 pr-11 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? (<EyeOff className="w-4 h-4"/>) : (<Eye className="w-4 h-4"/>)}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (<motion.div initial={{
                opacity: 0,
                y: -8,
            }} animate={{
                opacity: 1,
                y: 0,
            }} exit={{
                opacity: 0,
                y: -8,
            }} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0"/>
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>)}
            </AnimatePresence>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-2.5 px-4 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm">
              {isLoading ? (<Loader2 className="w-4 h-4 animate-spin mr-2"/>) : (<LogIn className="w-4 h-4 mr-2"/>)}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"/>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign-In */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {!showGoogleRolePicker ? (<motion.button key="google-btn" initial={{
                opacity: 1,
            }} exit={{
                opacity: 0,
                height: 0,
            }} onClick={() => setShowGoogleRolePicker(true)} className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </motion.button>) : (<motion.div key="role-picker" initial={{
                opacity: 0,
                y: 10,
            }} animate={{
                opacity: 1,
                y: 0,
            }} exit={{
                opacity: 0,
            }} className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 text-center mb-3">
                    Select your Google account role (Demo)
                  </p>
                  {[
                {
                    role: 'USER',
                    label: 'Student / Staff',
                    desc: 'alice@university.edu',
                },
                {
                    role: 'ADMIN',
                    label: 'Administrator',
                    desc: 'admin@university.edu',
                },
                {
                    role: 'TECHNICIAN',
                    label: 'Technician',
                    desc: 'tech@university.edu',
                },
            ].map((option) => (<button key={option.role} onClick={() => handleGoogleLogin(option.role)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-left group">
                      <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {option.desc}
                        </p>
                      </div>
                    </button>))}
                  <button onClick={() => setShowGoogleRolePicker(false)} className="w-full text-xs text-slate-400 hover:text-slate-600 mt-2 py-1 transition-colors">
                    Cancel
                  </button>
                </motion.div>)}
            </AnimatePresence>
          </div>

          {/* Demo Credentials Hint */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Demo Credentials
            </p>
            <div className="space-y-2">
              {[
            {
                label: 'Student',
                user: 'alice',
                pass: 'student123',
            },
            {
                label: 'Admin',
                user: 'bob',
                pass: 'admin123',
            },
            {
                label: 'Technician',
                user: 'charlie',
                pass: 'tech123',
            },
        ].map((cred) => (<button key={cred.user} type="button" onClick={() => {
                setUsername(cred.user);
                setPassword(cred.pass);
                setError('');
            }} className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg text-left hover:border-primary-300 hover:bg-primary-50/50 transition-all group">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-primary-700">
                      {cred.label}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {cred.user} / {cred.pass}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 group-hover:text-primary-500 transition-colors">
                    FILL
                  </span>
                </button>))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>);
}
