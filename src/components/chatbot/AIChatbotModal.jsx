import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, HelpCircle, ShieldCheck } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function AIChatbotModal() {
  const { isChatbotOpen, setIsChatbotOpen, patient } = useHealth();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${patient.name.split(' ')[0]}! I am MediSafe AI, your 24/7 personal medication safety assistant. How can I assist you with your prescriptions, side effects, or drug combinations today?`,
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isChatbotOpen) return null;

  const suggestedQuestions = [
    'Can I take Ibuprofen with Kidney Disease?',
    'Why is mixing Warfarin and Aspirin dangerous?',
    'How do I read my SHAP Explainability score?',
    'What is a safe alternative to Ibuprofen?'
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('kidney') || lower.includes('ibuprofen')) {
        reply = `⚠️ Great question! For patients with Kidney Disease (or seniors over 65), Ibuprofen and other NSAIDs can be dangerous. They restrict blood flow into the kidney's filtering units (nephrons), which can trigger acute kidney injury. We recommend discussing non-NSAID options like Acetaminophen (Paracetamol) with your doctor!`;
      } else if (lower.includes('warfarin') || lower.includes('aspirin') || lower.includes('bleeding')) {
        reply = `🚨 Caution: Warfarin and Aspirin both thin your blood, but through completely different biological pathways. Taking them together compounds their effect and can cause severe, life-threatening internal or gastrointestinal bleeding. Never combine them unless explicitly prescribed and monitored by a cardiologist!`;
      } else if (lower.includes('shap') || lower.includes('explain')) {
        reply = `✨ MediSafe AI uses SHAP (SHapley Additive exPlanations) so you never get a mysterious black-box risk number. For example, it shows: Age > 65 (+25%), Chronic Kidney Disease (+35%), and High Dosage (+15%). This helps you and your doctor verify the exact clinical reasons behind every safety score.`;
      } else if (lower.includes('alternative') || lower.includes('substitute') || lower.includes('pain')) {
        reply = `💊 Safer alternatives depend on your organ profile. If you have kidney or stomach sensitivities, Acetaminophen (Paracetamol) or localized topical gels (like Diclofenac gel) are often preferred because they spare the renal vasculature and stomach lining. Check our 'Safe Alternatives' tab for detailed comparisons!`;
      } else {
        reply = `Thank you for asking. Based on clinical guidelines and your profile (${patient.age} yrs, ${patient.diseases.join(', ') || 'Healthy'}), MediSafe AI always checks for drug-disease conflicts, multi-drug interactions, and allergy triggers before recommending safe use. Always check with your doctor before altering your medication routine!`;
      }

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg h-[600px] max-h-[90vh] rounded-3xl border border-[#E5DFD1] bg-white shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#E5DFD1] bg-[#F6F4ED] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#235339] text-[#F5F2EA] shadow-xs">
              <Bot className="w-5 h-5 text-[#F5F2EA]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#18231C] flex items-center gap-1.5">
                MediSafe AI Assistant
                <Sparkles className="w-3.5 h-3.5 text-[#235339]" />
              </h3>
              <p className="text-[11px] font-mono text-[#6F7771]">
                24/7 Clinical Prescription Guide
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsChatbotOpen(false)}
            className="p-2 rounded-full text-[#6F7771] hover:text-[#18231C] hover:bg-[#E5DFD1]/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F5]">
          {messages.map((m) => {
            const isAI = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-xl bg-[#E2EFE7] text-[#235339] flex items-center justify-center text-xs shrink-0 mt-0.5 border border-[#235339]/20 font-bold">
                    +
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isAI
                      ? 'bg-white border border-[#E5DFD1] text-[#18231C]'
                      : 'bg-[#235339] text-white font-medium'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[10px] block mt-1 font-mono ${isAI ? 'text-[#8C938D]' : 'text-[#A3C4B2]'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#235339] font-mono">
              <Bot className="w-4 h-4 animate-spin" />
              <span>MediSafe AI is calculating response...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 border-t border-[#E5DFD1] bg-[#F6F4ED] overflow-x-auto">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F7771] font-bold block mb-1.5">
            Quick Clinical Queries:
          </span>
          <div className="flex gap-1.5 whitespace-nowrap pb-1">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-white border border-[#D5CDBF] hover:border-[#235339] hover:bg-[#E2EFE7] text-[11px] font-semibold text-[#18231C] transition shrink-0 shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-[#E5DFD1] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about side effects, pills, or food interactions..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] text-xs focus:border-[#235339] focus:outline-none placeholder:text-[#8C938D]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 rounded-full bg-[#235339] text-white hover:bg-[#1B432E] transition disabled:opacity-40 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <span className="text-[10px] font-mono text-[#8C938D] block text-center mt-1.5">
            Decision support only. Consult a doctor for medical emergencies.
          </span>
        </div>

      </div>
    </div>
  );
}
