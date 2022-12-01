import React,{useEffect,useState} from 'react'
import {AiOutlineHeart,AiFillHeart,AiFillStar} from 'react-icons/ai'
import {BsFillBagPlusFill,BsFillBagCheckFill,BsPatchCheckFill} from 'react-icons/bs'
import {MdOutlineArrowBackIos} from 'react-icons/md'
import {GiRolledCloth} from 'react-icons/gi'
import ImageZoom from './ImageZoom'
import './ProductDetail.css'
import {useParams,useNavigate} from 'react-router-dom'

function ProductDetail(props){

    let navLinks = useParams()
    const navigate = useNavigate();
    let product_id = navLinks['product_id']
    const product = props.product_data.find(item => String(item.product_id) === product_id)

    const [selectedSize,setSelectedSize] = useState('S')
    const [inBag,setInBag] = useState() 
    const [inWishlist,setInWishlist] = useState() 
    const [imgDisplay,setImgDisplay] = useState(1)

    useEffect(() => {
        let temp = props.bag.find(item => item.includes(String(product.product_id)))
        let size = temp?temp.split('#')[1]:'S'
        setInBag(Boolean(temp))
        setSelectedSize(size)
        setInWishlist(props.wishlist.includes(String(product.product_id)))
    },[props.bag,props.wishlist])

    const changeBag = (e) => {
        let product_id = e.target.value
        
        if(inBag){
            props.removeFromLocalBag(product_id)
            setInBag(false)
        }else{
            props.addToLocalBag(product_id+'#'+selectedSize)
            setInBag(true)
        }
    }
    const changeWishlist = (e) => {
        let product_id = e.target.value
        if(inWishlist){
            props.removeFromLocalWishlist(product_id)
            setInWishlist(false)
        }else{
            props.addToLocalWishlist(product_id)
            setInWishlist(true)
        }
    }
    if(typeof inBag === undefined || typeof inWishlist === undefined){
        return
    }
    return (<>
        <div className='back' onClick={() => navigate(-1)}>
           <div><MdOutlineArrowBackIos /></div> Back
        </div>
        <div className = "cardWrapper">
        <div className = "card">
          <div className = "productImgs">
            <div className = "imgDisplay">
              { imgDisplay === 1?
                <ImageZoom src = {product.images[0]} alt = "product image"/>
                :imgDisplay === 2?
                <ImageZoom src = {product.images[1]} alt = "product image"/>
                :imgDisplay === 3?
                <ImageZoom src = {product.images[2]} alt = "product image"/>
                :
                <ImageZoom src = {product.images[3]} alt = "product image"/>
              }
            </div>
            <div className = "imgSelect">
              <div className = "imgItem" onClick = {() => setImgDisplay(1)}>
                  <img src = {product.images[0]} alt = "product image"/>
              </div>
              <div className = "imgItem" onClick = {() => setImgDisplay(2)}>
                  <img src = {product.images[1]} alt = "product image"/>
              </div>
              <div className = "imgItem" onClick = {() => setImgDisplay(3)}>
                  <img src = {product.images[2]} alt = "product image"/>
              </div>
              <div className = "imgItem" onClick = {() => setImgDisplay(4)} style={{borderRight:'none'}}>
                  <img src = {product.images[3]} alt = "product image"/>
              </div>
            </div>
          </div>
          <div className = "productContent">
            <h2 className = "productDetailTitle">{product.brand} 
                <div className='seller'>
                    sold by <span>A.V. Sinatra</span>
                </div>
            </h2>
            <div>

            </div>
            <div className='subtitleWrapper'>
                <div className='productDetailPrice'> 
                    &#8377; {product.variant_price} 
                    <span>inclusive of all taxes</span>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div className='productDetailRating'>4.5
                        <span style={{marginTop:'2px'}}><AiFillStar color={"#00cc7a"} size={15}  /></span> 
                        <span style={{fontWeight:500,marginLeft:10,marginTop:"-0.5px"}}>(3.7k ratings)</span>
                    </div>

                </div>
            </div>
      
            <div className = "productDetail">
              <p>{product.title}</p>
              <p>{product.product_details}</p>
            </div>
            <div className='productSizes'>
                <div className="sizeTitle">
                    Available Sizes
                </div>
                <div className='sizes'>
                    <span onClick={() => setSelectedSize('S')} className={selectedSize==='S'?'invertColor':''}>S</span>
                    <span onClick={() => setSelectedSize('M')} className={selectedSize==='M'?'invertColor':''}>M</span>
                    <span onClick={() => setSelectedSize('L')} className={selectedSize==='L'?'invertColor':''}>L</span>
                    <span onClick={() => setSelectedSize('XL')} className={selectedSize==='XL'?'invertColor':''} >XL</span>
                    <span onClick={() => setSelectedSize('XXL')} className={selectedSize==='XXL'?'invertColor':''}>XXL</span>
                </div>
            </div>
            <div className='buttonWrapper'>
                <button className='cartButton' value={String(product.product_id)} onClick={changeBag}>
                    <div className='cartIcons'>
                        <div className={inBag?'inBag':'notInBag'}><BsFillBagPlusFill size={20} /> </div>
                        <div className={inBag?'inBag':'notInBag'}><BsFillBagCheckFill size={20} /></div>
                     </div> {inBag?'ADDED TO BAG':'ADD TO BAG'}
                </button>
                <button className='wishListButton' value={String(product.product_id)} onClick={changeWishlist}>
                    <div className={inWishlist?'inWishlist':'notInWishlist'}>{inWishlist?<AiFillHeart size={19}/>:< AiOutlineHeart size={19}/>}</div> WISHLIST 
                </button>
            </div>
            <div style={{borderTop:"1px solid #bfbfbf",marginTop:'20px'}}></div>
                <ul className='randomInfo'>
                    <li><BsPatchCheckFill size={15} className='checkFill' />100% Original Products</li>
                    <li><BsPatchCheckFill size={15} className='checkFill' />Pay on delivery might be available</li>
                    <li><BsPatchCheckFill size={15} className='checkFill' />Easy 30 days returns and exchanges</li>
                    <li><BsPatchCheckFill size={15} className='checkFill' />Try & Buy might be available</li>
                </ul>
            <div className='sizeFit'>
                <h4>Size & Fit</h4>
                <div >
                    {product.size_fit}
                </div>
            </div>
            <div className='sizeFit'>
                <h4>EMI option available</h4>
                <div>
                    EMI starting from Rs.30/month
                </div>
            </div>
            <div className='materialInstructions'>
                <h4>Material & Care</h4>
                <ul>
                    {
                        product.care_instructions.map((ins) => (
                            <li key={ins}><GiRolledCloth size={15} className='rolledCloth' />{ins}</li>
                        ))
                    }                    
                </ul>
            </div>
          </div>
        </div>
      </div>
      </>)
}

export default ProductDetail