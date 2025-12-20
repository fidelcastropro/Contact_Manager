import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({ name: '', contactNo: '', email: '' });
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAllContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await contactAPI.updateContact(editingContact._id, formData);
      } else {
        await contactAPI.createContact(formData);
      }
      setFormData({ name: '', contactNo: '', email: '' });
      setShowForm(false);
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({ name: contact.name, contactNo: contact.contactNo, email: contact.email });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.deleteContact(id);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Contacts</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, {user?.userName}</span>
          <button onClick={() => setShowForm(!showForm)} style={{ marginRight: '10px', padding: '5px 10px' }}>
            {showForm ? 'Cancel' : 'Add Contact'}
          </button>
          <button onClick={logout} style={{ padding: '5px 10px' }}>Logout</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="tel"
              placeholder="Contact Number"
              value={formData.contactNo}
              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
            {editingContact ? 'Update' : 'Add'} Contact
          </button>
        </form>
      )}

      <div>
        {contacts.length === 0 ? (
          <p>No contacts found. Add your first contact!</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
              <h4>{contact.name}</h4>
              <p>Phone: {contact.contactNo}</p>
              <p>Email: {contact.email}</p>
              <button onClick={() => handleEdit(contact)} style={{ marginRight: '10px', padding: '5px 10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(contact._id)} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;