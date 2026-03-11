import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BusinessForm from './BusinessForm';
import './Business.css';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/businesses', {
        params: { search, page, per_page: perPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusinesses(res.data.data);
      setTotal(res.data.meta.total || 0);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this business?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`/api/admin/businesses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetch();
  };

  const toggleStatus = async (item) => {
    const token = localStorage.getItem('token');
    await axios.patch(`/api/admin/businesses/${item.id}/status`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetch();
  };

  return (
    <div className="business-list">
      <div className="header">
        <button onClick={() => navigate('/businesses/setup')}>New Business</button>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.status ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => setEditItem(b)}>Edit</button>
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                  <button onClick={() => toggleStatus(b)}>
                    {b.status ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>{page}</span>
        <button disabled={businesses.length < perPage} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
      {editItem && (
        <BusinessForm
          item={editItem}
          onSaved={() => {
            setEditItem(null);
            fetch();
          }}
          onCancel={() => setEditItem(null)}
        />
      )}
    </div>
  );
};

export default BusinessList;
