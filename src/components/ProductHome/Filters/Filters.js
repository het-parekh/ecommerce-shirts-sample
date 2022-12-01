import React, { useState,useEffect } from 'react'
import './Filters.css'

function Filters(props){

    const [filteredData,setFilteredData] = useState()
    const [uniqueBrands,setUniqueBrands] = useState([])
    const [checkedBrands,setCheckedBrands] = useState([])
    const [checkedIdeal,setCheckedIdeal] = useState([])
    const [checkedPrices,setCheckedPrices] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    
    useEffect(() => {
        if(checkedBrands.length === 0 && checkedIdeal.length == 0 && checkedPrices.length === 0){
            setFilteredData(props.productData)
            props.setFilteredProductData(props.productData)
            return
        }        
        const checkInRange = (value) => {
            let inRange = false
            checkedPrices.forEach(price =>{
                let start = price.split('-')[0]
                let end = price.split('-')[1]
                if (value >= start && value <= end ){
                    inRange = true
                    return
                }
            })
            return inRange
        }

        let temp = props.productData.filter(product => (
               (product.title.toLowerCase().includes(searchTerm.toLowerCase()))
            && (checkedBrands.length === 0 || checkedBrands.includes(product.brand)) 
            && (checkedIdeal.length === 0 || checkedIdeal.includes(product.ideal_for) )
            && (checkedPrices.length === 0 || checkInRange(product.variant_price) )))
            
        setFilteredData(temp)
        props.setFilteredProductData(temp)
    },[checkedBrands,checkedIdeal,checkedPrices])

    useEffect(() => {
        if(filteredData){
            let temp = filteredData.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
            props.setFilteredProductData(temp)
        }
    },[searchTerm])

    useEffect(() => {
        let allBrands = props.productData.map(product => product.brand)
        setUniqueBrands([...new Set(allBrands)])
    },[])

    const changeBrands = (e) => {
        let value = e.target.value
        let checked = e.target.checked
        if(checked){
            setCheckedBrands((prev) => [...prev,value])
        }else{
            setCheckedBrands((prev) => prev.filter(brand => brand!==value))
        }
    }
    const changePrices = (e) => {
        let value = e.target.value
        let checked = e.target.checked
        if(checked){
            setCheckedPrices((prev) => [...prev,value])
        }else{
            setCheckedPrices((prev) => prev.filter(price => price!==value))
        }
    }
    const changeIdeal = (e) => {
        let value = e.target.value
        let checked = e.target.checked
        if(checked){
            setCheckedIdeal((prev) => [...prev,value])
        }else{
            setCheckedIdeal((prev) => prev.filter(ideal => ideal!==value))
        }
    }

    const changeSearch = (e) => {
        let value = e.target.value
        
        setSearchTerm(value)
    }

    if(!props.productData || !uniqueBrands || !filteredData){
        return
    }

    return(

    <div className="filter">
        <div className="filterBlock filterSearh">
            <h4>Search</h4>
            
            <div className="filterSearhInput">
                <input onChange={changeSearch} type="search" placeholder="Search Products" />
            </div>
        </div> 

        <div className="filterBlock filterType">
            <h4>IDEAL FOR</h4>
            <ul>
                <li>
                    <input onChange={changeIdeal} value='Men'  type="checkbox" id="checkbox1" />
                    <label className="checkbox-label" for="checkbox1">Men</label>
                </li>

                <li>
                    <input onChange={changeIdeal} value="Women"  type="checkbox" id="checkbox2" />
                    <label className="checkbox-label" for="checkbox2">Women</label>
                </li>

                <li>
                    <input onChange={changeIdeal} value='Boys'  type="checkbox" id="checkbox3" />
                    <label className="checkbox-label" for="checkbox3">Boys</label>
                </li>

                <li>
                    <input onChange={changeIdeal} value='Girls' type="checkbox" id="checkbox4" />
                    <label className="checkbox-label" for="checkbox4">Girls</label>
                </li>
            </ul>
        </div>
        <div className='divider'></div>
        <div className="filterBlock ">
            <h4>BRANDS</h4>

            <ul className='filterBrands'>
                {uniqueBrands.map(brand => (
                    <li key={brand}>
                        <input value={brand}  type="checkbox" id={brand} onChange = {changeBrands} />
                        <label for={brand}>{brand}</label>
                    </li>
                ))
                }
            </ul>
        </div>
        <div className='divider'></div>
        <div className="filterBlock filterPrices">
            <h4>PRICE RANGE</h4>

            <ul className="filter-content filters list">
                <li>
                    <input onChange={changePrices}  type="checkbox" id="checkbox7" value='0-500' />
                    <label for="checkbox7"> &#8377; 0 - 500</label>
                </li>

                <li>
                    <input onChange={changePrices}  type="checkbox" id="checkbox8" value='500-1000' />
                    <label  for="checkbox8"> &#8377; 500 - 1000</label>
                </li>

                <li>
                    <input  onChange={changePrices} type="checkbox" id="checkbox9"  value='1000-2500'/>
                    <label for="checkbox9"> &#8377; 1000 - 2500</label>
                </li>

                <li>
                    <input onChange={changePrices} type="checkbox" id="checkbox10" value='2500-5000' />
                    <label for="checkbox10"> &#8377; 2500 - 5000</label>
                </li>
            </ul>
        </div>
    </div>
    )
}

export default Filters