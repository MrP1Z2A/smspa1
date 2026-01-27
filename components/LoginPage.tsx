
import React, { useState } from 'react';
import { Mail, ShieldCheck, BookOpen, Fingerprint, AlertCircle, Info } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call with specific credential validation
    setTimeout(() => {
      if (email.toLowerCase() === 'parent@gmail.com' && studentId.toUpperCase() === 'EDU-2026-001') {
        setLoading(false);
        onLogin();
      } else {
        setLoading(false);
        setError('Invalid credentials. Please check the email and Student ID.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden font-inter">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-brand/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full z-10 animate-scaleIn">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand rounded-3xl shadow-xl mb-6 text-white transform hover:rotate-3 transition-transform">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">EduParent Pro</h1>
          <p className="text-slate-500 mt-2 font-medium">Your child's academic journey, simplified.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-800">Parental Sign In</h2>
            <p className="text-sm text-slate-400 mt-1">Access the secure institution portal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Parent Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white transition-all placeholder:text-slate-300"
                  placeholder="parent@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Student ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Fingerprint className="h-5 w-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white transition-all placeholder:text-slate-300"
                  placeholder="EDU-2026-001"
                />
              </div>
            </div>

            <div className="bg-brand-light/50 rounded-2xl p-4 flex gap-3 items-start border border-brand/10">
              <Info className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div className="text-[11px] text-brand-dark leading-relaxed">
                <span className="font-bold">Demo:</span> 
                <span className="ml-1">Email: <b className="select-all">parent@gmail.com</b></span><br/>
                <span className="ml-5">ID: <b className="select-all">EDU-2026-001</b></span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-white font-black py-4 rounded-2xl shadow-xl shadow-brand/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Secure Parental Gateway v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
