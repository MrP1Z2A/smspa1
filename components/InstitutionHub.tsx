
import React from 'react';
import { School, MapPin, Phone, Globe, MessageSquare, Share2, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const InstitutionHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <img src="https://picsum.photos/seed/school/800/300" className="w-full h-48 object-cover" alt="School Campus" />
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-brand p-3 rounded-xl text-white">
                <School className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Greenwood International Academy</h2>
                <p className="text-slate-500 flex items-center gap-1"><MapPin className="w-4 h-4" /> 123 Education Way, Academic Valley</p>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Greenwood International is a premier educational institution dedicated to fostering intellectual curiosity and personal growth. Founded in 1995, we offer a comprehensive K-12 curriculum that combines academic excellence with creative exploration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-brand-light border border-brand/5 rounded-lg">
                <Phone className="w-5 h-5 text-brand" />
                <div>
                  <p className="text-xs text-brand-dark font-medium">Main Office</p>
                  <p className="text-sm font-bold text-slate-900">+1 (555) 012-3456</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-brand-light border border-brand/5 rounded-lg">
                <Globe className="w-5 h-5 text-brand" />
                <div>
                  <p className="text-xs text-brand-dark font-medium">Website</p>
                  <p className="text-sm font-bold text-slate-900">www.greenwoodintl.edu</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-slate-400" /> Follow Our Community
              </h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-brand hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-brand hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-brand hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-slate-100 text-slate-600 rounded-full hover:bg-brand hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact School */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-brand" />
              Contact Administration
            </h2>
            <p className="text-slate-500 mt-1">Have questions? Send a direct message to the school office.</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Department</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-all">
                  <option>Academic Affairs</option>
                  <option>Finance/Billing</option>
                  <option>Sports & Activities</option>
                  <option>Admissions</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Priority</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-all">
                  <option>Normal</option>
                  <option>Urgent</option>
                  <option>Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Subject</label>
              <input type="text" placeholder="Summary of your inquiry" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Message</label>
              <textarea rows={6} placeholder="How can we help you today?" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-all resize-none"></textarea>
            </div>

            <button type="button" className="w-full bg-brand text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstitutionHub;
