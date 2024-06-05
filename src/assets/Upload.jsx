import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { passwordContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from "../firebase"


const API = "https://fashionkart-server.onrender.com"


const Upload = () => {
  const [password] = useContext(passwordContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-Gb"));
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [spinner, setSpinner] = useState(false);


  // firbase function to get image url through firebase
  const fileFunc = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        const storage = getStorage(app)
        const storageRef = ref(storage, "images/" + image.name)
        await uploadBytes(storageRef, image);
        const downLoadUrl = await getDownloadURL(storageRef)
        setImage(downLoadUrl)
        alert("Image Uploaded Successfully")
        formFunc()
        
      }
      catch (error) {
        console.log(error)
        alert("Image not uploaded")
      }

    }
  };


  // form submitting to the database 
  const formFunc = async (e) => {
    setSpinner(true);
    e.preventDefault();


    const formData = { title, price, rating, description, image, category, date }

    try {
      await axios.post(`${API}/product/uploadproduct`, formData);

      alert('Product has uploaded successfully');
      setSpinner(false);
      setDate("")
      setTitle("")
      setPrice("");
      setCategory("")
      setRating("");
      setImage(null);
      setDescription("")
    } catch (error) {
      setSpinner(false);
      alert('Product has not been uploaded');
    }
  };

  useEffect(() => {
    if (!password) {
      navigate('/login');
    }
  }, [password, navigate]);

  return (
    <div className='container enroll-main-card'>
      <div className='form-card py-4 container'>
        <h4 className='text-center'>Enter Product Details</h4>
        <hr />
        <form id='form-response' onSubmit={formFunc}>
          <div className='form-sub-card'>
            <label className='label'>Product Category</label>
            <br />
            <input
              onChange={(e) => setCategory(e.target.value)}
              required
              type='text'
              name='category'
              value={category.trim()}
              className='input-box'
            />
            <br />

            <label className='label'>Product Name</label>
            <br />
            <input
              onChange={(e) => setTitle(e.target.value)}
              required
              name='title'
              value={title}
              type='text'
              className='input-box'
            />
            <br />

            <label className='label'>Price</label>
            <br />
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              name='price'
              value={price}
              type='number'
              className='input-box'
            />
            <br />

            <label className='label'>Rating</label>
            <br />
            <input
              onChange={(e) => setRating(Number(e.target.value))}
              name='rating'
              value={rating}
              required
              type='number'
              className='input-box'
            />
            <br />
          </div>

          <div>
            <label className='label'>Product Description</label>
            <br />
            <input
              style={{ paddingLeft: '21px' }}
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              value={description}
              required
              type='text'

              className='input-box pl-0'
            />
            <br />

            <label className='label'>Date</label>
            <br />
            <input
              style={{ paddingLeft: '21px' }}
              onChange={(e) => setDate(e.target.value)}
              name='date'
              value={date}
              required
              type='text'
              readOnly
              className='input-box '
            />
            <br />



            <label className='label'>Upload Product Image</label>
            <br />
            <input style={{ paddingLeft: "0px", height: "inherit" }}
              onChange={fileFunc}
              required
              name='image'
              type='file'
              className='input-box '
            />
            <br />

            <hr />

            {spinner ? (
              <button className='btn btn-primary' type='button' disabled>
                <span style={{ marginRight: '0.4rem' }} className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                Submitting...
              </button>
            ) : (
              <button disabled={!image ? true : false} type='submit' className='text-white btn bg-primary'>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
