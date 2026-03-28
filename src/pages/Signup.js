import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../useIsMobile";

function Signup() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("donor");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !role) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role,
      });

      alert("Signup Successful");

      navigate("/dashboard", {
        state: { role: role, email: email },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page(isMobile)}>
      <div style={styles.overlay}>
        <div style={styles.container(isMobile)}>
          <div style={styles.leftPanel(isMobile)}>
            <h1 style={styles.brandTitle(isMobile)}>Join BloodCare ❤️</h1>
            <p style={styles.brandText(isMobile)}>
              Create your account and choose your role to access the right dashboard.
            </p>

            <div style={styles.badgeRow(isMobile)}>
              <span style={styles.badge}>Easy Signup</span>
              <span style={styles.badge}>Safe Access</span>
              <span style={styles.badge}>Role Based Access</span>
            </div>
          </div>

          <div style={styles.card(isMobile)}>
            <h2 style={styles.title(isMobile)}>Create Account</h2>
            <p style={styles.subtitle}>Start your journey with BloodCare</p>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input}
            >
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
            </select>

            <button onClick={handleSignup} style={styles.button}>
              Sign Up
            </button>

            <p style={styles.footerText}>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: (isMobile) => ({
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #dc2626 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isMobile ? "16px" : "30px 20px",
  }),

  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  container: (isMobile) => ({
    width: "100%",
    maxWidth: "1050px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
  }),

  leftPanel: (isMobile) => ({
    flex: "1 1 450px",
    minHeight: isMobile ? "auto" : "560px",
    color: "white",
    padding: isMobile ? "28px 20px" : "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
  }),

  brandTitle: (isMobile) => ({
    fontSize: isMobile ? "32px" : "42px",
    marginBottom: "18px",
    fontWeight: "800",
    textAlign: isMobile ? "center" : "left",
  }),

  brandText: (isMobile) => ({
    fontSize: isMobile ? "15px" : "17px",
    lineHeight: "1.7",
    color: "#e2e8f0",
    maxWidth: "420px",
    marginBottom: "24px",
    textAlign: isMobile ? "center" : "left",
    alignSelf: isMobile ? "center" : "flex-start",
  }),

  badgeRow: (isMobile) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: isMobile ? "center" : "flex-start",
  }),

  badge: {
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    fontSize: "13px",
  },

  card: (isMobile) => ({
    flex: "1 1 380px",
    background: "white",
    padding: isMobile ? "28px 20px" : "50px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: isMobile ? "auto" : "560px",
  }),

  title: (isMobile) => ({
    fontSize: isMobile ? "28px" : "32px",
    marginBottom: "10px",
    color: "#0f172a",
    textAlign: "center",
    fontWeight: "700",
  }),

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "26px",
    fontSize: "15px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "white",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "14px",
    background: "linear-gradient(90deg, #2563eb, #dc2626)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.28)",
  },

  footerText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#475569",
    fontSize: "14px",
  },

  link: {
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Signup;