import { Link, useLocation } from 'react-router-dom'
import './Breadcrumb.css'

function Breadcrumb() {

  const location = useLocation()

  const path = location.pathname

  const pageNames = {
    '/': 'Home',
    '/veg': 'Veg',
    '/non-veg': 'Non-Veg',
    '/desserts': 'Desserts',
    '/soft-drinks': 'Soft Drinks',
    '/search': 'Search',
    '/cart': 'Cart',
    '/login': 'Login'
  }

  const currentPage = pageNames[path] || 'Page'

  if (path === '/') {
    return null
  }

  return (

    <div className="breadcrumb-container">

      <div className="breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>
          ›
        </span>

        <strong>
          {currentPage}
        </strong>

      </div>

    </div>

  )
}

export default Breadcrumb