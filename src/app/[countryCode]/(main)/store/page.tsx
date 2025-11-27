import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

const PRODUCT_LIMIT = 12

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch data on the server
  const region = await getRegion(params.countryCode)

  if (!region) {
    return null
  }

  const queryParams: any = {
    limit: PRODUCT_LIMIT,
  }

  if (sort === "created_at") {
    queryParams["order"] = "created_at"
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page: pageNumber,
    queryParams,
    sortBy: sort,
    countryCode: params.countryCode,
  })

  // Fetch all categories
  const categories = await listCategories()

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <StoreTemplate
      sortBy={sort}
      page={pageNumber}
      countryCode={params.countryCode}
      products={products}
      region={region}
      totalPages={totalPages}
      count={count}
      categories={categories}
    />
  )
}
