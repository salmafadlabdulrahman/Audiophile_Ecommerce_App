import { SignUp } from "@clerk/nextjs"

const page = () => {
  return (
    <div className="auth-form">
        <SignUp />
    </div>
  )
}

export default page