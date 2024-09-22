import React, { useState } from 'react';
import '../styles/Login.css'; // You can reuse the CSS from the login page
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState(['']);  // Initialize with one empty field
  const [interestedDomains, setInterestedDomains] = useState(['']);

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register/', {
        name, email, password,skills, interested_domains: interestedDomains
      });
      alert(response.data.message);
    } catch (error) {
      alert('Signup failed. User might already exist.');
    }
  };
  const handleSkillsChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleDomainsChange = (index, value) => {
    const newDomains = [...interestedDomains];
    newDomains[index] = value;
    setInterestedDomains(newDomains);
  };

  const addSkillField = () => {
    setSkills([...skills, '']);
  };

  const addDomainField = () => {
    setInterestedDomains([...interestedDomains, '']);
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <h2>Skills</h2>
        {skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => handleSkillsChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addSkillField}>Add Skill</button>

        <h2>Interested Domains</h2>
        {interestedDomains.map((domain, index) => (
          <input
            key={index}
            type="text"
            placeholder="Interested Domain"
            value={domain}
            onChange={(e) => handleDomainsChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addDomainField}>Add Domain</button>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
