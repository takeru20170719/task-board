import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import AuthForm from './components/AuthForm'
import PropertyList from './components/PropertyList'

// ルーティング定義(GitHub Pagesでリロードしても動くよう HashRouter を使用)
export default function RealEstateApp() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />
          <Route path="/" element={<ProtectedRoute><PropertyList /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
