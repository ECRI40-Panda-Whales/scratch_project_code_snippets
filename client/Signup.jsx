import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [userCreated, setUserCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userCreated) {
      navigate('/login');
    }
  }, [navigate, userCreated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {};
    user.username = e.target.elements.username.value;
    user.password = e.target.elements.password.value;

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((data) => {
        if (data.status === 201) {
          setUserCreated(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id='signupPage'>
      <div className='ProjectName'>Code Snippets</div>
      <div className='credentialBox'>
        <form onSubmit={handleSubmit}>
          <input type='text' name='username' />
          <input type='password' name='password' />
          <button type='submit'>Sign Up</button>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
