import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Modal from "react-modal";
import PDFDocument from "../components/PDFDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toastError, toastSuccess } from "../components/Toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Home() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const navigate = useNavigate();
  const filterTodo = (start, end) => {
    const formatStart = formatDate(start);
    const formatEnd = formatDate(end);
    console.log(formatStart);
    console.log(formatEnd);
    const filteredTodos = todos.filter((todo) => {
      const todoTime = new Date(todo.time);
      const startTime = new Date(formatStart);
      const endTime = new Date(formatEnd);
      return todoTime >= startTime && todoTime <= endTime;
    });
    setFilterTodos(filteredTodos);
  };
  const getTodo = async () => {
    try {
      const res = await axios.get("http://192.168.1.37:3001/todo/getAll", {
        headers: {
          Authorization: token,
        },
      });
      res.data.data.reverse();
      setTodos(res.data.data);
      setFilterTodos(res.data.data);
    } catch (error) {
      toastError(error)
    }
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckChecked = async (id) => {
    try {
      const res = await axios.put(
        "http://192.168.1.37:3001/todo/check/" + id,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toastSuccess(res.data.message);

      setCheckedItems(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }));

    } catch (error) {
      toastError(error)
    }
  };

  const handleDelete = async (id) => {
    try {
      const resDelete = await axios.delete("http://192.168.1.37:3001/todo/delete/" + id, {
        headers: {
          Authorization: token,
        },
      });
      const res = await axios.get("http://192.168.1.37:3001/todo/getAll", {
        headers: {
          Authorization: token,
        },
      });
      setTodos(res.data.data.reverse());
      setFilterTodos(res.data.data.reverse());
      toastSuccess(resDelete.data.message)
    } catch (error) {
      toastError(error)
    }
  };
  const handleUpdate = async (id) => {
    navigate("/update/" + id);
  };

  useEffect(() => {
    getTodo();

  }, [checkedItems]);




  const handleSelect = (e) => {
    e.preventDefault();
    closeModal();
    filterTodo(e.target.stime.value, e.target.etime.value);
  };

  return (
    <div style={{ width: "80%" }}>
      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-2xl font-semibold">TODO APP</h1>

        <button
          className="submitButton"
          style={{ width: "auto" }}
          onClick={openModal}
        >
          Pick To Around
        </button>
        <PDFDownloadLink
          className="submitButton"
          style={{ width: "auto" }}
          document={<PDFDocument data={filterTodos} />}
          fileName="document.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "PDF Creating..." : "Download PDF"
          }
        </PDFDownloadLink>
        <Link className="submitButton" style={{ width: "auto" }} to="/create">
          Create Todo
        </Link>
      </div>
      <div
        style={{
          borderRadius: "16px",
          padding: "16px 12px",
          height: "700px",
          background: "#ECEDF6",
        }}
      >
        {filterTodos.map((item, index) => (
          <div
            key={index}
            style={{
              // border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: "white",
              borderRadius: "14px",
              marginBottom: "12px",
              textDecoration: item?.checked ? 'line-through' : 'none'
            }}
          >
            <input
              style={{ width: "50px", height: "20px" }}
              type="checkbox"
              onChange={() => handleCheckChecked(item.todo_id)}
              defaultChecked={item?.checked}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>{item.text}</p>
              <p style={{ fontSize: "15px" }}> {item.time}</p>
            </div>
            <div style={{ gap: "1rem", display: "flex" }}>
              <button
                onClick={() => handleDelete(item.todo_id)}
                style={{
                  background: "#ECEDF6",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <MdDelete size={24} />
              </button>
              <button
                onClick={() => handleUpdate(item.todo_id)}
                style={{
                  background: "#ECEDF6",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <MdEdit size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSelect}>
          <div>
            <label htmlFor="stime">Start Time</label>
            <input id="stime" name="stime" className="textInput" type="date" />
          </div>

          <div>
            <label htmlFor="etime">End Time</label>
            <input id="etime" name="etime" className="textInput" type="date" />
          </div>
          <div>
            <button
              className="submitButton"
              value="Default"
              onClick={() => {
                setFilterTodos(todos);
                closeModal();
              }}
            >
              Default
            </button>
          </div>
          <div>
            <input className="submitButton" type="submit" value="Pick" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
