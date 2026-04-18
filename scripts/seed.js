/**
 * Script d'import des données JS hardcodées vers Supabase.
 * Usage : SUPABASE_URL=xxx SUPABASE_SERVICE_KEY=xxx node scripts/seed.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Manquant : SUPABASE_URL et SUPABASE_SERVICE_KEY en variables d\'env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

function evalFile(path) {
  const code = readFileSync(join(root, path), 'utf8')
  const match = code.match(/(?:const|var|let)\s+\w+\s*=\s*(\[[\s\S]*?\]);\s*$/)
  if (!match) throw new Error(`Format inattendu dans ${path}`)
  return eval(match[1])
}

async function seedQuestions() {
  console.log('📚 Import des questions...')

  const generalRaw = evalFile('questions.js')
  const kidsRaw = evalFile('questions-kids.js')
  const duoRaw = evalFile('questions-duo.js')

  const generalQuestions = generalRaw.map(q => ({
    q: q.q,
    a: q.a,
    w: q.w,
    category: q.c,
    mode: 'general',
    fun_fact: q.f || null,
  }))

  const kidsQuestions = kidsRaw.map(q => ({
    q: q.q,
    a: q.a,
    w: q.w,
    category: q.c || 'general',
    mode: 'kids',
    fun_fact: q.f || null,
  }))

  const duoQuestions = duoRaw.map(q => ({
    q: q.q,
    a: 'vrai',
    w: ['faux'],
    category: 'duo',
    mode: 'duo',
    fun_fact: null,
  }))

  const allQuestions = [...generalQuestions, ...kidsQuestions, ...duoQuestions]

  const { error } = await supabase.from('questions').insert(allQuestions)
  if (error) {
    console.error('Erreur questions:', error.message)
  } else {
    console.log(`✅ ${allQuestions.length} questions importées (${generalQuestions.length} général, ${kidsQuestions.length} kids, ${duoQuestions.length} duo)`)
  }
}

async function seedChallenges() {
  console.log('💑 Import des défis couple...')

  const raw = evalFile('challenges-couple.js')
  const VALID_TYPES = ['solo', 'duo', 'question']
  const challenges = raw
    .filter(c => c.id && c.intensity && (c.description || c.text))
    .map(c => ({
      id: c.id,
      type: VALID_TYPES.includes(c.type) ? c.type : 'solo',
      intensity: c.intensity,
      category: c.category || 'general',
      emoji: c.emoji || null,
      description: c.description || c.text,
    }))

  const { error } = await supabase.from('challenges').insert(challenges)
  if (error) {
    console.error('Erreur challenges:', error.message)
  } else {
    console.log(`✅ ${challenges.length} défis importés`)
  }
}

async function main() {
  console.log('🚀 Début du seed Supabase...\n')
  await seedQuestions()
  await seedChallenges()
  console.log('\n✨ Seed terminé !')
}

main()
