import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API;

export const Users = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/api/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${API}/api/projects/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const getUsers = async (e) => {
    const res = await fetch(`${API}/api/projects/`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const editUser = async (id) => {
    const res = await fetch(`${API}/api/projects/${id}/`);
    const data = await res.json();
    // console.log(data);
    // console.log(id);
    setEditing(true);
    setId(data.id);

    setForm({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it");
    console.log(id);
    if (userResponse) {
      const res = await fetch(`${API}/api/projects/${id}/`, {
        method: "DELETE",
      });
      console.log(res);
      await getUsers();
    }
  };

  return (
    <div className="row">
      <hr></hr>
      <div className="mx-auto">
        <p className="h3">Form:</p>
        <span className="h5">Enter your details.</span>
      </div>
      <div className="container-fluid p-5">
        <form onSubmit={handleSubmit} className="card card-body w-50 mx-auto">
          <div className="form-group m-1">
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={form.name}
              className="form-control"
              placeholder="Name"
              autoFocus
            />
          </div>
          <div className="form-group m-1">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={form.email}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group m-1 mb-4">
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={form.password}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Edit" : "Create"}
          </button>
        </form>
      </div>
      <hr></hr>
      <div className="mx-auto">
        <p className="h3">Users' table:</p>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-block"
                      onClick={(e) => editUser(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={(e) => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
