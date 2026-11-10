import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { contactService } from '../services/contactService';
import { FAQS } from '../utils/mockData';
import Button from '../components/common/Button';
import { validateEmail } from '../utils/helpers';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Please enter your name.');
    if (!validateEmail(formData.email)) return setError('Please enter a valid email.');
    if (!formData.message.trim()) return setError('Please enter your message.');

    setLoading(true);
    try {
      await contactService.submitMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Contact the PawCare Team
        </h1>
        <p className="text-stone-500 text-sm sm:text-base">
          Have questions regarding an adoption application, pet care, or partnering your shelter with our platform? We are here to help!
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-100 shadow-soft space-y-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900">Send Us a Message</h3>
            <p className="text-xs text-stone-500 mt-1">
              All messages are routed directly to our regional shelter response coordinators.
            </p>
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Thank you! Your message has been saved and our team will reply within 24 hours.</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jordan Lee"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Question regarding Cooper's adoption application"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Your Message *</label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can assist you..."
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full py-3.5 font-bold shadow-md shadow-orange-500/20"
            >
              <Send className="w-4 h-4 mr-1.5" />
              <span>Send Message</span>
            </Button>

          </form>
        </div>

        {/* Shelter Info & Operations */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-soft space-y-6">
            <h3 className="text-lg font-bold text-stone-900 border-b pb-3">
              Shelter & Adoption Center
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-800">Main Facility & Rescue Sanctuary</p>
                  <p className="text-stone-500">1204 Shelter Way, Cloud Valley, WA 98052</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-800">Phone Support</p>
                  <p className="text-stone-500">Adoption Line: (800) 555-PAWS (7297)</p>
                  <p className="text-stone-500">Emergency Rescue: (800) 555-9112</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-800">Direct Email</p>
                  <p className="text-stone-500">adoptions@pawcare.org</p>
                  <p className="text-stone-500">shelter-partners@pawcare.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-800">Visiting & Meet Hours</p>
                  <p className="text-stone-500">Tuesday – Friday: 11:00 AM – 6:00 PM</p>
                  <p className="text-stone-500">Saturday – Sunday: 10:00 AM – 5:00 PM</p>
                  <p className="text-xs text-orange-600 font-semibold mt-0.5">Closed Mondays for animal wellness care</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-amber-500 to-orange-500 text-white p-6 rounded-3xl shadow-soft space-y-2">
            <h4 className="font-bold text-base">Shelter Emergencies?</h4>
            <p className="text-xs text-orange-100 leading-relaxed">
              If you have found an injured, lost, or stray companion animal, please contact your local city animal control hotline or 24-hour veterinary emergency hospital immediately.
            </p>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions (Accordion) */}
      <div className="space-y-6 pt-8 border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-100 shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-800 hover:text-orange-600 transition-colors text-sm sm:text-base"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

