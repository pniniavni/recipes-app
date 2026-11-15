import { useState, useId } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/auth";

export default function LoginControlled() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const [values, setValues] = useState({
    email: "chef@recipes.com",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!values.email) newErrors.email = "אימייל הוא שדה חובה";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      newErrors.email = "כתובת האימייל אינה תקינה";

    if (!values.password) newErrors.password = "סיסמא היא שדה חובה";
    else if (values.password.length < 6)
      newErrors.password = "הסיסמא חייבת להכיל לפחות 6 תווים";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = login(values);
    if (!user) {
      setErrors({ general: "אימייל או סיסמא שגויים" });
      return;
    }

    setErrors({});
    navigate("/recipes");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>כניסה מבוקרת</h1>

      <div>
        <label htmlFor={emailId}>אימייל</label>
        <input
          id={emailId}
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor={passwordId}>סיסמא</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <button type="submit">התחברי</button>
    </form>
  );
}