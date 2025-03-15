import { useState } from "react";
// import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    address: "",
    bank_account: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User Registered Successfully!");
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <textarea name="address" placeholder="Address" onChange={handleChange} required></textarea>
        <input type="text" name="bank_account" placeholder="Bank Account" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
