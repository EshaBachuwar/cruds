import axios from 'axios';
import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

const Home = () => {
  const [user, setUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: '',
    phone: '',
    email: '',
    hobbies: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('https://backend-cruds.onrender.com/api/user/');
      const initialData = res.data.map((item) => ({
        ...item,
        edit: false,
        selected: false,
      }));
      setUser(initialData);
    };
    fetchData();
  }, []);

  const handleEdit = (index) => {
    const updatedData = [...user];
    updatedData[index].edit = true;
    setUser(updatedData);
    console.log(user[index]);
  };

  const handleInputChange = (index, event, type) => {
    const updatedData = [...user];
    updatedData[index][type] = event.target.value;
    setUser(updatedData);
    // console.log(updatedData);
  };

  const handleDelete = async (index) => {
    try {
      const updatedData = [...user];
      const id = updatedData[index]._id;
      console.log(id);
      updatedData.splice(index, 1);
      setUser(updatedData);
      const data = await axios.delete(
        'https://backend-cruds.onrender.com/api/user/' + id
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const updatedData = [...user];
      console.log(updatedData);
      const id = updatedData[index]._id;
      const data = await axios.put(
        'https://backend-cruds.onrender.com/api/user/' + id,
        updatedData[index]
      );
      updatedData[index].edit = false;
      setUser(updatedData);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (index) => {
    const updatedData = [...user];
    updatedData[index].selected = !updatedData[index].selected;
    setUser(updatedData);
  };

  const handleNewEntry = () => {
    const updatedData = [...user];
    setShowForm(true);
    // updatedData.push({
    //   name: '',
    //   phone: '',
    //   email: '',
    //   hobbies: '',
    //   edit: true,
    // });
    setUser(updatedData);
  };

  const handleSave = async () => {
    try {
      const updatedData = [...user];
      const data = await axios.post(
        'https://backend-cruds.onrender.com/api/user/',
        newEntry
      );

      updatedData.push({ ...data.data, edit: false, selected: false });
      setUser(updatedData);
      setShowForm(false);
      setNewEntry({
        name: '',
        phone: '',
        email: '',
        hobbies: '',
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = () => {
    const updatedData = [...user];

    const selectedData = updatedData.filter((item) => item.selected === true);
    const sendingData = selectedData.map((item) => ({
      name: item.name,
      phone: item.phone,
      email: item.email,
      hobbies: item.hobbies,
    }));
    if (sendingData.length === 0) {
      alert('No User Selected');
      return;
    } else {
      try {
        axios.post('https://backend-cruds.onrender.com/api/email', sendingData);
        console.log(sendingData);
        alert('Email Sent');
      } catch (error) {
        alert('Email Not Sent');
      }
    }
  };

  return (
    <div className="position:relative">
      {showForm && (
        <div className="absolute top-1/3 left-1/4 w-1/2 shadow-lg rounded-md ">
          <div className="bg-cyan-900 m-0 p-3 shadow-lg shadow-cyan-500">
            <div className="flex flex-col justify-center items-center">
              <h1 className="pb-3 text-3xl text-cyan-200 font-bold mb-3">
                New Entry
              </h1>
              <input
                type="text"
                placeholder="Name"
                value={newEntry.name}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, name: e.target.value })
                }
                className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newEntry.phone}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, phone: e.target.value })
                }
                className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEntry.email}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, email: e.target.value })
                }
                className="bg-cyan-700 font-bold mb-1 text-white p-2 w-1/2 lg-w-1/3 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Hobbies"
                value={newEntry.hobbies}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, hobbies: e.target.value })
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
        </div>
      )}
      <h1 className="py-10 text-5xl text-cyan-600 font-extrabold">
        Display Table
      </h1>
      <div>
        <div className="flex justify-center mt-2">
          <table>
            <thead>
              <tr>
                <th className="p-3 text-white text-lg"></th>
                <th className="p-3 text-white text-lg">ID</th>
                <th className="p-3 text-white text-lg">Name</th>
                <th className="p-3 text-white text-lg">Phone Number</th>
                <th className="p-3 text-white text-lg">Email</th>
                <th className="p-3 text-white text-lg">Hobbies</th>
              </tr>
            </thead>
            <tbody className="m-2">
              {user.map((user, ind) => (
                <tr key={user.id} className="" style={{ borderRadius: '2rem' }}>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckbox(ind)}
                    />
                  </td>
                  <td className="p-2 text-white">{ind + 1}</td>
                  <td className="p-2 ">
                    <input
                      type="text"
                      value={user.name}
                      // defaultValue={user.name}
                      readOnly={!user.edit}
                      className="p-2 "
                      onChange={(event) =>
                        handleInputChange(ind, event, 'name')
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={user.phone}
                      // defaultValue={user.phone}
                      readOnly={!user.edit}
                      className="p-2"
                      onChange={(event) =>
                        handleInputChange(ind, event, 'phone')
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={user.email}
                      // defaultValue={user.email}
                      readOnly={!user.edit}
                      className="p-2 "
                      onChange={(event) =>
                        handleInputChange(ind, event, 'email')
                      }
                    />
                  </td>
                  <td className=" p-2">
                    <input
                      type="text"
                      value={user.hobbies}
                      // defaultValue={user.hobbies}
                      readOnly={!user.edit}
                      className="p-2 "
                      onChange={(event) =>
                        handleInputChange(ind, event, 'hobbies')
                      }
                    />
                  </td>
                  {!user.edit && (
                    <td
                      className="p-2 text-cyan-700 font-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(ind)}
                    >
                      Edit
                    </td>
                  )}
                  {user.edit && (
                    <td
                      className="p-2 text-cyan-700 font-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleUpdate(ind)}
                    >
                      Update
                    </td>
                  )}
                  <td
                    className="p-2 text-red-800 font-extrabold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(ind)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={handleNewEntry}
            className=" text-white p-2 px-3 mt-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 shadow hover:shadow-white font-bold mx-1"
          >
            Add New Entry
          </button>
          <button
            className=" text-white p-2 px-3 mt-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 shadow hover:shadow-white font-bold mx-1"
            onClick={handleSendEmail}
          >
            Send Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
