import CategoryPage from "../components/CategoryPage"


function NonVeg({ onAddToCart }) {

  return (

    <CategoryPage

      title="Non-Veg Foods"

      subtitle="Juicy chicken, flavorful biryani and delicious non-veg favorites."

      categoryType="Non-Veg"

      icon="🍗"

      onAddToCart={onAddToCart}

    />

  )

}


export default NonVeg