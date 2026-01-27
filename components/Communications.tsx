
import React from 'react';
import { MOCK_EVENTS, MOCK_ADS } from '../constants';
import { Megaphone, Calendar, Tag, ExternalLink, ChevronRight, Bell } from 'lucide-react';

const Communications: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Featured Advertisements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-brand" /> Announcements & Special Programs
          </h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-brand transition-colors shadow-sm">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-brand transition-colors shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ADS.map(ad => (
            <div key={ad.id} className="group relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md">
              <img src={ad.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={ad.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-brand font-black uppercase tracking-widest mb-2 text-xs">Featured Program</span>
                <h3 className="text-white text-2xl font-bold mb-4">{ad.title}</h3>
                <a href={ad.link} className="flex items-center gap-2 text-white font-semibold text-sm hover:text-brand transition-colors">
                  Learn more <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Timeline */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-brand" /> Event Calendar
          </h2>
          <div className="space-y-4">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="bg-white p-6 rounded-xl border border-slate-200 flex gap-6 hover:shadow-md transition-shadow group">
                <div className="flex flex-col items-center justify-center bg-brand-light border border-brand/10 rounded-xl px-4 py-2 h-fit shrink-0">
                  <span className="text-brand-dark text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-brand text-2xl font-black">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      event.type === 'Holiday' ? 'bg-green-100 text-green-700' :
                      event.type === 'Exam' ? 'bg-red-100 text-red-700' :
                      event.type === 'Meeting' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium">9:00 AM - 11:30 AM</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{event.description}</p>
                </div>
                <button className="self-center p-2 text-slate-300 group-hover:text-brand transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white h-fit shadow-xl shadow-slate-200">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-brand p-2 rounded-lg">
               <Bell className="w-5 h-5 text-white" />
             </div>
             <h2 className="text-lg font-bold">Live Notices</h2>
           </div>
           
           <div className="space-y-6">
              <div className="space-y-2 pb-6 border-b border-slate-800">
                 <p className="text-[10px] text-brand font-bold uppercase">Today, 10:45 AM</p>
                 <h4 className="font-bold text-sm">Bus Route #12 Delay</h4>
                 <p className="text-slate-400 text-xs">Due to construction on Main St, bus #12 will be 20 mins late for drop-off.</p>
              </div>
              <div className="space-y-2 pb-6 border-b border-slate-800">
                 <p className="text-[10px] text-emerald-400 font-bold uppercase">Yesterday</p>
                 <h4 className="font-bold text-sm">Uniform Store Open</h4>
                 <p className="text-slate-400 text-xs">The school uniform shop is now restocked for Summer sizes.</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] text-amber-400 font-bold uppercase">2 Days Ago</p>
                 <h4 className="font-bold text-sm">Security Update</h4>
                 <p className="text-slate-400 text-xs">New visitor badge policy implemented starting Monday.</p>
              </div>
           </div>
           
           <button className="mt-8 w-full py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-sm hover:bg-slate-700 transition-colors border border-slate-700">
             View All History
           </button>
        </div>
      </section>
    </div>
  );
};

export default Communications;
