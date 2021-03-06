import React, { useEffect, useState } from "react";
import Axios from "axios";

const getUrl = "http://localhost:8080/user/";

export const Delete = (props) => {
  const [deleteUser, setDeleteUser] = useState({
    name: "",
    lname: "",
  });

  const { id } = props.match.params;

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await Axios.get(getUrl + id);
        setDeleteUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id, setDeleteUser]);

  const handleInput = (e) => {
    setDeleteUser({
      ...deleteUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const deleteData = async () => {
      try {
        const { data } = await Axios.delete(
          `http://localhost:8080/user/delete/${id}`,
          deleteUser
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    deleteData();

    props.history.push("/");
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            className="form-control"
            name="name"
            placeholder="First Name"
            onChange={handleInput}
            value={deleteUser.name}
          />
        </p>
        <p>
          <input
            className="form-control"
            name="lname"
            placeholder="Last Name"
            onChange={handleInput}
            value={deleteUser.lname}
          />
        </p>

        <button className="btn btn-danger btn-block">
          Add <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};
