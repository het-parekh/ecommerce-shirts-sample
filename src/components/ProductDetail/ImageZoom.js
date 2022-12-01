
import InnerImageZoom  from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import './ProductDetail.css'

function ImageZoom(props){
    return(
        <InnerImageZoom src = {props.src} zoomScale={1.5}  />
    )
}

export default ImageZoom