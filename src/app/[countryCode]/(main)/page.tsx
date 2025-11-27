import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Hero } from "@components/sections/Hero"
import { GameSelector } from "@components/sections/GameSelector"
import { FeaturedPets } from "@components/sections/FeaturedPets"
import { FAQ } from "@components/sections/FAQ"
import { HowItWorks } from "@components/sections/HowItWorks"
import { Stats } from "@components/sections/Stats"
import { Testimonials } from "@components/sections/Testimonials"
import { TutorialSection } from "@components/sections/TutorialSection"
import { ScrollToTop } from "@components/ScrollToTop"

export const metadata: Metadata = {
  title: "PetShop - Your Trusted Pet Items Store",
  description:
    "The fastest, cheapest, and safest shop for Plants vs Brainrots items, with instant delivery.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <TutorialSection />
      <HowItWorks />
      <GameSelector />
      <FeaturedPets countryCode={countryCode} />
      <div id="select-game" className="py-12 relative z-10">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>

        <div className="flex justify-center mt-16">
          <a
            href="/store"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
          >
            View more in shop
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      <Stats />
      <Testimonials />
      <FAQ />
      <ScrollToTop />
    </>
  )
}
