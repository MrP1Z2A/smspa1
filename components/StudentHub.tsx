
import React from 'react';
import { MOCK_STUDENT, MOCK_GRADES, MOCK_ACHIEVEMENTS } from '../constants';
import { Trophy, Mail, Hash, User, MapPin, Award, BookOpen, Clock } from 'lucide-react';

const StudentHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#4ea59d] to-[#3e847e]"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end -mt-12 space-y-4 md:space-y-0 md:space-x-6">
            <img src={MOCK_STUDENT.avatar} className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-white" alt="Student" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900">{MOCK_STUDENT.name}</h2>
              <p className="text-slate-500 font-medium">{MOCK_STUDENT.grade} • Section {MOCK_STUDENT.section}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-sm">
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
              <BookOpen className="w-5 h-5 text-brand" /> Academic Breakdown
            </h3>
            <span className="text-xs text-slate-500 font-medium">Semester 2 Final Results</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Class Avg</th>
                <th className="px-6 py-4">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_GRADES.map(g => (
                <tr key={g.subject} className="hover:bg-brand-light transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{g.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{g.score}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-brand" style={{ width: `${g.score}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{g.average}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black ${
                      g.score >= 90 ? 'bg-brand text-white' : 
                      g.score >= 80 ? 'bg-brand-light text-brand border border-brand/20' : 
                      g.score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {g.score >= 90 ? 'A+' : g.score >= 80 ? 'B' : g.score >= 70 ? 'C' : 'F'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand" /> Attendance Insight
          </h3>
          <div className="flex flex-col items-center justify-center p-4">
             <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={440} strokeDashoffset={440 - (440 * MOCK_STUDENT.attendance) / 100}
                    className="text-brand transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute text-center">
                  <span className="block text-3xl font-bold text-slate-900">{MOCK_STUDENT.attendance}%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Attendance</span>
                </div>
             </div>
             <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
               <div className="bg-brand-light p-2 rounded-lg border border-brand/10">
                 <p className="text-xs text-brand-dark font-medium">Days Present</p>
                 <p className="text-lg font-bold text-brand">178</p>
               </div>
               <div className="bg-slate-50 p-2 rounded-lg">
                 <p className="text-xs text-slate-500 font-medium">Days Absent</p>
                 <p className="text-lg font-bold text-red-500">12</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHub;
