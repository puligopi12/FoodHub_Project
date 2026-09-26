import CategoryPage from "../components/CategoryPage"


function Veg({ onAddToCart }) {

  return (

    <CategoryPage

      title="Veg Foods"

      subtitle="Fresh, delicious vegetarian dishes made for every craving."

      categoryType="Veg"

      icon="🥗"

      onAddToCart={onAddToCart}

    />

  )

}


export default Veg