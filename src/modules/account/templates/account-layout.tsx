import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-card/30 backdrop-blur-md border border-border/50 rounded-xl flex flex-col overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12 px-8 gap-x-8">
          <div className="hidden small:block border-r border-border/50 pr-8">
            {customer && <AccountNav customer={customer} />}
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between border-t border-border/50 py-8 px-8 gap-8 bg-card/50">
          <div>
            <h3 className="text-xl-semi mb-4 text-foreground">Got questions?</h3>
            <span className="txt-medium text-muted-foreground">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div className="text-accent hover:text-accent/80 transition-colors">
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
