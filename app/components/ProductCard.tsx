import React, { use, useState } from 'react'
import StarRatings from 'react-star-ratings';

const ProductCard = ({ data , addCart }) => {
    const [Data,setData] = useState(data);
    return (
        <div className='bg-neutral-100 mb-3 flex justify-between items-center h-52 drop-shadow-md p-4 px-7 rounded-xl'>
            <div className='flex'>

            <div className='w-36 h-full mr-4 rounded-lg overflow-hidden'>

                <img src={data.images[0]} className='h-full w-full' alt="" />
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>
                    {data.title}
                </h1>
                <p>
                    {data.description}
                </p>
                <h1 className='font-bold text-lg'>
                    Rs.{data.price}/- <span className='text-xs bg-yellow-400 p-1 rounded-lg'>Discount  {data.discountPercentage}%</span>

                </h1>
                <StarRatings rating={data.rating} starDimension="20px" starRatedColor={'gold'} starHoverColor={'blue'} starEmptyColor={'grey'} starSpacing="2px" />
            </div>
            </div>
            <div className='items-end'>
                <button className='bg-blue-500 p-3 rounded-md' onClick={()=>addCart(Data)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard