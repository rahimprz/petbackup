"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="register-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
          Join PetShop
        </h1>
        <p className="text-muted-foreground text-base">
          Create your account and get access to exclusive features
        </p>
      </div>

      {/* Registration Form */}
      <form className="w-full space-y-5" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="register-error" />

        {/* Terms and Privacy */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          By creating an account, you agree to PetShop&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors duration-200"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors duration-200"
          >
            Terms of Use
          </LocalizedClientLink>
        </p>

        <SubmitButton
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          data-testid="register-button"
        >
          Create Account
        </SubmitButton>
      </form>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-accent hover:text-accent/80 font-semibold underline underline-offset-4 transition-colors duration-200"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Register
