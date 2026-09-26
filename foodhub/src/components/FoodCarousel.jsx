import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './FoodCarousel.css'


function FoodCarousel() {

  const carouselRef = useRef(null);

  // =====================================================
  // AUTO SCROLL 
  // =====================================================

useEffect(() => {
  const carousel = carouselRef.current;

  if (!carousel) return;

  let animationFrame;
  let lastTime = 0;

  const speed = 0.05; // lower = slower, higher = faster

  const autoScroll = (time) => {
    if (!lastTime) {
      lastTime = time;
    }

    const delta = time - lastTime;
    lastTime = time;

    carousel.scrollLeft += speed * delta;

    // When reaching the end, start again
    if (
      carousel.scrollLeft >=
      carousel.scrollWidth - carousel.clientWidth
    ) {
      carousel.scrollLeft = 0;
    }

    animationFrame = requestAnimationFrame(autoScroll);
  };

  animationFrame = requestAnimationFrame(autoScroll);

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}, []);

  // =====================================================
  // FOOD CATEGORIES
  // Each category has its OWN real image.
  // =====================================================

  const categories = [

    {
      id: 1,
      name: 'Biryani',
      search: 'biryani',
      image:
        'https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2023/07/g508ec0440_1688174203.jpg?size=*:*'
    },

    {
      id: 2,
      name: 'Pizza',
      search: 'pizza',
      image:
        'https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_1280.png'
    },

    {
      id: 3,
      name: 'Burger',
      search: 'burger',
      image:
        'https://media.easy-peasy.ai/56c597a2-f0f0-4037-93f0-340baefb68cd/c37e06e0-6289-4bb1-b9dc-7ac49fbd9278_thumb.webp'
    },

    {
      id: 4,
      name: 'Cake',
      search: 'cake',
      image:
        'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg'
    },

    {
      id: 5,
      name: 'Chinese',
      search: 'chinese',
      image:
        'https://ecdn6.globalso.com/upload/p/1374/image_product/2024-05/traditional-chinese-special-food-hand-rolled-noodles6.jpg'
    },

    {
      id: 6,
      name: 'Dosa',
      search: 'dosa',
      image:
        'https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/plain_dosa_with_chutney.jpg'
    },

    {
      id: 7,
      name: 'Momo',
      search: 'momo',
      image:
        'https://static.takeaway.com/images/chains/ch/mr_tenzin/products/momosinssssauersaucerindvegichickengemischt.png'
    },

    {
      id: 8,
      name: 'Pasta',
      search: 'pasta',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v0jXozXDrZ9PCQkDq21xa1rtc-wbSptEW6wXSUf2fg&s=10'
      },

    {
      id: 9,
      name: 'Idli',
      search: 'idli',
      image:
        'https://cdn.pixabay.com/photo/2014/06/18/16/32/idli-371417_640.jpg'
    },

    {
      id: 10,
      name: 'Desserts',
      search: 'desserts',
      image:
        'https://chefadora-production.s3.ap-southeast-2.amazonaws.com/003f0f0351967a7cb6212a8d9bfaf889_f956154e73.jpg'
    },

    {
      id: 11,
      name: 'Parotta',
      search: 'parotta',
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/RX_THUMBNAIL/IMAGES/VENDOR/2025/9/6/768bcb72-d076-4309-9ba3-eac34b6459f4_1195009%20%282%29.jpg'
    },

    {
      id: 12,
      name: 'Shawarma',
      search: 'shawarma',
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2025/7/11/bdedd503-7f9e-48b2-8613-d67cb914d57f_1120765.jpg'
    },

    {
      id: 13,
      name: 'Paratha',
      search: 'paratha',
      image:
        'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/FOOD_CATALOG/IMAGES/CMS/2025/7/28/ba78cdd7-fe93-4d4e-8599-5f391c0b7249_57a741d5-af88-4f3b-b6f5-03134157b7ed.jpg'
    },

    {
      id: 14,
      name: 'Rasmalai',
      search: 'rasmalai',
      image:
        'https://ik.imagekit.io/3u72arpq9/product-image/2127_1738838449_Rasmalai.jpg?tr=w-500%2Ch-500'
    },

    {
      id: 15,
      name: 'Pastry',
      search: 'pastry',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZPswDaZ4iDScuGRPiBA67Mq2Rt1rqOHG2jlZywwPcQ&s=10'
      },

    {
      id: 16,
      name: 'Noodles',
      search: 'noodles',
      image:
        'https://ecdn6.globalso.com/upload/p/1374/image_product/2024-05/traditional-chinese-special-food-hand-rolled-noodles6.jpg'
    }

  ]


  // =====================================================
  // SCROLL LEFT
  // =====================================================

  const scrollLeft = () => {

    if (!carouselRef.current) return

    carouselRef.current.scrollBy({
      left: -800,
      behavior: 'smooth'
    })

  }


  // =====================================================
  // SCROLL RIGHT
  // =====================================================

  const scrollRight = () => {

    if (!carouselRef.current) return

    carouselRef.current.scrollBy({
      left: 800,
      behavior: 'smooth'
    })

  }


  return (

    <section className="food-carousel-section">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="food-carousel-header">

        <div>

          <span className="food-carousel-label">
            FOOD DISCOVERY
          </span>

          <h2>
            What are you craving?
          </h2>

          <p>
            Explore popular food choices
          </p>

        </div>


        {/* =================================================
            ARROW BUTTONS
        ================================================= */}

        <div className="carousel-arrows">

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous foods"
          >
            ←
          </button>


          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next foods"
          >
            →
          </button>

        </div>

      </div>



      {/* =================================================
          FOOD ITEMS
      ================================================= */}

      <div
        className="food-carousel"
        ref={carouselRef}
      >

        {categories.map((category) => (

          <Link
            key={category.id}
            to={`/search?type=${encodeURIComponent(category.search)}`}
            className="food-category-item"
          >

            <div className="food-category-image">

              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                onError={(event) => {

                  event.currentTarget.style.display = 'none'

                  event.currentTarget.parentElement.classList.add(
                    'image-error'
                  )

                }}
              />

            </div>


            <h3>
              {category.name}
            </h3>

          </Link>

        ))}

      </div>


    </section>

  )

}


export default FoodCarousel