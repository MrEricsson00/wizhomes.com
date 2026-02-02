import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../constants';

interface SignupProps {
  onSignup: (userData: { email: string; name: string }) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Store user data in localStorage
      const users = JSON.parse(localStorage.getItem('wiz_users') || '[]');
      const userExists = users.some((u: any) => u.email === formData.email);

      if (userExists) {
        setErrors({ email: 'Email already registered' });
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: `U${Math.floor(Math.random() * 10000)}`,
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('wiz_users', JSON.stringify(users));
      localStorage.setItem('wiz_currentUser', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }));

      onSignup({
        email: formData.email,
        name: formData.fullName
      });

      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="p-12">
            <div className="text-center mb-10">
              <Logo className="h-20 mb-8" />
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                Create Your WIZ HOMES Account
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.fullName
                      ? 'border-red-600 dark:border-red-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-medium`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-600 text-xs font-bold ml-1">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.email
                      ? 'border-red-600 dark:border-red-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-medium`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-600 text-xs font-bold ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.password
                      ? 'border-red-600 dark:border-red-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-medium`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-600 text-xs font-bold ml-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border ${
                    errors.confirmPassword
                      ? 'border-red-600 dark:border-red-600'
                      : 'border-zinc-200 dark:border-zinc-700'
                  } rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-medium`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-red-600 text-xs font-bold ml-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2 ml-1">
                <input type="checkbox" id="agree" className="accent-red-600 w-4 h-4 rounded" required />
                <label htmlFor="agree" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 select-none">
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2 active:scale-95 uppercase tracking-widest text-[11px]"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Account...</span>
                  </span>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-red-600 font-black hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 text-center border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
              © 2024 WIZ HOMES EXTERIORS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
