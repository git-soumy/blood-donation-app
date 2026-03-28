import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import useIsMobile from "../useIsMobile";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.wrapper(isMobile)}>
      <div style={styles.navbar(isMobile)}>
        <div style={styles.logoSection(isMobile)}>
          <div style={styles.logoCircle}>🩸</div>
          <div>
            <h2 style={styles.logoText(isMobile)}>BloodCare</h2>
            <p style={styles.logoSubtext}>Smart Blood Donation Platform</p>
          </div>
        </div>

        <div style={styles.links(isMobile)}>
          <Link to="/" style={{ ...styles.link(isMobile), ...(isActive("/") ? styles.activeLink : {}) }}>
            Home
          </Link>

          <Link to="/dashboard" style={{ ...styles.link(isMobile), ...(isActive("/dashboard") ? styles.activeLink : {}) }}>
            Dashboard
          </Link>

          <Link to="/hospitals" style={{ ...styles.link(isMobile), ...(isActive("/hospitals") ? styles.activeLink : {}) }}>
            Hospitals
          </Link>

          <Link to="/login" style={{ ...styles.link(isMobile), ...(isActive("/login") ? styles.activeLink : {}) }}>
            Login
          </Link>

          <Link to="/signup" style={{ ...styles.link(isMobile), ...(isActive("/signup") ? styles.activeLink : {}) }}>
            Sign Up
          </Link>

          <button onClick={handleLogout} style={styles.logoutBtn(isMobile)}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: (isMobile) => ({
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: isMobile ? "10px 10px 0" : "14px 20px 0",
  }),

  navbar: (isMobile) => ({
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: isMobile ? "16px" : "18px 24px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #dc2626)",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.28)",
  }),

  logoSection: (isMobile) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: isMobile ? "100%" : "auto",
    justifyContent: isMobile ? "center" : "flex-start",
    textAlign: isMobile ? "center" : "left",
  }),

  logoCircle: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.14)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    border: "1px solid rgba(255,255,255,0.18)",
  },

  logoText: (isMobile) => ({
    margin: 0,
    color: "white",
    fontSize: isMobile ? "22px" : "24px",
    fontWeight: "800",
  }),

  logoSubtext: {
    margin: 0,
    color: "#dbeafe",
    fontSize: "12px",
  },

  links: (isMobile) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: isMobile ? "100%" : "auto",
  }),

  link: (isMobile) => ({
    textDecoration: "none",
    color: "white",
    padding: isMobile ? "9px 12px" : "10px 16px",
    borderRadius: "12px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontSize: isMobile ? "14px" : "15px",
  }),

  activeLink: {
    background: "rgba(255,255,255,0.18)",
  },

  logoutBtn: (isMobile) => ({
    padding: isMobile ? "9px 12px" : "10px 16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #ef4444, #dc2626)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: isMobile ? "14px" : "15px",
  }),
};

export default Navbar;