import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Business.css';

const BusinessForm = ({ item = {}, onSaved, onCancel }) => {
  const [data, setData] = useState({ name: '', email: '', phone: '', address: '', status: 1 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item && item.id) {
      setData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    let formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        formData.append(k, data[k]);
      }
    });

    try {
      if (item && item.id) {
        await axios.post(`/api/admin/businesses/${item.id}?_method=PUT`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/admin/businesses', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSaved();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="business-form-overlay">
      <form className="business-form" onSubmit={handleSubmit}>
        <h3>{item && item.id ? 'Edit Business' : 'New Business'}</h3>
        <label>Name</label>
        <input name="name" value={data.name || ''} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name[0]}</span>}
        <label>Email</label>
        <input name="email" value={data.email || ''} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email[0]}</span>}
        <label>Phone</label>
        <input name="phone" value={data.phone || ''} onChange={handleChange} />
        <label>Address</label>
        <textarea name="address" value={data.address || ''} onChange={handleChange} />
        <label>Status</label>
        <select name="status" value={data.status} onChange={handleChange}>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        <label>Logo</label>
        <input name="logo" type="file" onChange={handleChange} />
        <div className="buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel} className="cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
