import React from 'react';
import './HomePage.css';

function HomePage() {
  const User = JSON.parse(sessionStorage.getItem('user'));

  return (
    <section className='homePage-section'>
      {User ? (
        <div className='container'>
          <div className="user">
            <div className="userprofile">
              <div className="img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxBYa0lMXm5bqjKbfrisOS2sGdlvIiQbZAhplUzjebg&s" alt="" />
              </div>
              <div className="info">
                <div className="nameofuser">
                  <h2>{User.userName}</h2>
                  <p>Email: {User.email}</p>
                  <p>Department: {User.department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h3>Real Time Sample Tracking</h3>
        </div>
      )}
    </section>
  );
}

export default HomePage;
