// 物件1件分のカード(物件名・家賃・エリア・間取り)と編集・削除ボタン
export default function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="rent">{property.rent.toLocaleString()}円 / 月</p>
      <p className="area">{property.area} ・ {property.layout}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(property)}>編集</button>
        <button className="danger" onClick={() => onDelete(property)}>削除</button>
      </div>
    </div>
  )
}
