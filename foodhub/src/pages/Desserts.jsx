import foods from '../data/foods'
import FoodCard from '../components/FoodCard'
import './Category.css'

function Desserts({onAddToCart}) {

  const dessertFoods = foods.filter(
    (food) => food.category === "Desserts"
  )

  return (
    <div className="category-page">

      <h1>Desserts 🍰</h1>

      <div className="food-container">

        {dessertFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onAddToCart={onAddToCart}
          />
        ))}

      </div>

    </div>
  )
}

export default Desserts