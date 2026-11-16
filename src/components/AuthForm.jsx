import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'

// ログイン・会員登録で共通のフォーム(mode: 'login' | 'signup')
export default function AuthForm({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()
  const { session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // ログイン済みなら物件一覧へ
  if (session) return <Navigate to="/" replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('メールアドレスまたはパスワードが正しくありません')
      else navigate('/', { replace: true })
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else if (data.session) navigate('/', { replace: true })
      // メール確認が有効な場合はセッションが作られないため案内を表示
      else setMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
    }
    setSubmitting(false)
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={submit}>
        <h1>{isLogin ? 'ログイン' : '会員登録'}</h1>
        <label>
          メールアドレス
          <input type="email" value={email} required autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          パスワード{!isLogin && '(6文字以上)'}
          <input type="password" value={password} required minLength={6}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        {message && <p className="info">{message}</p>}
        <button type="submit" disabled={submitting}>
          {isLogin ? 'ログイン' : '登録する'}
        </button>
        <p className="switch">
          {isLogin
            ? <>アカウントをお持ちでない方は <Link to="/signup">会員登録</Link></>
            : <>すでに登録済みの方は <Link to="/login">ログイン</Link></>}
        </p>
      </form>
    </div>
  )
}
