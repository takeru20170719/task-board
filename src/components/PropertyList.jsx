import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  fetchProperties, createProperty, updateProperty, deleteProperty,
} from '../lib/properties'
import { useAuth } from './AuthProvider'
import PropertyCard from './PropertyCard'
import PropertyForm from './PropertyForm'

// 物件一覧画面(ログイン後のトップ)
export default function PropertyList() {
  const { session } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // フォーム状態: null=非表示 / 'new'=新規登録 / 物件オブジェクト=編集
  const [formTarget, setFormTarget] = useState(null)

  // 一覧を再取得する
  const loadProperties = async () => {
    try {
      setProperties(await fetchProperties())
      setError('')
    } catch (e) {
      setError('物件の取得に失敗しました: ' + e.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProperties()
  }, [])

  // 登録・更新の共通処理
  const saveProperty = async (values) => {
    try {
      if (formTarget === 'new') await createProperty(values)
      else await updateProperty(formTarget.id, values)
      setFormTarget(null)
      await loadProperties()
    } catch (e) {
      setError('保存に失敗しました: ' + e.message)
    }
  }

  // 削除(確認ダイアログあり)
  const removeProperty = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか?`)) return
    try {
      await deleteProperty(property.id)
      await loadProperties()
    } catch (e) {
      setError('削除に失敗しました: ' + e.message)
    }
  }

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

      {error && <p className="error-message">{error}</p>}

      {formTarget ? (
        <PropertyForm
          // 対象が変わったらフォームの入力値を初期化する
          key={formTarget === 'new' ? 'new' : formTarget.id}
          property={formTarget === 'new' ? null : formTarget}
          onSubmit={saveProperty}
          onCancel={() => setFormTarget(null)}
        />
      ) : (
        <button className="add-button" onClick={() => setFormTarget('new')}>
          ＋ 物件を登録
        </button>
      )}

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty">登録された物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p}
              onEdit={setFormTarget} onDelete={removeProperty} />
          ))}
        </div>
      )}
    </div>
  )
}
