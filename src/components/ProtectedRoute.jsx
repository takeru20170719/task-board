import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

// 未ログインならログイン画面へリダイレクトする
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <p className="loading">読み込み中...</p>
  if (!session) return <Navigate to="/login" replace />
  return children
}
