import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  })

  return (
    <>
      <div> <Navbar /></div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: '10' }}>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </form>
            </div>
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3DNHY" className=" " style={{ 'filter': "brightness(30%)", "height": "10%", "width": "100%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>

        {foodCat != [] ?
          foodCat.map((cat) => {
            return (<div className='row mb-3'>
              <div key={cat.CategoryName} className='fs-2 '>{cat.CategoryName}</div>
              <hr />
              {foodItem != [] ?
                foodItem.filter((item) => ((item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))).map(dish => {
                  return (
                    <div key={dish._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        food={dish}
                        options={dish.options[0]}
                      />
                    </div>
                  )
                })
                : <div>No Data</div>
              }
            </div>)
          })
          : <div>No data to be shown</div>
        }

      </div>
      <div><Footer /></div>
    </>
  )
}
