import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { STORE_NAME } from "@lib/constants"
import { createServiceSchema } from "@lib/util/structured-data"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  const boroughs = ["Queens", "Brooklyn", "Manhattan", "Bronx"]
  const description = `${product.title} available for rent in ${boroughs.join(", ")}. Fast, reliable dumpster rental service with same-day delivery. Perfect for ${product.description || "construction, demolition, and renovation projects"}. Call now for pricing and availability.`
  
  return {
    title: `${product.title} | ${STORE_NAME} - NYC Dumpster Rental`,
    description,
    keywords: [
      `${product.title.toLowerCase()} rental NYC`,
      ...boroughs.map(borough => `dumpster rental ${borough}`),
      "construction waste container",
      "demolition dumpster rental",
      "renovation waste removal",
      "same day dumpster delivery",
      "HOA friendly dumpster service"
    ],
    openGraph: {
      title: `${product.title} | ${STORE_NAME} - NYC Dumpster Rental`,
      description,
      type: "product",
      images: product.thumbnail ? [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: `${product.title} - Dumpster Rental in NYC`
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${STORE_NAME}`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  // Create structured data for the dumpster service
  const serviceSchema = createServiceSchema({
    name: pricedProduct.title,
    description: pricedProduct.description || `${pricedProduct.title} available for rent in NYC. Perfect for construction, demolition, and renovation projects.`,
    price: pricedProduct.variants[0]?.prices[0]?.amount 
      ? `$${(pricedProduct.variants[0].prices[0].amount / 100).toFixed(2)}`
      : undefined,
    image: pricedProduct.thumbnail
  })

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}
