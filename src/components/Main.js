import React, { useEffect, useState } from 'react'
import {Routes,Route,useParams} from 'react-router-dom'

import TopBar from './TopBar/TopBar'
import ProductHome from './ProductHome/ProductHome'
import ProductDetail from './ProductDetail/ProductDetail'
import product_data from '../assets/ecommerce_shirts_data.json'

function Main(){

    const [wishlist,setWishlist] =  useState()
    const [bag,setBag] =  useState()

    useEffect(() => {

        let localWishlist = localStorage.getItem('wishlist')
        let localBag = localStorage.getItem('bag')
        
        setWishlist(localWishlist!=='undefined' && localWishlist?JSON.parse(localWishlist):[])
        setBag(localBag!=='undefined' && localBag?JSON.parse(localBag):[])
    },[])

    const addToLocalWishlist = (product_id) => {
        
        let temp = [...wishlist,product_id]
        setWishlist(temp)
        localStorage.setItem('wishlist',JSON.stringify(temp))
    }
    const removeFromLocalWishlist = (product_id) => {
        let temp = wishlist.filter(item => item!==product_id)
        setWishlist(temp)
        localStorage.setItem('wishlist',JSON.stringify(temp))
    }
    const addToLocalBag = (product_id) => {
        let temp = [...bag,product_id]
        setBag(temp)
        localStorage.setItem('bag',JSON.stringify(temp))
    }
    const removeFromLocalBag = (product_id) => {
        let temp = bag.filter(item => item.split('#')[0]!==product_id)
        setBag(temp)
        localStorage.setItem('bag',JSON.stringify(temp))
    }

    
    if(!wishlist || !bag){
        return
    }

    return(
        <>
        <TopBar product_data={product_data} bag={bag} removeFromLocalBag={removeFromLocalBag}/>
        <Routes >
            <Route path='/' element={
                <ProductHome 
                    product_data={product_data}
                    addToLocalWishlist = {addToLocalWishlist}
                    removeFromLocalWishlist = {removeFromLocalWishlist}
                    wishlist={wishlist}
                />
            } />

            <Route path='/:brand/:product_id' element={
                <ProductDetail 
                    product_data={product_data}
                    addToLocalWishlist = {addToLocalWishlist}
                    addToLocalBag = {addToLocalBag}
                    removeFromLocalWishlist = {removeFromLocalWishlist}
                    removeFromLocalBag = {removeFromLocalBag}
                    wishlist={wishlist}
                    bag={bag}
                />} 
            />
        </Routes>
        </>
    )
}

export default Main