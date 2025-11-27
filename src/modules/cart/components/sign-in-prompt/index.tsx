import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-6 flex items-center justify-between backdrop-blur-md shadow-lg">
      <div>
        <Heading level="h2" className="txt-xlarge text-foreground">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-muted-foreground mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground border-0" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
