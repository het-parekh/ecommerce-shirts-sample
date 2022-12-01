import React,{useEffect,useState} from 'react'
import './ProductList.css'
import {AiOutlineHeart,AiFillHeart,AiFillStar} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

function ProductList(props){


    const navigate = useNavigate();

    const addToWishlist = (e) => {
        let product_id = e.target.value
        props.addToLocalWishlist(product_id)
    }
    const removeFromWishlist = (e) => {
        let product_id = e.target.value
        props.removeFromLocalWishlist(product_id)
    }

    if(!props.wishlist || !props.productData){
        return
    }
    
    return(
        <div className='listContainer'>
            {props.productData.length > 0 ? props.productData.map(product => (
            <div className='productContainer' >
                <div className='productCard'>
                    <div className='productImg'>
                        {props.wishlist.includes(String(product.product_id))?
                            <button value={String(product.product_id)} onClick={removeFromWishlist} >
                                WISHLIST <span><AiFillHeart size={15} className='fillHeart'/></span>
                            </button>
                            :
                            <button value={String(product.product_id)} onClick={addToWishlist} >
                                WISHLIST <span><AiOutlineHeart size={15}/></span>
                            </button>
                        }
                        <div className='productRating'>4.5
                            <span><AiFillStar color={"#00cc7a"} /></span> 
                            <span style={{fontWeight:500,fontSize:10,marginTop:"5.5px"}}>(3.7k ratings)</span>
                        </div>
                        <img height="300px" width="100%" src={product.images[0]} ></img>
                    </div>
                    <div className='productCaption' onClick={() => navigate('/'+product.brand+'/'+product.product_id)}>
                        <div className='productInfo'>
                            <div className='info info1'>
                                <span className='brand'>{product.brand}</span>
                                <span style={{color:'#00995c',fontWeight:'bold'}}>&#8377;{product.variant_price}</span>
                            </div>
                            <div className='info info2'>
                                <span>{product.title}</span>
                            </div>
                            <span style={{marginTop:'-5px',marginBottom:'5px'}} className='divider'></span>

                            <div className='info info3'>
                                <span>Colors</span>
                                <div style={{display:'flex',gap:'10px'}}>
                                {
                                    product.actual_color.map((color) => (
                                        <div className='palette' style={{background:color}}></div>
                                    ))
                                }
                                </div>
                            </div>
                            <div className='info info3'>
                                <span>Sizes</span>
                                <span className='sizes'>XL</span>
                            </div>
                        </div>
       
                    </div>
                    
                </div>
            </div>
            ))
            :
            <div className='noResults'>No Results Found</div>
        }
        </div>
    )
}

export default ProductList

