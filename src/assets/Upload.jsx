import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { passwordContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { API } from "../api"

const Upload = () => {
  const [password] = useContext(passwordContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [spinner, setSpinner] = useState(false);

  const fileFunc = (e) => {
    const file = e.target.files[0];
    setImage(file);

  };

  const formFunc = async (e) => {
    setSpinner(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('date', date);

    try {
      await axios.post(`${API}/product/uploadproduct`, formData);

      alert('Product has uploaded successfully');
      setSpinner(false);
      setDate("")
      setTitle("")
      setPrice("");
      setCategory("")
      setRating("");
      setImage("");
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
              value={category}
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
            <label className='label'>Product Details</label>
            <br />
            <input
              style={{ paddingLeft: '21px' }}
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              value={description}
              required
              type='text'

              className='input-box'
            />
            <br />

            <label className='label'>Date</label>
            <br />
            <input
              onChange={(e) => setDate(e.target.value)}
              required
              name='date'
              value={date}
              type='date'
              className='input-box'
            />
            <br />

            <label className='label'>Upload Product Image</label>
            <br />
            <input
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
              <button type='submit' className='text-white btn bg-primary'>
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
