import { useEffect, useState } from 'react';

function Profile({ currentUser, onSaveName }) {
  // State e profilit
  const [name, setName] = useState(currentUser?.name || '');
  const [message, setMessage] = useState('');

  // Sinkronizon emrin aktual
  useEffect(() => {
    setName(currentUser?.name || '');
  }, [currentUser]);

  // Submit i profilit
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSaveName(trimmedName);
    setMessage('Profile updated successfully.');
  };

  return (
    <section className="profile-page">
      <div className="page-header">
        <h2>Profile</h2>
        <p>View your account details and update your display name.</p>
      </div>

      <form className="form-card profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-email">Email</label>
          <input id="profile-email" value={currentUser?.email || ''} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="profile-role">Role</label>
          <input id="profile-role" value={currentUser?.role || ''} readOnly />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </div>

        {message && <p className="success-text">{message}</p>}
      </form>
    </section>
  );
}

export default Profile;
