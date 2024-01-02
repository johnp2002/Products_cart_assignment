'use client'
import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import Cookies from 'js-cookie';
import { useRouter} from 'next/navigation'


const HomePage = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart,setCart] = useState({});  
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const router = useRouter();
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setOriginalProducts(data.products);
      setDisplayedProducts(data.products);
      console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const id = Cookies.get('id');
      const response = await fetch(`https://dummyjson.com/carts/${id}`);
      const data = await response.json();
      console.log(data);
      setCart(data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    
    fetchProducts();
    fetchCart();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    applyFilters(event.target.value, minPrice, maxPrice);
  };

  const handleFilter = () => {
    applyFilters(searchQuery, minPrice, maxPrice);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setDisplayedProducts(originalProducts);
  };

  const applyFilters = (search, min, max) => {
    const filteredProducts = originalProducts.filter((product) => {
      const nameMatches = product.title && product.title.toLowerCase().includes(search.toLowerCase());
      const priceInRange =
        (min === '' || parseFloat(product.price) >= parseFloat(min)) &&
        (max === '' || parseFloat(product.price) <= parseFloat(max));

      return nameMatches && priceInRange;
    });

    setDisplayedProducts(filteredProducts);
  };
  const handleLogout = () => {
    
    Cookies.remove('token', { path: '/' });
    Cookies.remove('token', { path: '/home' });
    Cookies.remove('id', { path: '/' });
    Cookies.remove('id', { path: '/home' });
    setTimeout(()=>{
        router.back();
    },1000);

  };
  const addtoCart = (data)=>{
    console.log(data)
    setCart({
        ...cart,products:[
            ...cart.products,data
        ]
    })
  }

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <div>
      <nav className='flex bg-blue-500 p-4 items-center justify-between sticky top-0 z-10'>
        <div>

        <h1 className='text-white text-lg font-semibold'>Home Page  </h1>
        <button className='bg-red-500 px-2 rounded-md text-white mt-2' onClick={handleLogout}>LogOut</button>
        </div>


        <div className='flex space-x-2'>
          <input
            className='border p-2 rounded'
            type='text'
            placeholder='Search by name'
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className='bg-white text-blue-500 px-4 py-2 rounded' onClick={handleFilter}>
            Search
          </button>
        </div>


        <div className='flex space-x-2'>
          <input
            className='border p-2 rounded'
            type='number'
            placeholder='Min Price'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            className='border p-2 rounded'
            type='number'
            placeholder='Max Price'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button className='bg-white text-blue-500 px-4 py-2 rounded' onClick={handleFilter}>
            Apply Filters
          </button>
          <button
            className='bg-white text-blue-500 px-4 py-2 rounded'
            onClick={handleClearFilter}
          >
            Clear Filter
          </button>
        </div>
        <div>
            <button className='bg-yellow-400 p-2 rounded-md' onClick={()=>{openCartModal(); console.log(cart)}}>

          Cart  Quantity : {cart.totalQuantity}
            </button>
        </div>
      </nav>
     {/* Cart Modal */}
     {isCartModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
          <div className='bg-white p-4 rounded'>
            <h2 className='text-lg font-semibold mb-4'>Cart</h2>
            {/* Display cart items here */}
            <div>
              {cart.products.length > 0 ? (
                <div className='max-h-96 overflow-y-scroll'>

               { cart.products.map((product) => (
                  <div key={product.id} className='bg-slate-300 mb-2 p-2 rounded-md'>
                    <p>{product.title}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                ))}
                </div>
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
            <p>Total Quantity: {cart.totalQuantity}</p>
            <p>Total Price: ${cart.total.toFixed(2)}</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={closeCartModal}>
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className='space-x-4 p-4'>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} data={product} addCart={addtoCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

// // pages/index.js
// import { useState, useEffect } from 'react';
// import ProductCard from '@/app/components/ProductCard';
// import Cookies from 'js-cookie';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const fetchProducts = async () => {
//     try {
        
//       const response = await fetch('https://dummyjson.com/products');
//       const data = await response.json();
//       setProducts(data.products);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };
//   const fetchCart = async () => {
//     try {
//         const id = Cookies.get('id');
//       const response = await fetch(`https://dummyjson.com/carts/${id}`);
//       const data = await response.json();
      
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };
//   useEffect(() => {
//     // Fetch products when the component mounts
//     fetchProducts();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilter = () => {
//     // Apply filter based on searchQuery, minPrice, and maxPrice
//     const filteredProducts = products.filter((product) => {
//       const nameMatches =
//         product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const priceInRange =
//         (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
//         (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice));

//       return nameMatches && priceInRange;
//     });

//     setProducts(filteredProducts);
//   };

//   const handleClearFilter = () => {
//     // Reset searchQuery, minPrice, maxPrice, and fetch all products again
//     setSearchQuery('');
//     setMinPrice('');
//     setMaxPrice('');
//     fetchProducts();
//   };

//   return (
//     <div>
//       <nav className='flex bg-blue-500 p-4 items-center justify-between'>
//         <h1 className='text-white text-lg font-semibold'>Home Page</h1>

//         {/* Search input */}
//         <div className='flex space-x-2'>
//           <input
//             className='border p-2 rounded'
//             type='text'
//             placeholder='Search by name'
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <button
//             className='bg-white text-blue-500 px-4 py-2 rounded'
//             onClick={handleFilter}
//           >
//             Search
//           </button>
//         </div>

//         {/* Filter inputs */}
//         <div className='flex space-x-2'>
//           <input
//             className='border p-2 rounded'
//             type='number'
//             placeholder='Min Price'
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//           <input
//             className='border p-2 rounded'
//             type='number'
//             placeholder='Max Price'
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//           <button className='bg-white text-blue-500 px-4 py-2 rounded'>Apply Filters</button>
          
//           <button
//             className='bg-white text-blue-500 px-4 py-2 rounded'
//             onClick={handleClearFilter}
//           >
//             Clear Filter
//           </button>
//         </div>
//         <div>
//             Cart : <button onClick={fetchCart}  >Fetch</button>
//         </div>
//       </nav>

//       {/* Render the fetched and filtered products */}
//       <div className='space-x-4 p-4'>
//         {products.map((product) => (
//           <ProductCard key={product.id} data={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// // // pages/index.js
// // import { useState, useEffect } from 'react';
// // import ProductCard from '@/app/components/ProductCard';

// // const HomePage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [minPrice, setMinPrice] = useState('');
// //   const [maxPrice, setMaxPrice] = useState('');
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await fetch('https://dummyjson.com/products');
// //       const data = await response.json();
// //       setProducts(data.products);
// //       console.log(data.products)
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };
// //   useEffect(() => {
// //     // Fetch products when the component mounts
  

// //     fetchProducts();
// //   }, []);

// //   const handleSearch = (event) => {
// //     setSearchQuery(event.target.value);
// //   };

// //   const handleFilter = () => {
// //     // Apply filter based on searchQuery, minPrice, and maxPrice
// //     const filteredProducts = products.filter((product) => {
// //         const nameMatches = product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase());
// //         const priceInRange =
// //           (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
// //           (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice));
      
// //         return nameMatches && priceInRange;
// //       });
      

// //     setProducts(filteredProducts);
// //   };

// //   const handleClearFilter = () => {
// //     // Reset searchQuery, minPrice, maxPrice, and fetch all products again
// //     setSearchQuery('');
// //     setMinPrice('');
// //     setMaxPrice('');
// //     fetchProducts();
// //   };

// //   return (
// //     <div>
// //         <nav className='flex bg-'>

// //       <h1>Home Page</h1>

// //       {/* Search input */}
// //       <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearch} />
// //       <button onClick={handleFilter}>Search</button>
// //       <button onClick={handleClearFilter}>Clear Filter</button>

// //       {/* Filter inputs */}
// //       <input
// //         type="number"
// //         placeholder="Min Price"
// //         value={minPrice}
// //         onChange={(e) => {setMinPrice(e.target.value)}}
// //         />
// //       <input
// //         type="number"
// //         placeholder="Max Price"
// //         value={maxPrice}
// //         onChange={(e) => {setMaxPrice(e.target.value)}}
// //         />

// //         </nav>
// //       {/* Render the fetched and filtered products */}
// //       {products.map((product) => (
// //         <ProductCard key={product.id} data={product} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default HomePage;


// // // pages/index.js
// // 'use client'
// // import { useState, useEffect } from 'react';
// // import ProductCard from '@/app/components/ProductCard'

// // const HomePage = () => {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     // Fetch products when the component mounts
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch('https://dummyjson.com/products');
// //         const data = await response.json();
// //         console.log(data)
// //         setProducts(data.products);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Home Page</h1>
// //       {/* Render the fetched products */}
// //       {products.map((product) => (
// //             <ProductCard key={product.id} data={product}/>
// //       ))}
// //     </div>
// //   );
// // };

// // export default HomePage;
