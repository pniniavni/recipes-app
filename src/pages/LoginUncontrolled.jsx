import { useState, useId } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/auth";

// תשובה: בטופס לא מבוקר אי אפשר לבדוק תקינות בזמן הקלדה כי אין onChange ו-state.
// בודקים רק בשליחת הטופס, בתוך פונקציית ה-action.

export default function LoginUncontrolled() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "chef@recipes.com",
    password: "",
  });

  function handleAction(formData) {
    const data = Object.fromEntries(formData);
    const newErrors = {};

    if (!data.email) newErrors.email = "אימייל הוא שדה חובה";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      newErrors.email = "כתובת האימייל אינה תקינה";

    if (!data.password) newErrors.password = "סיסמא היא שדה חובה";
    else if (data.password.length < 6)
      newErrors.password = "הסיסמא חייבת להכיל לפחות 6 תווים";

    setValues(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = login(data);
    if (!user) {
      setErrors({ general: "אימייל או סיסמא שגויים" });
      return;
    }

    setErrors({});
    navigate("/recipes");
  }

  return (
    <form action={handleAction}>
      <h1>כניסה לא מבוקרת</h1>

      <div>
        <label htmlFor={emailId}>אימייל</label>
        <input
          id={emailId}
          name="email"
          type="text"
          defaultValue={values.email}
          key={"email" + values.email}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor={passwordId}>סיסמא</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          defaultValue={values.password}
          key={"password" + values.password}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <button type="submit">התחברי</button>
    </form>
  );
}