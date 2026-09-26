const foods = [

  // =========================
  // VEG
  // =========================

  {
    id: 1,
    name: "Paneer Butter Masala",
    category: "Veg",
    type: "Veg",
    rating: 4.5,
    price: 200,
    deliveryTime: "25-30 mins",
    image: "/images/foods/Paneer-Butter-Masala.jpg",
    description: "Creamy paneer cooked in a rich tomato gravy."
  },

  {
    id: 2,
    name: "Veg Biryani",
    category: "Biryani",
    type: "Veg",
    rating: 4.4,
    price: 180,
    deliveryTime: "25-30 mins",
    image: "/images/foods/Veg-Biryani.jpg",
    description: "Aromatic basmati rice with fresh vegetables."
  },

  {
    id: 3,
    name: "Masala Dosa",
    category: "Dosa",
    type: "Veg",
    rating: 4.6,
    price: 90,
    deliveryTime: "20-25 mins",
    image: "/images/foods/Masala-dosa.jpg",
    description: "Crispy dosa served with potato masala."
  },

  {
    id: 4,
    name: "Idli Sambar",
    category: "Idli",
    type: "Veg",
    rating: 4.4,
    price: 70,
    deliveryTime: "15-20 mins",
    image: "/images/foods/idli-sambar.jpg",
    description: "Soft idlis served with hot sambar and chutney."
  },

  {
    id: 5,
    name: "Veg Momo",
    category: "Momo",
    type: "Veg",
    rating: 4.3,
    price: 130,
    deliveryTime: "20-25 mins",
    image: "/images/foods/Veg-Momo.jpg",
    description: "Steamed momos filled with fresh vegetables."
  },

  {
    id: 6,
    name: "Aloo Paratha",
    category: "Parotta",
    type: "Veg",
    rating: 4.4,
    price: 120,
    deliveryTime: "20-25 mins",
    image: "https://imgs.search.brave.com/xf3_b84sKuaA3-a_UYPfAclU1Fa-Oj9SBc65hQ6V8Ts/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzQ1LzQ2Lzcz/LzM2MF9GXzk0NTQ2/NzM3MV9DcTBBUlls/cDBLeG16bnNJandN/Q1Uwd1ZvUU9ueDZh/Ty5qcGc",
    description: "Indian flatbread stuffed with spicy potato."
  },

  {
    id: 7,
    name: "Paneer Tikka",
    category: "Paneer",
    type: "Veg",
    rating: 4.5,
    price: 220,
    deliveryTime: "25-30 mins",
    image: "https://imgs.search.brave.com/aXnkS9wOGyF_M6uV_IrkRpch4hWLqGMIB2QBqJUhBek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vcGFuZWVyLXRp/a2thLWlzLWluZGlh/bi1jdWlzaW5lLWRp/c2gtd2l0aC1ncmls/bGVkLXBhbmVlci1j/aGVlc2Utd2l0aC12/ZWdldGFibGVzLXNw/aWNlcy1pbmRpYW4t/Zm9vZF83ODEzMjUt/NTUzMy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA",
    description: "Grilled paneer with aromatic Indian spices."
  },

  {
    id: 8,
    name: "Veg Noodles",
    category: "Chinese",
    type: "Veg",
    rating: 4.2,
    price: 150,
    deliveryTime: "20-25 mins",
    image: "https://imgs.search.brave.com/CH0pcLkCp9wT9xigMouyjokxxf_-0BYGULb3z_r8XdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaHdl/dGFpbnRoZWtpdGNo/ZW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzAzL2No/aW5lc2UtdmVnZXRh/YmxlLW5vb2RsZXMu/anBn",
    
    description: "Stir-fried noodles with fresh vegetables."
  },


  // =========================
  // NON VEG
  // =========================

  {
    id: 9,
    name: "Chicken Biryani",
    category: "Biryani",
    type: "Non-Veg",
    rating: 4.5,
    price: 250,
    deliveryTime: "25-30 mins",
    image: "https://imgs.search.brave.com/kN4OTyWhE-opkwRX4fY8O7TClBJeVPdPrfUvH3ZygaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/NDI5Lzc1NC9zbWFs/bC9hLWhvdC1kZWxp/Y2lvdXMtYm93bC1v/Zi1iaXJ5YW5pLXdp/dGgtY2hpY2tlbi1w/aWVjZXMtaXNvbGF0/ZWQtb24tYS10cmFu/c3BhcmVudC1iYWNr/Z3JvdW5kLWJlYXV0/aWZ1bC12aWV3LW9m/LXRyYWRpdGlvbmFs/LXNwaWN5LWluZGlh/bi1mb29kLWlmdGFy/LW1lYWwtcmFtYWRh/bi1kaW5uZXItcG5n/LnBuZw",
    description: "Aromatic basmati rice cooked with tender chicken."
  },

  {
    id: 10,
    name: "Chicken Pizza",
    category: "Pizza",
    type: "Non-Veg",
    rating: 4.4,
    price: 280,
    deliveryTime: "25-30 mins",
    image: "/images/foods/Chicken-Pizza.jpg",
    description: "Cheesy pizza topped with spicy chicken."
  },

  {
    id: 11,
    name: "Chicken Burger",
    category: "Burger",
    type: "Non-Veg",
    rating: 4.4,
    price: 180,
    deliveryTime: "20-25 mins",
    image: "https://imgs.search.brave.com/rhGcCGToDkTEqzkdSR2GH_k0YIAVL-8ojc4k91aUYRQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE3L2Ri/L2ViLzE3ZGJlYjBi/YjBkMTMyOTA2Yzhj/YTM2MTI0YmNhMzNk/LmpwZw",
    description: "Juicy chicken burger with fresh vegetables."
  },

  {
    id: 12,
    name: "Chicken 65",
    category: "Chicken",
    type: "Non-Veg",
    rating: 4.4,
    price: 220,
    deliveryTime: "25-30 mins",
    image: "https://imgs.search.brave.com/7BmWJRUGH7sPFo1fojx5ilEz51WSoXIMKOqRU4W7-2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi82Mjgy/MTM2MC5jbXM_d2lk/dGg9NjMwJmhlaWdo/dD00MjA",
    description: "Crispy spicy chicken tossed with curry leaves."
  },

  {
    id: 13,
    name: "Chicken Momo",
    category: "Non-Veg",
    type: "Non-Veg",
    rating: 4.3,
    price: 160,
    deliveryTime: "20-25 mins",
    image: "/images/foods/Chicken-Momo.jpg",
    description: "Steamed dumplings filled with seasoned chicken."
  },


  // =========================
  // DESSERTS
  // =========================

  {
    id: 14,
    name: "Gulab Jamun",
    category: "Desserts",
    type: "Desserts",
    rating: 4.6,
    price: 100,
    deliveryTime: "10-15 mins",
    image: "https://imgs.search.brave.com/Qb6HgbMWwaq1YC5RmKRvNkIykheik2uf-2zCQDMeyTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZiLzIx/L2U1L2ZiMjFlNTA4/OTg0ZDI2MTI3N2Jl/ZjJiYTM5NGQ2ZjRj/LmpwZw",
    description: "Soft and juicy gulab jamuns served warm."
  },

  {
    id: 15,
    name: "Chocolate Cake",
    category: "Pastry",
    type: "Desserts",
    rating: 4.7,
    price: 350,
    deliveryTime: "15-20 mins",
    image: "https://imgs.search.brave.com/Ru3s4Oquw7cNx2tTbLiodP_EBaHCh221f1fDL5YyBAY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVv/YnJvbWEuaW4vY2Ru/L3Nob3AvZmlsZXMv/RWdnbGVzc1JpY2hD/aG9jb2xhdGVDYWtl/XzQwMHg0MDAuanBn/P3Y9MTc1MDM0MDgz/Ng",
    description: "Rich chocolate cake with creamy frosting."
  },

  {
    id: 16,
    name: "Ice Cream",
    category: "Desserts",
    type: "Desserts",
    rating: 4.5,
    price: 120,
    deliveryTime: "10-15 mins",
    image: "/images/foods/Ice-Cream.jpg",
    description: "Creamy and delicious vanilla ice cream."
  },


  // =========================
  // SOFT DRINKS
  // =========================

  {
    id: 17,
    name: "Fresh Lime Soda",
    category: "Soft Drinks",
    type: "Soft Drink",
    rating: 4.4,
    price: 80,
    deliveryTime: "10-15 mins",
    image: "https://imgs.search.brave.com/6LaLsZdsf7tyKxIV8pN26IhxavslSpDyDIGGNmp5eog/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYw/NTU0MjU4NS9waG90/by9jbG9zZS11cC1v/Zi1kcmluay1pbi1n/bGFzcy1vbi10YWJs/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Mm5NV1BjQXQy/bzduSmd2bC01SkU4/RlZaNmhrMkRIdzZl/aFo5bEJxcmZCOD0",
    description: "Refreshing chilled lime soda."
  },

  {
    id: 18,
    name: "Mango Shake",
    category: "Soft Drinks",
    type: "Soft Drinks",
    rating: 4.5,
    price: 120,
    deliveryTime: "10-15 mins",
    image: "https://imgs.search.brave.com/1OdtJNGs8IyS-dN83AM19ztz-K_NTAQV22R7d_W5gHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTEy/NDYyMzAyL3Bob3Rv/L2ZyZXNoLW1hbmdv/LXNtb290aGllLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz04/ZVJteW9tXzNqU2h1/QllUaWhhWnE1N3dh/ay1jRTdPUUZ2QnZ2/VFRvUXlrPQ",
    description: "Thick and creamy mango shake."
  },

  {
    id: 19,
    name: "Cold Coffee",
    category: "Soft Drinks",
    type: "Soft Drinks",
    rating: 4.5,
    price: 130,
    deliveryTime: "10-15 mins",
    image: "https://imgs.search.brave.com/JR031jMQ2-VaoCciZ2f5e2VGHLfvrH0eAiPLWHb3wi4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTg3/Nzg3OTk2L3Bob3Rv/L2ljZWQtY29mZmVl/LWRyaW5rLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1vWEpl/TC1LR0w1UnNxX1Bo/Yl9TbDVOcUMwVU1R/Y2dWcHlEbVMzTDVX/OEVZPQ",
    description: "Chilled coffee topped with creamy foam."
  },

  {
  id: 20,
  name: "Pepsi",
  category: "Soft Drinks",
  type: "Soft Drinks",
  price: 50,
  rating: 4.4,
  deliveryTime: "10-15 mins",
  image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  description: "Chilled and refreshing Coca Cola."
},

{
  id: 21,
  name: "Classic Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 80,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIeyBAlgBirZDVNtCBiPM6eAvWdoPrfL5gQD1XQHJySKyNIUBgYbm6MiA6OnoVemRyCCftwFRdABwoNgTch5JWO7I3UzRgh0oFUYQbCIh&s=10",
  description: "classic royal Indian dessert made of soft, spongy cottage cheese discs (chenna) soaked in a rich, sweetened, saffron-infused."
},

{
  id: 22,
  name: "Kesar Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 90,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZ8a3_pw4Ru_N_dpA5LJ26Ee42ZeaUsJEGlXlaUrOUQ3PYU_kRg3sMppBCNj0a6cEEYzd1P68GROmPj3xkRci5fIj0IWhXfj0cUEKbRVD&s=10",
  description: " Features an extra amount of saffron for a rich golden color and strong aroma."
},

{
  id: 23,
  name: "Pistachio Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 60,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-1W-qXJywjkf-cK_Q_aWttuHa6i6rSxRLrkURazRGofmqNQsrxO2YmQZgJ8EVYur63vNZfzchey2Z2Hr6JARUhXSPfdpk4sPLJyTmuCL&s=10",
  description: "Emphasizes pistachio flavor with ground nuts in the milk or a heavy topping."
},
{
  id: 24,
  name: "Almond Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 90,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO7p-tHXWpiRj9cwe3XqrAFdErAmKx6HModgzGwviEG4SIxU0w8orDqMKm8pZlLT9sx4H20Qz2TYFYgX5lZGiHyv-ztL3t3aM0ce8CM1RavQ&s=10",
  description: "Uses almond slivers or ground almond-flavored milk."
},
{
  id: 25,
  name: "Rose Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 104,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR10F61J76bBzWMt8MwCIwTzQtptBafEr8EH2B2ZI1_VXqEbC_2s_gPJCa2thFzmmNXEX3V6Y22fBU4-V9d8HRpRq3QOFtMIgu1WrBeYcAF&s=10",
  description: "Infused with rose water and garnished with rose petals."
},
{
  id: 26,
  name: "Mango Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 110,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDL7HxMCq_-geDB-5GxK4PVW5BeOzRCjpVpVWz9i_tRn0vwWwDBa7wkdgleOobszlHFS1Dtgs6g2PU2P8n_M90DOR3D4bWa6WJpo-AciT&s=10",
  description: "Combines a fruity twist by adding fresh mango puree to the sweet milk."
},
{
  id: 27,
  name: "Coconut Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 120,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMOmZd_vlalelcyCwf_ZOxbBEEpqJJRUeBiE190FN9kUfICn-bEB-37pZVSr_GRGtXZ8I9sI9izvJUWFa4rDnCiPYel8qHkx-FDQi71yYd&s=10",

  description: " Incorporates grated coconut or coconut milk for a distinct tropical profile."
},
{
  id: 28,
  name: "Pakki Rasmalai",
  category: "Desserts",
  type: "Desserts",
  rating: 4.4,
  price: 130,
  deliveryTime: "10-15 mins",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3XtkrhYUbS8pg2NirLryKWTfYefvXFgHNY-Q2PBN_KbXxssglbOwG2b3rpH75W7cQtGei-RNPvjnUEM-85560EECSimFkFwZuoYCTzX2&s=10",

  description: "Regional variations that alter how the chhena balls or milk bases are boiled and thickened."
},

{
  id: 29,
  name: "Coca Cola",
  category: "Soft Drinks",
  type: "Soft Drinks",
  rating: 4.4,
  price: 50,
  deliveryTime: "10-15 mins",
  image: "/images/foods/Coca-Cola.jpg",
  description: "Regional variations that alter how the chhena balls or milk bases are boiled and thickened."
}
];

export default foods;