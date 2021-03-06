import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";

const getUrl = "http://localhost:8080/user/";

export const Edit = (props) => {
  const [editUser, setEditUser] = useState({
    name: "",
    lname: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await Axios.get(getUrl + id);
        setEditUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id, setEditUser]);

  const handleInput = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addData = async () => {
      try {
        const { data } = await Axios.put(
          `http://localhost:8080/user/edit/${id}`,
          editUser
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    addData();
    props.history.push("/");
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            name="name"
            onChange={handleInput}
            type="text"
            value={editUser.name}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            name="lname"
            onChange={handleInput}
            type="text"
            value={editUser.lname}
          />
        </div>
        <button className="btn btn-warning btn-block">
          Update <i className="fas fa-edit"></i>
        </button>
      </form>
    </div>
  );
};
