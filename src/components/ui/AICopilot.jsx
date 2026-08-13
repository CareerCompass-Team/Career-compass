import { useState } from 'react'
import { Bot, X, Send, Sparkles, User, Lightbulb } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

const SUGGESTED_PROMPTS = [
  'How do I tailor my CV for a Frontend role?',
  'What are common Safaricom interview questions?',
  'Help me structure a STAR response for leadership.',
  'How should I negotiate salary for an internship?',
]

export default function AICopilot() {
  const { user } = useAppData()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I am your CareerCompass AI Assistant. How can I help you today?`,
    },
  ])

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg = { sender: 'user', text: query }
    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')

    // Generate intelligent AI response
    setTimeout(() => {
      let reply = "Here is a strategic advice: Make sure your key technical skills and quantitative impacts (e.g. 'improved performance by 40%') are prominent at the top of your resume."

      const lower = query.toLowerCase()
      if (lower.includes('cv') || lower.includes('resume') || lower.includes('ats')) {
        reply = "To pass ATS filters: 1) Match job description keywords directly (e.g. React, TypeScript, Git). 2) Use standard section headings like 'Work Experience' and 'Education'. 3) Avoid embedded graphics or columns in your PDF export."
      } else if (lower.includes('safaricom') || lower.includes('interview')) {
        reply = "For tech & corporate interviews: Focus on the STAR method! Situation (context), Task (your goal), Action (what YOU specifically coded or led), Result (the quantitative outcome, e.g., scaled system to 10k users)."
      } else if (lower.includes('salary') || lower.includes('negotiate')) {
        reply = "When negotiating salary: Research the market rate for Nairobi & Remote roles. Frame your ask around the value & skills you bring, rather than personal financial need. Always express enthusiasm for the role first!"
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 600)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full text-white shadow-xl transition-all duration-200 hover:scale-105 press-scale"
          style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}
        >
          <Sparkles size={18} className="animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wide">Compass AI</span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {open && (
        <div
          className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border animate-scaleIn"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between text-white"
            style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}
          >
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <div className="text-xs font-bold leading-tight">Compass AI Assistant</div>
                <div className="text-[10px] opacity-80">Real-time Career & Interview Coach</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/20">
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ background: 'var(--bg-page)' }}>
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 mt-1" style={{ background: 'var(--accent)' }}>
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'rounded-tr-none text-white'
                      : 'rounded-tl-none border'
                  }`}
                  style={{
                    background: m.sender === 'user' ? 'var(--accent)' : 'var(--bg-card)',
                    borderColor: m.sender === 'user' ? 'transparent' : 'var(--border-1)',
                    color: m.sender === 'user' ? 'white' : 'var(--text-1)',
                  }}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 mt-1 bg-purple-600">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggested Prompts */}
          <div className="p-2 overflow-x-auto flex gap-1.5 shrink-0" style={{ borderTop: '1px solid var(--border-3)', background: 'var(--bg-card)' }}>
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)', border: '1px solid var(--border-2)' }}
              >
                <Lightbulb size={10} /> {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={e => { e.preventDefault(); handleSend() }}
            className="p-3 flex items-center gap-2"
            style={{ borderTop: '1px solid var(--border-3)', background: 'var(--bg-card)' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Compass AI anything..."
              className="flex-1 text-xs px-3 py-2 rounded-xl outline-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
            />
            <button
              type="submit"
              className="p-2 rounded-xl text-white press-scale"
              style={{ background: 'var(--accent)' }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
