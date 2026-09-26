import CategoryPage from "../components/CategoryPage"


function SoftDrinks({ onAddToCart }) {

  return (

    <CategoryPage

      title="Soft Drinks"

      subtitle="Cool, refreshing drinks, juices and shakes for every mood."

      categoryFilter={[
        "Cold Drink",
        "Juice",
        "Coffee",
        "Milkshake"
      ]}

      icon="🥤"

      onAddToCart={onAddToCart}

    />

  )

}


export default SoftDrinks