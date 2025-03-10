import { useState } from 'react';
import { app, database } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 

function SignUp() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const collectionRef = collection(database, "users");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null); 
    setLoading(true); 

    const { email, password } = formData;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

       // Firestore storage of created in users
        await addDoc(collectionRef, {
          email: user.email,
          createdAt: new Date(),
        });

        setSuccess('Account created successfully!');
        setTimeout(() => {
          navigate('/Login'); 
        }, 100);
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred during sign up.';
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleClick = async () => {
    setError(null); 
    setSuccess(null); 
    setLoading(true);

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const user = userCredential.user;

       // Firestore storage of created in users
        await addDoc(collectionRef, {
          email: user.email,
          createdAt: new Date(),
        });

        setSuccess('Account created successfully!');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred during sign up.';
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">
          Join FL<span className="highlight">ii</span>TS Today
        </h1>

        <h3 onClick={handleClick}>Login With Google</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Email"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Password"
            required
          />

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </button>

          <div className="login-link">
            Already have an account?{' '}
            <Link to="/Login" className="footer-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
