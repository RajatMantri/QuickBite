import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Card = (props) => {
    let options = props.options;
    let priceOptions = Object.keys(options);
    let data = useCart();
    const priceRef = useRef();
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState(props.options[0]);


  useEffect(()=>{
    setSize(priceRef.current.value);
  },[]);

let finalPrice = qty*parseInt(options[size]);
   return( <div>
        <div className=" mt-3" style={{ "width": "18rem", "maxHeight": "300", "border": "1px solid white", "borderRadius": "8px"}}>
            <img src={props.food.img} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.food.name}</h5>

                <div>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                        {priceOptions.map((data)=>{
                            return (<option key={data} value={data}>{data}</option>)
                        })}
                    </select>

                    <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
                </div>
                <hr />
                <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    </div>
   );
}

export default Card;