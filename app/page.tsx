"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const onSubmit = () => {
    if (!email || !password || !name) {
      return window.alert("Fill all fields");
    }
    setIsLoadingBtn(true);

    authClient.signUp.email(
      { email, password, name },
      {
        onError: () => {
          setIsLoadingBtn(false);
          window.alert("Email already exists!");
        },
        onSuccess: () => {
          setIsLoadingBtn(false);
          window.alert("User created & logged in!");
        },
      }
    );
  };

  const onLogin = () => {
    if (!loginEmail || !loginPassword) {
      return window.alert("Enter email & password");
    }

    setIsLoadingBtn(true);

    authClient.signIn.email(
      { email: loginEmail, password: loginPassword },
      {
        onError: () => {
          setIsLoadingBtn(false);
          window.alert("Invalid email/password");
        },
        onSuccess: () => {
          setIsLoadingBtn(false);
          window.alert("Logged in successfully!");
        },
      }
    );
  };

  if (isPending) return <p>Loading session...</p>;

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-yellow-200 gap-y-10 p-6">
      {/* Signup */}
      <div className="flex flex-col w-1/3 space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center font-bold text-xl">Create Account</h2>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit} disabled={isLoadingBtn}>
          {isLoadingBtn ? "Please Wait..." : "Sign Up"}
        </Button>
      </div>

      {/* Login */}
      <div className="flex flex-col w-1/3 space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center font-bold text-xl">Login</h2>
        <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <Button onClick={onLogin} disabled={isLoadingBtn}>
          {isLoadingBtn ? "Please Wait..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
