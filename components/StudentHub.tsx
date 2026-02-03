
import React, { useEffect, useState } from 'react';
import { MOCK_STUDENT, MOCK_ACHIEVEMENTS } from '../constants';
import { syncSmsData, SyncedSmsData } from '../services/smsService';
import { Trophy, Mail, Hash, User, MapPin, Award, BookOpen, Clock, RefreshCw } from 'lucide-react';

const StudentHub: React.FC = () => {
  const [data, setData] = useState<SyncedSmsData | null>(null);
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await syncSmsData(MOCK_STUDENT.id);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setSyncing(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#4ea59d] to-[#3e847e] relative">
          <div className="absolute top-4 right-6">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold">
              {syncing ? 'Syncing...' : `Last Sync: ${data?.lastSync}`}
            </span>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end -mt-12 space-y-4 md:space-y-0 md:space-x-6">
            <img src={MOCK_STUDENT.avatar} className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-white" alt="Student" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900">{MOCK_STUDENT.name}</h2>
              <p className="text-slate-500 font-medium">{MOCK_STUDENT.grade} • Section {MOCK_STUDENT.section}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-sm flex items-center gap-2">
                Download Report Card
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-slate-100 pt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Personal Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><Hash className="w-4 h-4" /> Student ID</span>
                  <span className="font-semibold text-slate-900">{MOCK_STUDENT.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> Student Email</span>
                  <span className="font-semibold text-slate-900 text-sm">alex.j@school.edu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> Home Address</span>
                  <span className="font-semibold text-slate-900 text-sm">Oak Valley, CA</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4" /> Achievements & Honors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_ACHIEVEMENTS.map(ach => (
                  <div key={ach.id} className="bg-brand-light border border-brand/10 p-4 rounded-xl flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Award className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{ach.title}</h4>
                      <p className="text-xs text-slate-500">{ach.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand" /> Synced Report Card
            </h3>
            <span className="text-xs text-slate-500 font-medium">{data?.reportCard.term || 'Loading...'}</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syncing ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold italic">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand" />
                    Syncing data from student portal...
                  </td>
                </tr>
              ) : (
                data?.reportCard.subjects.map((s, idx) => (
                  <tr key={idx} className="hover:bg-brand-light transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{s.score}%</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand" style={{ width: `${s.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        s.score >= 90 ? 'bg-emerald-100 text-emerald-700' : 
                        s.score >= 80 ? 'bg-brand-light text-brand' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 italic max-w-xs">{s.comment}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand" /> Term Summary
          </h3>
          <div className="space-y-6">
            <div className="bg-brand-light/50 p-4 rounded-xl border border-brand/10">
              <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">Term Attendance</p>
              <p className="text-3xl font-black text-slate-900">{data?.reportCard.attendance || '0%'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current GPA</p>
              <p className="text-3xl font-black text-slate-900">{data?.reportCard.gpa || '0.00'}</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-100 flex items-center justify-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Academic Year 2024/25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHub;
