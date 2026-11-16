import { useState } from 'react'

// 物件の登録・編集フォーム。property を渡すと編集、渡さなければ新規登録
export default function PropertyForm({ property, onSubmit, onCancel }) {
  const [name, setName] = useState(property?.name ?? '')
  const [rent, setRent] = useState(property?.rent ?? '')
  const [area, setArea] = useState(property?.area ?? '')
  const [layout, setLayout] = useState(property?.layout ?? '')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit({
      name: name.trim(),
      rent: Number(rent),
      area: area.trim(),
      layout: layout.trim(),
    })
    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={submit}>
      <h2>{property ? '物件を編集' : '物件を登録'}</h2>
      <label>
        物件名
        <input value={name} required onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        家賃(円)
        <input type="number" min="0" value={rent} required
          onChange={(e) => setRent(e.target.value)} />
      </label>
      <label>
        エリア名
        <input value={area} required onChange={(e) => setArea(e.target.value)} />
      </label>
      <label>
        間取り(例: 1LDK)
        <input value={layout} required onChange={(e) => setLayout(e.target.value)} />
      </label>
      <div className="form-buttons">
        <button type="submit" disabled={submitting}>
          {property ? '更新する' : '登録する'}
        </button>
        <button type="button" className="secondary" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
