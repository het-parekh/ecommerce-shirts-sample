import React, { useEffect, useState } from 'react'
import {BsHandbag} from 'react-icons/bs'
import Bag from './Bag/Bag'
import './TopBar.css'

function TopBar(props){
    const [open,setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }
    
    return(
        <div className='topNav'>
            <div className='category'>
                HOME &nbsp; /&nbsp; CLOTHING &nbsp;  / &nbsp; SHIRTS &nbsp; /  &nbsp; 
            </div>
            <div className='bag' >
                <div className='bagIcon'>
                    <BsHandbag  size={30} onClick={toggleOpen}/>
                    <div className='bagAlert' onClick={toggleOpen}>
                        {props.bag.length}
                    </div>
                </div>
                <div className='itemList'>
                    <Bag open={open} bag={props.bag} product_data = {props.product_data} removeFromLocalBag={props.removeFromLocalBag} />
                </div>
            </div>
        </div>
    )
}

export default TopBar