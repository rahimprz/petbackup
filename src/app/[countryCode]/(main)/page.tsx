import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Hero } from "@components/sections/Hero"
import { FAQ } from "@components/sections/FAQ"
import { HowItWorks } from "@components/sections/HowItWorks"
import { Stats } from "@components/sections/Stats"
import { Testimonials } from "@components/sections/Testimonials"
import { TrustSignals } from "@components/sections/TrustSignals"
import { Newsletter } from "@components/sections/Newsletter"
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
      <div id="select-game" className="py-12 relative z-10">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <TrustSignals />
      <Newsletter />
      <ScrollToTop />
    </>
  )
}
