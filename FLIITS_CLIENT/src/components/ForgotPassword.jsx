import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import '../styles/ForgotPassword.css';


function ForgotPassword() {
  const auth = getAuth();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Password reset email sent! Please check your inbox.');
        setTimeout(() => {
          navigate('/login'); 
        }, 3000); 
        setEmail('');
      })
      .catch((err) => {
        const errorMessage = err.message || 'Failed to send password reset email.';
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">
          Reset Your Password
        </h1>
        <form onSubmit={handleResetPassword} className="forgot-password-form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="forgot-password-input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="forgot-password-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
