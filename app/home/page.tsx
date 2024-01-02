// pages/index.js
'use client'
import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard'

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log(data)
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {/* Render the fetched products */}
      {products.map((product) => (
            <ProductCard key={product.id} data={product}/>
      ))}
    </div>
  );
};

export default HomePage;
