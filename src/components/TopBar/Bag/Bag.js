import React,{useState} from 'react'
import './Bag.css'
import {AiFillCloseSquare} from 'react-icons/ai'

function Bag(props){
    const product_data = props.product_data
    const bag = product_data.filter(item => props.bag.find(subitem => subitem.includes(String(item.product_id))))
    const removeItemFromBag = (product_id) => {
        props.removeFromLocalBag(product_id)
    }

    return(
        <div className={`bagContainer ${props.open?'bagOpen':'bagClosed'}`}>
            {bag.length>0?bag.map((product,index) => (<>
            <div key={product.product_id} className='bagItem'>
                <div></div>
                <div className='bagThumbnail'>
                    <img width={"100%"} height={'100%'} src = {product.images[0]} />
                </div>
                <div className='bagInfo'>
                    <div className='bagTitle'>
                        {product.brand}
                        <button  onClick={() => removeItemFromBag(String(product.product_id))}><AiFillCloseSquare  size={15}/></button>
                    </div>
                    <div className='bagPrice'>
                    &#8377; {product.variant_price}
                    <span>Size {props.bag[index].split('#')[1]}</span>
                    </div>
                    <div className='bagDescription'>
                        {product.title}
                    </div>
                </div>
            </div>
            <hr />
            </>))
        :
        <div className='bagEmpty'>
            No product added yet...
        </div>    
        }
        </div>
    )
}


export default Bag