
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  AlertCircle,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate(
        from.startsWith('/admin') ? '/' : from,
        { replace: true },
      );
    }
  }, [user, navigate, from]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const loggedUser = await login(normalizedEmail, password);

      if (loggedUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(
          from.startsWith('/admin') ? '/' : from,
          { replace: true },
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-7 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl ">
            <img
              src="/logo.png"
              alt="WMS Logo"
              className="h-full w-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
            <span className="text-purple-600">LienDinh</span>
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Warehouse Management System
          </p>
        </div>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.04] sm:p-9">
          <div className="mb-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              SECURE ACCESS
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Chào mừng trở lại!
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Đăng nhập để tiếp tục quản lý kho hàng của bạn.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="leading-5">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Địa chỉ email
              </label>

              <div className="group relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-purple-600" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700"
                >
                  Mật khẩu
                </label>

                <Link
                  to="#"
                  className="text-xs font-bold text-purple-600 transition-colors hover:text-purple-700 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="group relative">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-purple-600" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập mật khẩu"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm font-medium text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  aria-pressed={showPassword}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-md shadow-purple-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
          <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                Tài khoản test
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <button
                  type="button"
                  onClick={() => setEmail('admin@wms.com')}
                  className="font-semibold text-slate-800 transition-colors hover:text-purple-600"
                >
                  admin@wms.com
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Mật khẩu</span>
                <button
                  type="button"
                  onClick={() => setPassword('admin123')}
                  className="font-semibold text-slate-800 transition-colors hover:text-purple-600"
                >
                  admin123
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-center text-xs leading-5 text-slate-500">
              Hệ thống quản lý kho hàng
              <span className="mx-2 text-slate-300">•</span>
              Bảo mật và hiệu quả
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} WMS LienDinh. All rights reserved.
        </p>
      </div>
    </main>
  );
}
