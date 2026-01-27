
import React, { useEffect, useState } from 'react';
import { MOCK_STUDENT, MOCK_GRADES, MOCK_EVENTS, MOCK_PAYMENTS } from '../constants';
import { getAcademicInsights } from '../services/geminiService';
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
import { Sparkles, Calendar, TrendingUp, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("Analyzing recent performance...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getAcademicInsights(MOCK_GRADES, MOCK_STUDENT.name);
      setInsight(text);
      setLoading(false);
    };
    fetchInsight();
  }, []);

  const COLORS = ['#4ea59d', '#5fbdb3', '#70d5ca', '#81ece1', '#92f9f8'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Sarah</h1>
          <p className="text-slate-500">Here's an overview of {MOCK_STUDENT.name}'s current progress.</p>
        </div>
        <div className="bg-brand-light border border-brand/10 p-3 rounded-lg flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-bold">
            {MOCK_STUDENT.attendance}%
          </div>
          <div>
            <p className="text-xs font-medium text-brand-dark">Attendance Rate</p>
            <p className="text-xs text-brand/80">Term 2 - High Active</p>
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
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Current Semester</span>
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
            <h3 className="font-bold text-lg">AI Academic Advisor</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 min-h-[160px]">
            {loading ? (
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
            Generate Detailed Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand" />
            Upcoming Notices
          </h3>
          <div className="space-y-4">
            {MOCK_EVENTS.slice(0, 3).map(event => (
              <div key={event.id} className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer text-brand-dark">
                <div className="bg-brand-light text-brand px-3 py-1 rounded text-center shrink-0 border border-brand/10">
                  <span className="block text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="block text-lg font-bold">{new Date(event.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{event.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{event.description}</p>
                </div>
              </div>
            ))}
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
