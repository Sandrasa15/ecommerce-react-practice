import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contex/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Auth() {
   const { signUp, login } = useAuth() || {};
   const navigate = useNavigate();
   const [mode, setMode] = useState("signup");
   const [error, setError] = useState(null);
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   function onSubmit(data) {
      setError(null);

      const result = mode === "signup"
         ? signUp(data.email, data.password)
         : login(data.email, data.password);

      if (result?.success) {
         navigate("/");
      } else {
         setError(result?.error || "Something went wrong");
      }
   }

   return (
      <div className="page">
         <div className="container">
            <div className="auth-container">
               <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Log In"}</h1>
               {error && <div className="error-message">{error}</div>}
               <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                     <label className="form-label" htmlFor="email">Email</label>
                     <input
                        className="form-input"
                        type="email"
                        id="email"
                        {...register("email", { required: "Email is required" })}
                     />

                     {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                  <div className="form-group">
                     <label className="form-label" htmlFor="password">Password</label>
                     <input
                        className="form-input"
                        type="password"
                        id="password"
                        {...register("password", {
                           required: "Password is required",
                           minLength: { value: 6, message: "Password must be at least 6 characters long" },
                           maxLength: { value: 12, message: "Password must not exceed 12 characters" }
                        })}
                     />

                     {errors.password && <span className="form-error">{errors.password.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">
                     {mode === "signup" ? "Sign Up" : "Log In"}
                  </button>
               </form>

               <div className="auth-switch">
                  {mode === "signup" ? (
                     <p>
                        Already have an account?
                        <span
                           className="auth-link"
                           onClick={() => {
                              setError(null);
                              setMode("login");
                           }}
                        >
                           Login
                        </span>
                     </p>
                  ) : (
                     <p>
                        Don&apos;t have an account?
                        <span
                           className="auth-link"
                           onClick={() => {
                              setError(null);
                              setMode("signup");
                           }}
                        >
                           Sign Up
                        </span>
                     </p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}