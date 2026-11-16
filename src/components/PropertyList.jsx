import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'
import { PROPERTIES } from '../lib/properties'
import PropertyCard from './PropertyCard'

// 物件一覧画面(ログイン後のトップ)
export default function PropertyList() {
  const { session } = useAuth()

  // ログアウト後は ProtectedRoute がログイン画面へ遷移させる
  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="property-page">
      <header className="page-header">
        <h1>物件一覧</h1>
        <div className="user-area">
          <span>{session?.user.email}</span>
          <button onClick={logout}>ログアウト</button>
        </div>
      </header>
      <div className="property-grid">
        {PROPERTIES.map((p) => <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  )
}
