import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getProviders, useSession, getSession, signIn } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

function Login(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/");
        // console.log("ok");
      }
      if (result.error) {
        setError(result.error);
      }
      // console.log("result", result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col mt-20 justify-around md:flex-row">
      <div className=" -mt-12 md:-mt-10 md:ml-16">
        <Image src="/image/login.png" width={480} height={480} />
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
            <h3 className="text-center my-4 font-semibold text-3xl">LOG IN</h3>
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
              className="block h-10 w-full mb-8 rounded border-black border-2"
            />
          </div>
          <div>
            <button className="h-10 w-full bg-gray-800 mb-2 text-xs text-white rounded mr-1">
              LOGIN
            </button>
            <Link href="/signup">
              <a className="text-sm font-light">
                Don't have an account? <strong>Sign up</strong>
              </a>
            </Link>
            <div className="flex flex-row justify-between mt-4">
              <hr className="mt-8 w-2/5 border-black"></hr>
              <h6 className="mt-5">or</h6>
              <hr className="mt-8 w-2/5 border-black"></hr>
            </div>
          </div>
          <div className="flex flex-row justify-around content-center mt-4">
            {Object.values(props.providers).map((provider) => {
              if (provider.name === "Credentials") {
                return;
              }
              return (
                <div key={provider.name}>
                  <button
                    className="rounded p-2 border-black border-2"
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  console.log("providers", providers);
  return {
    props: {
      providers,
    },
  };
}

export default Login;
