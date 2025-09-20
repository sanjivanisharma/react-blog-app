import { SignupForm } from "../components"

export default function Signup() {
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
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative z-10">
        <SignupForm />
      </div>
    </div>
  )
}
