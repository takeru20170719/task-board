// 物件1件分のカード(物件名・家賃・エリア)
export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="rent">{property.rent.toLocaleString()}円 / 月</p>
      <p className="area">{property.area}</p>
    </div>
  )
}
