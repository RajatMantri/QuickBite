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
              <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fHw%3D" className=" " style={{ 'filter': "brightness(30%)", "height": "10%", "width": "100%" }} alt="..." />
            </div>
          </div>
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
