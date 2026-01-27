
import React, { useState } from 'react';
import { MOCK_PAYMENTS } from '../constants';
import { CreditCard, DollarSign, Download, Clock, AlertTriangle, ShieldCheck, Plus, QrCode, X } from 'lucide-react';

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [showQr, setShowQr] = useState(false);

  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status !== 'Paid');
  const paidPayments = MOCK_PAYMENTS.filter(p => p.status === 'Paid');

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* QR Code Modal Overlay */}
      {showQr && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-scaleIn relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button onClick={() => setShowQr(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-light text-brand rounded-xl mb-4">
                <QrCode className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Scan to Pay</h3>
              <p className="text-sm text-slate-500 mb-8">Scan this QR code using your preferred banking or payment app.</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center mb-8">
                {/* Mock QR Code Image */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EduParentProPayment&color=4ea59d`} 
                    alt="Payment QR Code" 
                    className="w-48 h-48"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm px-2">
                  <span className="text-slate-400 font-medium">Merchant:</span>
                  <span className="text-slate-800 font-bold">Greenwood Academy</span>
                </div>
                <div className="flex items-center justify-between text-sm px-2">
                  <span className="text-slate-400 font-medium">Fee Reference:</span>
                  <span className="text-slate-800 font-bold">INV-8923-90</span>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setShowQr(false)}
                    className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Close & Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Current Balance</p>
          <p className="text-3xl font-black text-slate-900">$165.00</p>
          <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            Next payment due in 4 days
          </div>
        </div>
        <div className="bg-brand p-6 rounded-xl shadow-lg text-white">
          <p className="text-brand-light text-xs font-bold uppercase tracking-wider mb-2">Total Paid (YTD)</p>
          <p className="text-3xl font-black">$4,520.00</p>
          <div className="mt-4 flex items-center gap-2 text-brand-light text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            Account in good standing
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center space-y-3">
          <button className="w-full bg-brand text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
            <Plus className="w-5 h-5" /> Online Payment
          </button>
          <button 
            onClick={() => setShowQr(true)}
            className="w-full bg-white text-brand border-2 border-brand/20 font-bold py-2.5 rounded-lg hover:bg-brand-light transition-all flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" /> Generate Payment QR
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 flex p-1 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white shadow-sm text-brand' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Pending Invoices ({pendingPayments.length})
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-brand' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Payment History
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {(activeTab === 'pending' ? pendingPayments : paidPayments).map(payment => (
              <div key={payment.id} className="group border border-slate-100 rounded-xl p-5 hover:border-brand/30 hover:bg-brand-light transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${payment.status === 'Paid' ? 'bg-brand-light text-brand' : 'bg-amber-100 text-amber-600'}`}>
                  {payment.status === 'Paid' ? <DollarSign className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900">{payment.description}</h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      payment.status === 'Paid' ? 'bg-brand text-white' : 
                      payment.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span>ID: #{payment.id}</span>
                    <span>Issued: {payment.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center">
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900">${payment.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Amount Due</p>
                  </div>
                  {payment.status === 'Paid' ? (
                    <button className="p-3 text-slate-400 hover:text-brand hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">
                      <Download className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowQr(true)}
                      className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-dark transition-all shadow-md"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {(activeTab === 'pending' ? pendingPayments : paidPayments).length === 0 && (
              <div className="text-center py-12">
                <ShieldCheck className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                <h4 className="text-slate-400 font-bold italic">No records to display</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-brand-light border border-brand/10 rounded-xl p-4 flex items-center gap-4">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <ShieldCheck className="w-6 h-6 text-brand" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-brand-dark">Secure Payments</h5>
          <p className="text-xs text-slate-500">All transactions are encrypted with 256-bit SSL security. We do not store your full card details.</p>
        </div>
      </div>
    </div>
  );
};

export default Finance;
