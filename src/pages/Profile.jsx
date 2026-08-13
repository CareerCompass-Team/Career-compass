import { useState } from 'react'
import { Edit2, Save, CheckCircle2, ShieldCheck, User, Mail, MapPin, Briefcase } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import ProgressBar from '../components/ui/ProgressBar'
import ChipInput from '../components/ui/ChipInput'

const FIELDS_FOR_COMPLETION = ['name', 'email', 'location', 'careerGoal', 'bio']

function chipHandlers(updateProfile, profile, key) {
  return {
    values: profile[key] || [],
    onAdd: v => updateProfile({ [key]: [...(profile[key] || []), v] }),
    onRemove: v => updateProfile({ [key]: (profile[key] || []).filter(x => x !== v) }),
  }
}

export default function Profile() {
  const { profile, updateProfile, user } = useAppData()
  const [isEditing, setIsEditing] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Local draft state for editing
  const [form, setForm] = useState({ ...profile })

  const filledCount = FIELDS_FOR_COMPLETION.filter(f => (form[f] || '').trim()).length
  const arrayBonus = [form.targetRoles, form.skills, form.jobTypes, form.preferredLocations]
    .filter(arr => arr && arr.length > 0).length
  const completion = Math.round(((filledCount + arrayBonus) / (FIELDS_FOR_COMPLETION.length + 4)) * 100)

  const handleSave = () => {
    updateProfile(form)
    setIsEditing(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            {user?.role === 'recruiter' ? 'Employer Profile' : 'User Profile'}
            {user?.isVerifiedEmployer && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium flex items-center gap-1">
                <ShieldCheck size={13} /> Verified Employer
              </span>
            )}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {user?.role === 'recruiter'
              ? 'Manage your organization profile and recruiter credentials.'
              : 'Keeps your job matches and applications relevant.'}
          </p>
        </div>

        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-xs px-5 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 press-scale"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              <Save size={14} /> Save Profile Changes
            </button>
          ) : (
            <button
              onClick={() => { setForm({ ...profile }); setIsEditing(true) }}
              className="text-xs px-5 py-2.5 rounded-xl font-semibold border flex items-center gap-2 press-scale transition-all"
              style={{ borderColor: 'var(--border-1)', color: 'var(--text-1)', background: 'var(--bg-card)' }}
            >
              <Edit2 size={14} /> Edit Profile Details
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 mb-6 rounded-xl flex items-center gap-2 text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 animate-fadeIn">
          <CheckCircle2 size={16} /> Profile details saved successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="rounded-2xl p-6 mb-6 border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
        <div className="flex items-center gap-4 mb-6">
          <CompanyAvatar name={user?.name || form.name} size="lg" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>Profile Completion Status</span>
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-text)' }}>{completion}%</span>
            </div>
            <ProgressBar value={completion} color="var(--accent)" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            value={form.name}
            isEditing={isEditing}
            onChange={v => setForm(f => ({ ...f, name: v }))}
            icon={User}
          />
          <TextField
            label="Email Address"
            value={form.email}
            isEditing={isEditing}
            onChange={v => setForm(f => ({ ...f, email: v }))}
            icon={Mail}
          />
          <TextField
            label="Location"
            value={form.location}
            isEditing={isEditing}
            onChange={v => setForm(f => ({ ...f, location: v }))}
            icon={MapPin}
          />
          <TextField
            label={user?.role === 'recruiter' ? 'Hiring Organization' : 'Primary Career Goal'}
            value={user?.role === 'recruiter' ? (user?.companyName || 'Tech Organization') : form.careerGoal}
            isEditing={isEditing}
            onChange={v => setForm(f => ({ ...f, careerGoal: v }))}
            icon={Briefcase}
          />
        </div>

        <div className="mt-4">
          <div className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-4)' }}>Bio & Summary</div>
          {isEditing ? (
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              className="w-full text-sm rounded-xl p-3 outline-none resize-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
            />
          ) : (
            <div className="p-3.5 rounded-xl text-xs leading-relaxed border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-2)' }}>
              {form.bio || 'No bio provided yet. Click Edit Profile to add one.'}
            </div>
          )}
        </div>
      </div>

      {/* Tags & Skills Grids */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <ChipInput label="Target Roles" {...chipHandlers(updateProfile, form, 'targetRoles')} />
        </div>
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <ChipInput label="Skills & Competencies" {...chipHandlers(updateProfile, form, 'skills')} />
        </div>
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <ChipInput label="Job Types" {...chipHandlers(updateProfile, form, 'jobTypes')} />
        </div>
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <ChipInput label="Preferred Locations" {...chipHandlers(updateProfile, form, 'preferredLocations')} />
        </div>
      </div>
    </div>
  )
}

function TextField({ label, value, isEditing, onChange, icon: Icon }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--text-4)' }}>
        {Icon && <Icon size={13} />} {label}
      </label>
      {isEditing ? (
        <input
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full text-sm rounded-xl px-3 py-2.5 outline-none transition-all"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
        />
      ) : (
        <div className="text-sm font-medium px-3 py-2.5 rounded-xl border truncate" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-1)' }}>
          {value || '—'}
        </div>
      )}
    </div>
  )
}

