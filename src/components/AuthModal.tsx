import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const endpoint = isLogin ? '/api/login/' : '/api/register/';
      
      // Format the data based on whether it's login or register
      const formattedData = isLogin ? {
        email: data.email,
        password: data.password
      } : {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        phone_number: data.phone_number,
        hospital_name: data.hospital_name,
        hospital_department: data.hospital_department,
        age: parseInt(data.age) || null
      };

      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
        credentials: 'include'  // Include cookies if any
      });

      const result = await response.json();

      if (response.ok && result.token) {
        // Store token and user info
        localStorage.setItem('token', result.token);
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        
        // Show success toast
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!', {
          description: "You're being redirected to the analysis page.",
          duration: 3000,
        });

        // Reset form
        reset();
        
        // Close modal
        onOpenChange(false);

        // Navigate after a short delay
        setTimeout(() => {
          navigate('/analysis');
        }, 1000);
      } else {
        // Show error toast with server message
        toast.error('Authentication failed', {
          description: result.error || 'Please check your credentials and try again.',
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      // Show network error toast
      toast.error('Connection failed', {
        description: 'Please check your internet connection and try again.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {isLogin ? "Welcome Back" : "Let's Start Learning"}
            </h2>
            <p className="text-gray-500">
              {isLogin ? "Please login to continue" : "Please sign up to continue"}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full py-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full py-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <FaApple className="w-5 h-5" />
              <span>Apple</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full py-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <FaFacebookF className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full py-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <FaLinkedinIn className="w-5 h-5 text-blue-700" />
              <span>LinkedIn</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Input
                  placeholder="Full Name"
                  {...register("full_name", { required: "Full name is required" })}
                  className={cn(
                    "h-12 px-4 rounded-xl border-gray-200 text-gray-900",
                    "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "placeholder:text-gray-400",
                    errors.full_name && "border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm ml-1">{errors.full_name.message as string}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={cn(
                  "h-12 px-4 rounded-xl border-gray-200 text-gray-900",
                  "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "placeholder:text-gray-400",
                  errors.email && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-1">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                className={cn(
                  "h-12 px-4 rounded-xl border-gray-200 text-gray-900",
                  "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "placeholder:text-gray-400",
                  errors.password && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm ml-1">{errors.password.message as string}</p>
              )}
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone_number", { required: "Phone number is required" })}
                    className="h-12 px-4 rounded-xl border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm ml-1">{errors.phone_number.message as string}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Hospital Name"
                      {...register("hospital_name", { required: "Hospital name is required" })}
                      className="h-12 px-4 rounded-xl border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    />
                    {errors.hospital_name && (
                      <p className="text-red-500 text-sm ml-1">{errors.hospital_name.message as string}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Department"
                      {...register("hospital_department", { required: "Department is required" })}
                      className="h-12 px-4 rounded-xl border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    />
                    {errors.hospital_department && (
                      <p className="text-red-500 text-sm ml-1">{errors.hospital_department.message as string}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <Button 
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full h-12 text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                isLogin ? "Sign In" : "Sign Up"
              )}
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          <p className="mt-6 text-center text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}