import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NoDataFound from '../components/NoDataFound';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    await fetch('http://localhost:5000/api/myOrderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container my-order-container mb-5"> {/* Added mb-5 for bottom margin */}
        <div className="row">
          {orderData !== {} ? Array(orderData).map((data) => {
            return (
              data.orderData ? 
                data.orderData.order_data.slice(0).reverse().map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {item.map((arrayData, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            {arrayData.Order_date ? 
                              <div className="order-date m-auto mt-5">
                                {data = arrayData.Order_date}
                                <hr />
                              </div> :
                              <div className="col-12 col-md-6 col-lg-3">
                                <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
                                  <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'cover' }} />
                                  <div className="card-body">
                                    <h5 className="card-title">{arrayData.name}</h5>
                                    <div className="container w-100 p-0" style={{ height: '38px' }}>
                                      <span className="m-1">{arrayData.qty}</span>
                                      <span className="m-1">{arrayData.size}</span>
                                      <div className="price d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                }) : <NoDataFound />
            );
          }) : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
}
