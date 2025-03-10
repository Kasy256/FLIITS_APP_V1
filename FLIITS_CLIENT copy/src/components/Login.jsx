import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, database } from '../firebaseConfig';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';
import { collection, addDoc } from "firebase/firestore";

function Login() {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const collectionRef = collection(database, "users");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
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
    setLoading(true); 

    const { email, password } = formData;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Firestore storage of logged in users
        addDoc(collectionRef, {
          email: user.email,
          uid: user.uid,
          loggedInAt: new Date().toISOString(), 
        })
          .then(() => {
            console.log("User data added to Firestore!");
          })
          .catch((err) => {
            console.error("Error adding user data to Firestore:", err.message);
          });

        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';
        setTimeout(() => {
          navigate(redirectTo); 
        }, 100);
      })
      .catch((error) => {
        let customErrorMessage;
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          customErrorMessage = "Invalid Email or Password.";
        } else {
          customErrorMessage = "Invalid Email or Password.";
        }
        setError(customErrorMessage);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleClick = async (e) => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;

        // Firestore storage of logged in users
        addDoc(collectionRef, {
          email: user.email,
          uid: user.uid,
          loggedInAt: new Date().toISOString(), 
        })
          .then(() => {
            console.log("User data added to Firestore!");
          })
          .catch((err) => {
            console.error("Error adding user data to Firestore:", err.message);
          });

        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';
        setTimeout(() => {
          navigate(redirectTo);
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

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">
          Welcome to FL<span className="highlight">ii</span>TS
        </h1>
        <h3 onClick={handleClick}>Login With Google</h3>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            placeholder='Your Email'
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            placeholder='Your Password'
            required
          />
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logining in...' : 'Login'}
          </button>
        </form>
        <div className="Signup_link">
          <span>Don’t have an account? </span>
          <Link to="/Signup" className="footer-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;