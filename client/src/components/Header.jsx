import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header
      style={{
        backgroundColor: "whitesmoke",
        height: "80px",
        display: "flex",
        padding: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {user && (
        <>
          <h2 className="text-xl font-semibold">
            Hello{" "}
            <span style={{ color: "#6171E8", fontWeight: 700 }}>
              {user.username}
            </span>
          </h2>
          <div>
            <button onClick={handleLogout}>
              <CiLogout style={{ fontSize:"30px", color: "red" }} />
            </button>
          </div>
        </>
      )}
    </header>
  );
}
