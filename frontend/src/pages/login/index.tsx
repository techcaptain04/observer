import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import withAuth from '../../hoc/with-auth-redirect';
import { useLocalStorage } from '../../hooks/useLocalstorage';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const navigate = useNavigate();

  // const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useLocalStorage('access_token', '');

  const handleLogin = async (e: React.FormEvent) => {
    // Redirect to protected route after login

    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_API + '/auth/login',
        {
          username,
          password
        }
      );
      if (res.data.message === 'success') {
        // alert(res.data.message);
        console.log(res.data.access_token);
        // setToken(res.data.access_token);
        // Simulate login and set access token in local storage
        setAccessToken(res.data.access_token);
        // localStorage.setItem("access_token", token);
        window.location.href = '/'; // Adjust based on your routing structure
      } else {
        // alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  return (
    <>
      <div className="background-grey">
        <div className="h-full">
          <div className="flex min-h-[866px] flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/* <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-10 w-auto"
              /> */}
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      {/* <a
                        href="#"
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        Forgot password?
                      </a> */}
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <a
                href="#"
                className="flex justify-center mt-3 text-[14px] underline text-indigo-400 hover:text-indigo-300"
              >
                {/* <Link to={"/signup"}>Signup</Link> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withAuth(Login);
