import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const MODES = ['general', 'kids', 'duo']
const CATEGORIES = ['geo', 'histoire', 'science', 'tech', 'sports', 'cinema', 'musique', 'litterature', 'art', 'geopolitique', 'general', 'duo']

const emptyQuestion = { q: '', a: '', w: ['', '', ''], category: 'geo', mode: 'general', fun_fact: '' }

export default function Admin() {
  const [tab, setTab] = useState('questions')
  const [questions, setQuestions] = useState([])
  const [filterMode, setFilterMode] = useState('general')
  const [form, setForm] = useState(emptyQuestion)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { fetchQuestions() }, [filterMode])

  async function fetchQuestions() {
    const { data } = await supabase.from('questions').select('*').eq('mode', filterMode).order('created_at', { ascending: false })
    setQuestions(data ?? [])
  }

  async function saveQuestion() {
    if (!form.q || !form.a) return
    setSaving(true)
    const payload = { ...form, w: form.w.filter(Boolean) }

    if (editId) {
      await supabase.from('questions').update(payload).eq('id', editId)
    } else {
      await supabase.from('questions').insert(payload)
    }

    setForm(emptyQuestion)
    setEditId(null)
    setSaving(false)
    fetchQuestions()
  }

  async function deleteQuestion(id) {
    if (!confirm('Supprimer cette question ?')) return
    await supabase.from('questions').delete().eq('id', id)
    fetchQuestions()
  }

  function startEdit(q) {
    setForm({ q: q.q, a: q.a, w: [...q.w, '', '', ''].slice(0, 3), category: q.category, mode: q.mode, fun_fact: q.fun_fact ?? '' })
    setEditId(q.id)
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>⚙️ Administration</h1>
        <button className="btn-secondary" onClick={() => navigate('/')}>← Accueil</button>
      </header>

      <div className="admin-tabs">
        <button className={tab === 'questions' ? 'active' : ''} onClick={() => setTab('questions')}>Questions</button>
        <button className={tab === 'challenges' ? 'active' : ''} onClick={() => setTab('challenges')}>Défis couple</button>
      </div>

      {tab === 'questions' && (
        <div className="admin-content">
          <div className="admin-form">
            <h2>{editId ? 'Modifier' : 'Ajouter'} une question</h2>

            <select value={form.mode} onChange={e => setForm(f => ({ ...f, mode: e.target.value }))}>
              {MODES.map(m => <option key={m}>{m}</option>)}
            </select>

            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <textarea
              placeholder="Question"
              value={form.q}
              onChange={e => setForm(f => ({ ...f, q: e.target.value }))}
              rows={2}
            />
            <input
              placeholder="Bonne réponse"
              value={form.a}
              onChange={e => setForm(f => ({ ...f, a: e.target.value }))}
            />
            {form.w.map((w, i) => (
              <input
                key={i}
                placeholder={`Mauvaise réponse ${i + 1}`}
                value={w}
                onChange={e => setForm(f => ({ ...f, w: f.w.map((x, j) => j === i ? e.target.value : x) }))}
              />
            ))}
            <input
              placeholder="Fun fact (optionnel)"
              value={form.fun_fact}
              onChange={e => setForm(f => ({ ...f, fun_fact: e.target.value }))}
            />

            <div className="form-actions">
              <button className="btn-primary" onClick={saveQuestion} disabled={saving}>
                {saving ? '...' : editId ? 'Mettre à jour' : 'Ajouter'}
              </button>
              {editId && (
                <button className="btn-secondary" onClick={() => { setForm(emptyQuestion); setEditId(null) }}>
                  Annuler
                </button>
              )}
            </div>
          </div>

          <div className="admin-list">
            <div className="list-filter">
              {MODES.map(m => (
                <button key={m} className={filterMode === m ? 'active' : ''} onClick={() => setFilterMode(m)}>{m}</button>
              ))}
              <span className="list-count">{questions.length} questions</span>
            </div>

            {questions.map(q => (
              <div key={q.id} className="admin-item">
                <div className="item-content">
                  <p className="item-question">{q.q}</p>
                  <p className="item-answer">✅ {q.a} | ❌ {q.w?.join(', ')}</p>
                  <span className="item-meta">{q.category} · {q.mode}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => startEdit(q)}>✏️</button>
                  <button onClick={() => deleteQuestion(q.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'challenges' && (
        <div className="admin-content">
          <p className="admin-placeholder">Interface de gestion des défis couple — à venir.</p>
        </div>
      )}
    </div>
  )
}
