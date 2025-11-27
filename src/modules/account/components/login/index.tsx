import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-base">
          Sign in to access your enhanced shopping experience
        </p>
      </div>

      {/* Login Form */}
      <form className="w-full space-y-5" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          Sign In
        </SubmitButton>
      </form>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground mt-8">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-accent hover:text-accent/80 font-semibold underline underline-offset-4 transition-colors duration-200"
          data-testid="register-button"
        >
          Join us
        </button>
      </div>
    </div>
  )
}

export default Login
