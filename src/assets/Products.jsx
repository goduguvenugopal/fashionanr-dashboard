import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import {API} from "../api"


const Products = () => {
  const [data, setData] = useState([])
  const [password, setPassword] = useContext(passwordContext)
  const navigate = useNavigate();

console.log(data)

  useEffect(() => {

    if (!password) {
      navigate("/login")
    }
  }, [password])


  //  get method of students 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/product/getproducts`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        alert("Please Try Again: Server Is Not Responding");
      }
    };

    fetchData();
  }, [password])



  // delete product by id 

  const deleteProduct = async (id) =>{
    
    try{
      await axios.delete(`${API}/product/deleteproduct/${id}`)
      const deleted = data.filter((item)=> item.id !== id)
      setData(deleted)
      alert("product has deleted successfully ");
    }catch (error) {
      console.log(error);
      alert("Please Try Again, product has not deleted ");
    }
  } 


  return (
    <>
      <div className=' students-card d-flex justify-content-evenly  flex-wrap mt-2 pt-3 pb-1'>
        <h4 className='all-text'>All Products</h4>
        <h4 className='all-text'>Total Products : <b style={{ textDecoration: "underline" }}>{data.length}</b>  </h4>
      </div>
      <div className='container mt-5 ' >

        {data.length ? <div className='table-card' style={{ paddingTop: "5rem" }}>
          <table className="table">
            <thead>
              <tr className='bg-primary text-white'>
                <th scope="col" >Sl.No</th>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Rating</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Delete</th>


              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} >
                  <th scope="row">{index + 1}</th>
                  <td >{item.date}</td>
                  <td style={{ textTransform: "capitalize" }}>{item.category}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.rating}</td>
                  <td>{item.description}</td>
                  <td>{item.image && (<img   style={{ width: '300px', height:'300px'  }} src={`${API}/uploads/${item.image}`} alt={item.title} />)}</td>
                  <td><button onClick={()=>deleteProduct(item._id)} className='btn bg-danger text-white'>Delete</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div> : <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}>Loading...</h5>
        </div>
        }

      </div>
    </>
  )
}

export default Products