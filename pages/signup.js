import { useState, useRef, useEffect } from "react";
import { getProviders, useSession, getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "../utils/sanity";

function Signup(props) {
  //   const [session, loading] = useSession();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        enteredEmail,
        enteredPassword,
        enteredConfirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
    }
    console.log("data", data);

    if (data.message !== null) {
      setError(data.message);
    }
    if (response.ok) {
      router.replace("/login");
    }
  }

  return (
    <div className="flex flex-col mt-20 justify-around md:flex-row">
      <div className=" -mt-12 md:-mt-10 md:ml-16">
        <Image src="/image/signup.png" width={480} height={480} />
      </div>
      <section className="ml-auto mr-auto w-4/5 mb-8 md:w-1/3">
        <form
          onSubmit={submitHandler}
          className="flex flex-col md:w-4/5 h-2/3 mt-18 "
        >
          {error ? (
            <div className="bg-red-400 text-red-900 border border-red-900 text-center p-4 mb-4">
              {error}
            </div>
          ) : null}
          <div>
            <h3 className="text-center my-4 font-semibold text-5xl">SIGN UP</h3>
            <label htmlFor="email" className="text-sm font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              className="block h-10 w-full mb-2  rounded border-black border-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-normal">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              className="block h-10 w-full mb-2 rounded border-black border-2"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-normal">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
              className="block h-10 w-full mb-8 rounded border-black border-2"
            />
          </div>
          <div>
            <button className="h-10 w-full bg-gray-800 mb-2 mt-8 text-xs text-white rounded mr-1">
              SIGNUP
            </button>
            <Link href="/login">
              <a className="text-sm font-light">
                Already have an account? <strong>LOG IN</strong>
              </a>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Signup;
