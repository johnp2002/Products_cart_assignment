import React from 'react'
import StarRatings from 'react-star-ratings';

const ProductCard = ({ data }) => {
    return (
        <div className='bg-neutral-100 mb-1 flex h-52 p-4'>
            <div className='w-36 h-full mr-4 rounded-lg overflow-hidden'>

            <img src={data.images[0]} className='h-full' alt="" />
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>
                    {data.title}
                </h1>
                <p>
                   {data.description}
                </p>
                <h1 className='font-bold text-lg'>
                Rs.{data.price}/- <span className='text-xs bg-yellow-500 p-1 rounded-lg'>Discount  {data.discountPercentage}%</span>

                </h1>
                <StarRatings rating={data.rating} starDimension="20px" starRatedColor={'gold'} starHoverColor={'blue'} starEmptyColor={'grey'} starSpacing="2px"/>
            </div>
        </div>
    )
}

export default ProductCard