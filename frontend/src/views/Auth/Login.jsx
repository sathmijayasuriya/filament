// src/pages/Login.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
        username:form.email,
        password:form.password,
    }
    console.log(payload)
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",payload);
      login(res.data.token); // token
      console.log(res.data.token)
      navigate("/dashboard"); 
    }catch(error){
      alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-10 rounded-2xl border-gray-200 shadow-none ">
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img src={Logo} alt="Logo" className="h-13 cursor-pointer" />
            </div>
            <p className="text-2xl font-bold">Sign in</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@filamentphp.com"
                className="rounded-md"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password"
                  className="rounded-md pr-10 border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="border-orange-400 data-[state=checked]:bg-orange-400"
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-400 hover:bg-primary text-white"
            >
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
