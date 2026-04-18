import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function Auth() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Qui Sait Tout ?</h1>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          localization={{
            variables: {
              sign_in: { email_label: 'Email', password_label: 'Mot de passe', button_label: 'Connexion' },
              sign_up: { email_label: 'Email', password_label: 'Mot de passe', button_label: 'Créer un compte' },
            },
          }}
        />
      </div>
    </div>
  )
}
