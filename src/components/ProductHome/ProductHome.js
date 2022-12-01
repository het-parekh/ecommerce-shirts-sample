import React, { useEffect, useState } from 'react'
import ProductList from '../ProductList/ProductList'
import Filters from './Filters/Filters'
import './Sorting.css'
import './ProductHome.css'

function ProductHome(props){

    const [filteredproductData,setFilteredProductData] = useState()
    const [sortedFilteredData,setSortedFilteredData] = useState()
    const [sorted,setSorted] = useState('pricelowtohigh')
    
    const setHightoLow = (arr) => arr.sort((a,b) => b.variant_price - a.variant_price)
    const setLowtoHigh = (arr) => arr.sort((a,b) => a.variant_price - b.variant_price)

    useEffect(() => {
        if(filteredproductData){
            let temp = setLowtoHigh(filteredproductData)
            setSortedFilteredData(temp)
            setSorted('pricelowtohigh')
        }
        
    },[filteredproductData])

    const changeSort = (e) => {
        let value = e.target.value
        if(value === 'pricelowtohigh'){
            let temp = setLowtoHigh(filteredproductData)
            setSortedFilteredData(temp)
            
        }else{
            let temp = setHightoLow(filteredproductData)
            setSortedFilteredData(temp)
        }
        setSorted(value)      
    }

    return(
        <div> 
            <div className='sortWrapper'>
                {filteredproductData &&
                    <div className="sort">
                        <select value={sorted} className="sortSelect" onChange={changeSort}>
                            <option  value="pricelowtohigh">Price (Low to High)</option>
                            <option  value="pricehightolow" >Price (High to Low) </option>
                        </select>
                    </div>
                }
            </div>
            <div className='productWrapper'>
                <div className='filterWrapper'>
                        <Filters 
                            setFilteredProductData={setFilteredProductData} 
                            productData={props.product_data} 
                        />
                </div>
                <div className='listWrapper'>
                    {sortedFilteredData &&
                    <ProductList 
                        addToLocalWishlist = {props.addToLocalWishlist}
                        removeFromLocalWishlist = {props.removeFromLocalWishlist}
                        wishlist={props.wishlist}
                        productData = {sortedFilteredData}
                    />
                    }
                </div>
            </div>
        </div>
    )


}

export default ProductHome