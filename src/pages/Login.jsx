import { LoginForm } from "../components"

export default function Login() {
  return (
    <div
      className="py-8 min-h-screen relative"
      style={{
        backgroundImage: "url(/images/bg-login-signup.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  )
}
