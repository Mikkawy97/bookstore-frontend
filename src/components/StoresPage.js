import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './StoresPage.css';  

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreAddress, setNewStoreAddress] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

  useEffect(() => {
    axios.get(`${API_BASE_URL}/stores`)
      .then(response => setStores(response.data))
      .catch(error => console.error('Error fetching stores', error));
  }, [API_BASE_URL]);

  const addStore = () => {
    const newStore = { name: newStoreName, address: newStoreAddress };
    axios.post(`${API_BASE_URL}/stores`, newStore)
      .then(response => {
        setStores([...stores, response.data]);
        setShowModal(false);
        setNewStoreName('');
        setNewStoreAddress('');
      })
      .catch(error => console.error('Error adding store', error));
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedStores = [...stores].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });

  const filteredStores = sortedStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stores-page container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <div className='d-flex align-items-center' style={{ width: '30%' }}>
          <h2 className='w-100'>Stores List</h2>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for stores..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Button style={{ width: '10%', backgroundColor: '#D86128', borderStyle: 'none' }} onClick={() => setShowModal(true)}>
          Add New Store
        </Button>
      </div>

      {/* Table */}
      <Table hover>
        <thead>
          <tr>
            <th>
              <input className='me-3' type="checkbox" onChange={toggleSortOrder} />
              Store ID
            </th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>#{store.id}</td>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>
                <div className="d-flex w-50">
                  <Button style={{ backgroundColor: '#D86128', borderStyle: 'none' }} className="me-2">
                    <FaEdit />
                  </Button>
                  <Button style={{ backgroundColor: '#D86128', borderStyle: 'none' }}>
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <p>Showing 1 to 10 of {stores.length} stores</p>
        <nav>
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" href="#">«</a>
            </li>
            <li className="page-item active" >
              <a className="page-link" style={{ backgroundColor:'#D86128',borderColor:'#D86128' }} href="#">1</a>
            </li>
            <li className="page-item" >
              <a className="page-link" style={{ color:'#D86128' }} href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" style={{ color:'#D86128' }} href="#">»</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Add Store Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" dialogClassName="modal-no-border">
        <Modal.Header closeButton style={{ backgroundColor: '#D86128', color: 'white' }}>
          <Modal.Title style={{ color: 'white' }}>New Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="storeName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
                placeholder="Enter Store Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="storeAddress" className="mt-3">
              <Form.Label>Store Address</Form.Label>
              <Form.Control
                type="text"
                name="storeAddress"
                value={newStoreAddress}
                onChange={(e) => setNewStoreAddress(e.target.value)}
                placeholder="Enter Store Address"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-4">
              <Button className='me-2' variant="outline-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="outline-primary" style={{ backgroundColor: '#D86128', color: 'white' }} onClick={addStore}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StoresPage;
