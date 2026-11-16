import { supabase } from './supabase'

// propertiesテーブルのCRUD操作。
// 「自分の物件のみ」の絞り込みはSupabase側のRLSポリシーが行う。

// 一覧取得(新しい順)
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// 新規登録(user_id はDBのデフォルト値で自動設定される)
export async function createProperty(values) {
  const { error } = await supabase.from('properties').insert(values)
  if (error) throw error
}

// 更新
export async function updateProperty(id, values) {
  const { error } = await supabase.from('properties').update(values).eq('id', id)
  if (error) throw error
}

// 削除
export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw error
}
