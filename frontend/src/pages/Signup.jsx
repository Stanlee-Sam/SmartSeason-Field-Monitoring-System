import axios from "axios";
import { Eye, Lock, Mail, Tractor, User } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please enter name, email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/auth/register`, {
        name,
        email,
        password,
      });

      console.log(response.data);
      toast.success("Signup successful");
      navigate("/login");
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
            <h3 className="text-[15px] md:text-[20px] font-bold">
              Create your account
            </h3>
            <p className="text-[15px] md:text-[20px] text-center text-on-surface-variant">
              Join the precision farming revolution{" "}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-surface"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                  value={name}
                  onChange={handleNameChange}
                  id="name"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-12 py-3 text-base font-normal leading-[1.6] text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
            </div>
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
                I agree to the{" "}
                <span className="text-primary font-bold">Terms of Service</span>{" "}
                and{" "}
                <span className="text-primary font-bold">Privacy Policy.</span>
              </label>
            </div>

            <button
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold leading-[1.2] tracking-[0.02em] text-on-primary shadow-md transition hover:bg-tertiary active:scale-[0.98]"
              type="submit"
            >
              {loading ? <ClipLoader /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-row items-center justify-center gap-2">
            <p className="text-xs font-medium leading-[1.2] tracking-[0.24em] text-on-surface-variant">
              Already have an account?
            </p>

            <Link
              to="/"
              className="text-primary text-[13px] transition-colors hover:text-tertiary"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
