import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import { object, string, number, date, InferType, ref } from "yup";
import axios from "axios";
import { toastError, toastSuccess } from "../components/Toast";

let schema = object({
  text: string().required("Text is required"),
  time: string().required("Time is required"),
});

export default function Update() {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(null);
  const getTodo = async () => {
    try {
      const res = await axios.get(
        "http://192.168.1.37:3001/todo/getOne/" + id,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTodo(res.data.data);
    } catch (error) {
      toastError(error)
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        text: e.target.text.value,
        time: e.target.time.value,
      };
      console.log(formData);
      await schema.validate(formData);

      const res = await axios.put(
        "http://192.168.1.37:3001/todo/update/" + id,
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
      toastSuccess(res.data.message)
      console.log(res.data);
      if (res.data) {
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <Link className="submitButton" style={{ width: "auto" }} to="/">
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
          marginTop: "16px",
        }}
      >
        <div>
          <h2 className="text-xl font-semibold" style={{ marginTop: 0, marginBottom: "12px" }}>Update Todo</h2>
        </div>
        {todo && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text">Text</label>
              <input id="text" name="text" className="textInput" type="text" defaultValue={todo.text}/>
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input id="time" name="time" className="textInput" type="date"defaultValue={todo.time} />
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
              <input
                className="submitButton"
                type="submit"
                value="Update Todo"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
