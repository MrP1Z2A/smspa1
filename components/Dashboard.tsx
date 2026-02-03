
import React, { useEffect, useState } from 'react';
import { MOCK_STUDENT, MOCK_GRADES, MOCK_EVENTS, MOCK_PAYMENTS } from '../constants';
import { getAcademicInsights } from '../services/geminiService';
import { syncSmsData, SyncedSmsData } from '../services/smsService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Sparkles, Calendar, TrendingUp, RefreshCw, CheckCircle2, CreditCard, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("Analyzing recent performance...");
  const [smsData, setSmsData] = useState<SyncedSmsData | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [loadingInsight, setLoadingInsight] = useState(true);

  const fetchAllData = async () => {
    setSyncing(true);
    try {
      const [aiText, syncedData] = await Promise.all([
        getAcademicInsights(MOCK_GRADES, MOCK_STUDENT.name),
        syncSmsData(MOCK_STUDENT.id)
      ]);
      setInsight(aiText);
      setSmsData(syncedData);
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
      setLoadingInsight(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const COLORS = ['#4ea59d', '#5fbdb3', '#70d5ca', '#81ece1', '#92f9f8'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Sarah</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
            <p>Monitoring progress for {MOCK_STUDENT.name}</p>
            {smsData && (
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100">
                <span className={`w-1.5 h-1.5 bg-emerald-500 rounded-full ${syncing ? 'animate-pulse' : ''}`}></span>
                Last Sync: {smsData.lastSync}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={fetchAllData}
          disabled={syncing}
          className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:text-brand transition-all shadow-sm flex items-center gap-2 text-sm font-bold active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin text-brand' : ''}`} />
          {syncing ? 'Syncing...' : 'Refresh Portal'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current GPA</p>
          <p className="text-2xl font-black text-slate-900">{smsData?.reportCard.gpa || '3.85'}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-2">
            <TrendingUp className="w-3 h-3" /> +0.2 from last term
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attendance</p>
          <p className="text-2xl font-black text-slate-900">{MOCK_STUDENT.attendance}%</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-2">
            <CheckCircle2 className="w-3 h-3" /> Excellent standing
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Tasks</p>
          <p className="text-2xl font-black text-slate-900">{smsData?.assignments.filter(a => a.status === 'Pending').length || 0}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-2">
            <Activity className="w-3 h-3" /> 2 due this week
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Rank</p>
          <p className="text-2xl font-black text-slate-900">{smsData?.reportCard.rank || '5 / 120'}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-brand mt-2">
            Top 5% of Grade
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand" />
              Academic Performance
            </h3>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Semester 2 Breakdown</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_GRADES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40}>
                  {MOCK_GRADES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-gradient-to-br from-[#3e847e] to-[#4ea59d] p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-brand-light" />
            <h3 className="font-bold text-lg">AI Performance Insight</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 min-h-[160px]">
            {loadingInsight ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-4 bg-white/20 rounded"></div>
                <div className="h-4 bg-white/20 rounded w-5/6"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed italic">
                "{insight}"
              </p>
            )}
          </div>
          <button className="mt-4 w-full py-2 bg-white text-brand-dark font-semibold rounded-lg text-sm hover:bg-brand-light transition-colors">
            Detailed Sync Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Synced Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand" />
            Live Announcements
          </h3>
          <div className="space-y-4">
            {(smsData?.announcements || []).map((note, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg border-l-4 border-brand">
                <p className="text-xs text-slate-700 font-medium">{note}</p>
              </div>
            ))}
            {!smsData && <div className="animate-pulse h-20 bg-slate-50 rounded-lg"></div>}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand" />
            Recent Fee Status
          </h3>
          <div className="space-y-4">
            {MOCK_PAYMENTS.map(pay => (
              <div key={pay.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">{pay.description}</h4>
                  <p className="text-xs text-slate-500">{pay.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${pay.amount}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    pay.status === 'Paid' ? 'bg-brand-light text-brand' : 
                    pay.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {pay.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
