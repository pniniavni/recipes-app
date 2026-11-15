import { useState, useId } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { login } from "../services/auth";
import { loginSchema } from "../utils/schema";

export default function LoginRHF() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "chef@recipes.com", password: "" },
  });

  function onSubmit(data) {
    const user = login(data);
    if (!user) {
      setGeneralError("אימייל או סיסמא שגויים");
      return;
    }
    setGeneralError("");
    navigate("/recipes");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>

      <div>
        <label htmlFor={emailId}>אימייל</label>
        <input id={emailId} type="text" {...register("email")} />
        {touchedFields.email && errors.email && (
          <p style={{ color: "red" }}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor={passwordId}>סיסמא</label>
        <input id={passwordId} type="password" {...register("password")} />
        {touchedFields.password && errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      {generalError && <p style={{ color: "red" }}>{generalError}</p>}

      <button type="submit">התחברי</button>
    </form>
  );
}
