import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/Dashboard.css'; // Create a CSS file for styling

const DashboardPage = () => {
  const location = useLocation();
  const userEmail = location.state ? location.state.userEmail : null; // Get the passed userEmail from location.state
  const [userInfo, setUserInfo] = useState(null); // To store user information
  const [showCourses, setShowCourses] = useState(false);

  // Log to check if userEmail is being passed correctly
  console.log('User Email:', userEmail);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${userEmail}`);
        console.log('Fetched user info:', response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    if (userEmail) {
      fetchUserInfo(); // Only fetch if userEmail is available
    }
  }, [userEmail]); // Re-run this effect if the email changes

  const handleExploreClick = () => {
    setShowCourses(true); // Show courses when "Explore" is clicked
  };

  const courses = {
    AI: ['Python', 'Machine Learning', 'Deep Learning'],
    WebDevelopment: ['MERN Stack', 'React', 'Node.js'],
  };

  return (
    <div className="dashboard">
      {userInfo ? (
        <>
          <h1>Welcome, {userInfo.name}!</h1>
          <h2>Your Skills:</h2>
          <ul>
            {userInfo.skills && userInfo.skills.length > 0 ? (
              userInfo.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills added yet</li>
            )}
          </ul>
          <button className="explore-button" onClick={handleExploreClick}>
            Explore Courses
          </button>

          {showCourses && (
            <div className="courses">
              <h2>Courses by Domain</h2>
              <div className="course-list">
                <h3>AI</h3>
                <ul>
                  {courses.AI.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>

                <h3>Web Development</h3>
                <ul>
                  {courses.WebDevelopment.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default DashboardPage;
