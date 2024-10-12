   // src/components/ShopPage.js
   import React, { useState, useEffect } from 'react';
   import axios from 'axios';
   import { BiSearch } from 'react-icons/bi';
   import './ShopPage.css'; 
   import cover from '../assets/cover.png';
   const ShopPage = () => {
     const [books, setBooks] = useState([]);
     const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

     useEffect(() => {
       // Fetch books data from the backend
       axios.get(`${API_BASE_URL}/store-books`)
         .then(response => setBooks(response.data))
         .catch(error => console.error('Error fetching books', error));
     }, []);

     const markAsSold = async (storeId, bookId) => {
        try {
          // Make API call to mark as sold
          await axios.put(`${API_BASE_URL}/store-books/${storeId}/${bookId}/sell`);
          // Update the local state to reflect the change
          setBooks(prevBooks => 
            prevBooks.map(book => 
              book.id === bookId 
                ? {
                    ...book,
                    Stores: book.Stores.map(store => 
                      store.id === storeId 
                        ? { ...store, StoreBook: { ...store.StoreBook, sold_out: true } }
                        : store
                    )
                  }
                : book
            )
          );
        } catch (error) {
          console.error('Error marking book as sold', error);
        }
      };
    

     return (
        <div className="container-fluid mt-4" style={{ backgroundColor: '#f8f9fa'}}>
          {/* Title Section */}
 
    
          {/* Search and Filter Section */}
          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <h3>Browse Books</h3>
          <div className="input-group" style={{ width: '40%' }}>
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Search"
          />
          <span className="input-group-text custom-icon">
            <BiSearch />
          </span>
        </div>

    
        
          </div>
          <div className="d-flex align-items-center mt-3">
          <div className="d-flex align-items-center me-3">
          <label htmlFor="authorSelect" className="me-2">Author:</label>
          <select id="authorSelect" className="form-select custom-select">
            <option value="">All Authors</option>
            <option value="1">Author 1</option>
            <option value="2">Author 2</option>
            <option value="3">Author 3</option>
          </select>
        </div>
        <div className="d-flex align-items-center me-3">
          <label htmlFor="storeSelect" className="me-2">Store:</label>
          <select id="storeSelect" className="form-select custom-select">
            <option value="">All Stores</option>
            <option value="1">Store 1</option>
            <option value="2">Store 2</option>
            <option value="3">Store 3</option>
          </select>
        </div>
        <div className="d-flex align-items-center ">
          <label htmlFor="sortSelect " className="w-50">Sort by:</label>
          <select id="sortSelect" className="form-select custom-select">
            <option value="least-price">Least Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        </div>
          {/* Books Grid */}
          <div className="row mt-4">
            {/* Example Book Card */}
            {books?.map((book, index) => (
          <div key={index} className="col-md-4  mb-4">
            <div className='card'>
            <div className="d-flex ">
              <img 
                src={cover} 
                className="card-img-to img-fluid" 
                alt={`Book ${index + 1}`} 
              />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">by {book.Author.name}</p>
                <div className='d-flex  align-items-center'>
                {book?.Stores?.map((store, index) => (
                      <div key={index} className='store w-100'>
                        <h6>{store.name}</h6>
                        <h6 className='price'>{store.StoreBook.price}</h6>
                        <button 
                          className='sellbtn' 
                          onClick={() => markAsSold(store.StoreBook.store_id, book.id)}
                          disabled={store.StoreBook.sold_out}
                        >
                          {store.StoreBook.sold_out ? 'Sold' : 'Sell'} 
                          <span className='mx-1'><i className="bi bi-cart2"></i></span>
                        </button>
                      </div>
                    ))}
                     </div>
              </div>
            </div>
            </div>
          </div>
        ))}
          </div>
        </div>
      );
   };

   export default ShopPage;
   