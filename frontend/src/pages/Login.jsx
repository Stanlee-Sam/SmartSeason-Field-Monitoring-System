import { Eye, Lock, Mail, Tractor } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.accessToken);
      toast.success("Login successful");

      const payload = JSON.parse(atob(response.data.accessToken.split(".")[1]));
      localStorage.setItem("userRole", payload.role);
      localStorage.setItem("userId", payload.userId);
      console.log("TOKEN PAYLOAD:", payload);

      if (payload.role === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-agent");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-50">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl sm:h-96 sm:w-96" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-primary) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-110 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_24px_rgba(45,106,79,0.08)] sm:p-8">
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-6 rounded-2xl bg-primary/10 p-4">
              <Tractor className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-[2rem] font-semibold leading-[1.3] tracking-[-0.01em] text-primary">
              SmartSeason
            </h1>
            <p className="text-[15px] md:text-[20px] text-center text-on-surface-variant">
              Farm Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-surface"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                  value={email}
                  onChange={handleEmailChange}
                  id="email"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-12 py-3 text-base font-normal leading-[1.6] text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="name@farm.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  className="block text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="text-xs font-medium leading-[1.2] text-primary hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  id="password"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-12 py-3 text-base font-normal leading-[1.6] text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="••••••••"
                  type="password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline transition hover:text-primary"
                  aria-label="Toggle password visibility"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-2 focus:ring-primary/20"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-xs font-medium leading-[1.2] text-on-surface-variant"
                htmlFor="remember"
              >
                Remember this device
              </label>
            </div>

            <button
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-primary shadow-md transition hover:bg-tertiary active:scale-[0.98]"
              type="submit"
            >
              {loading ? <ClipLoader /> : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-row items-center justify-center gap-2">
            <p className="text-xs font-medium leading-[1.2] tracking-[0.24em] text-on-surface-variant">
              Don&apos;t have an account?
            </p>

            <Link
              to="/signup"
              className="text-primary text-[13px] transition-colors hover:text-tertiary"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
