import React from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { Link, json, useNavigate } from "react-router-dom";
import { object, string, number, date, InferType, ref } from "yup";
import axios from "axios";
import { toastError, toastSuccess } from "../components/Toast";

let schema = object({
  text: string().required("Text is required"),
  time: string().required("Time is required"),
});

export default function Create() {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        text: e.target.text.value,
        time: e.target.time.value,
      };
      console.log(formData);
      await schema.validate(formData);

      const res = await axios.post(
        "http://192.168.1.37:3001/todo/create",
        {
          text: e.target.text.value,
          time: e.target.time.value,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      toastSuccess(res.data.message)
      if (res.data) {
        navigate("/");
      }
    } catch (error) {
      toastError(error.message)
      setError(error.message);
    }
  };
  return (
    <div>
      <Link
        className="submitButton"
        style={{ width: "auto"}}
        to="/"
      >
        Back
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px",
          borderRadius: "16px",
          backgroundColor: "whitesmoke",
          minWidth: "360px",
          marginTop:"16px"
        }}
      >
        <div>
          <h2 className="text-xl font-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>Create Todo</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text">Text</label>
            <input id="text" name="text" className="textInput" type="text" />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input id="time" name="time" className="textInput" type="date" />
          </div>
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 0, 0, .4)",
                color: "rgba(255, 0, 0, 1)",
                padding: "6px",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          <div>
            <input className="submitButton" type="submit" value="Create Todo" />
          </div>
        </form>
      </div>
    </div>
  );
}
