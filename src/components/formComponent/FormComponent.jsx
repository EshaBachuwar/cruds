import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hobbies: '',
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSave = async () => {
    try {
      if (validateEmail(formData.email)) {
        const res = await axios.post(
          'https://backend-cruds.onrender.com/api/user/',
          formData
        );
        navigate('/home');
      } else {
        alert('Invalid Email');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <h1 className="pb-3 text-3xl text-cyan-200 font-bold mb-3">
          Enter Details
        </h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
        />
        <input
          type="text"
          placeholder="Hobbies"
          value={formData.hobbies}
          onChange={(e) =>
            setFormData({ ...formData, hobbies: e.target.value })
          }
          className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
        />
        <button
          className=" text-white p-2 px-3 mt-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 shadow hover:shadow-white font-bold"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
