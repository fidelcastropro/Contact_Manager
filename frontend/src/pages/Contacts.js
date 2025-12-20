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
    <div className="contacts-container">
      <div className="contacts-header">
        <h1 className="contacts-title">My Contacts</h1>
        <div className="user-info">
          <span className="welcome-text">Welcome, {user?.userName}!</span>
          <button onClick={() => setShowForm(!showForm)} className="btn-secondary btn-success">
            {showForm ? '✕ Cancel' : '+ Add Contact'}
          </button>
          <button onClick={logout} className="btn-secondary btn-danger">Logout</button>
        </div>
      </div>

      {showForm && (
        <div className="contact-form">
          <h3 className="form-title">{editingContact ? '✏️ Edit Contact' : '➕ Add New Contact'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-primary">
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </form>
        </div>
      )}

      <div className="contact-grid">
        {contacts.length === 0 ? (
          <div className="empty-state">
            <h3>📱 No Contacts Yet</h3>
            <p>Start building your contact list by adding your first contact!</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <h4 className="contact-name">👤 {contact.name}</h4>
              <div className="contact-info">📞 {contact.contactNo}</div>
              <div className="contact-info">✉️ {contact.email}</div>
              <div className="contact-actions">
                <button onClick={() => handleEdit(contact)} className="btn-edit">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(contact._id)} className="btn-delete">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;