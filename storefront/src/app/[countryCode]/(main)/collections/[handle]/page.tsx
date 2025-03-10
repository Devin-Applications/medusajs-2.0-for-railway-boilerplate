import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { STORE_NAME } from "@lib/constants"
import { createServiceSchema } from "@lib/util/structured-data"

import {
  getCollectionByHandle,
  getCollectionsList,
} from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: { handle: string; countryCode: string }
  searchParams: {
    page?: string
    sortBy?: SortOptions
  }
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const boroughs = ["Queens", "Brooklyn", "Manhattan", "Bronx"]
  const description = `${collection.title} dumpster rentals available in ${boroughs.join(", ")}. Professional waste management solutions for construction, demolition, and renovation projects. Fast delivery and competitive pricing.`

  const metadata = {
    title: `${collection.title} | ${STORE_NAME} - NYC Dumpster Rental`,
    description,
    keywords: [
      `${collection.title.toLowerCase()} NYC`,
      ...boroughs.map(borough => `${collection.title.toLowerCase()} ${borough}`),
      "construction dumpster collection",
      "demolition waste containers",
      "renovation dumpster rentals",
      "bulk waste removal NYC",
      "commercial dumpster service",
      "residential waste container",
      "same day dumpster delivery"
    ],
    openGraph: {
      title: `${collection.title} | ${STORE_NAME} - NYC Dumpster Rental`,
      description,
      type: "website",
      images: collection.metadata?.images ? [
        {
          url: collection.metadata.images[0],
          width: 800,
          height: 600,
          alt: `${collection.title} - Dumpster Rental Collection in NYC`
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.title} | ${STORE_NAME}`,
      description,
      images: collection.metadata?.images ? [collection.metadata.images[0]] : [],
    }
  } as Metadata

  return metadata
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  // Create structured data for the collection
  const serviceSchema = createServiceSchema({
    name: collection.title,
    description: collection.metadata?.description || `${collection.title} dumpster rentals available in NYC. Professional waste management solutions for construction, demolition, and renovation projects.`,
    image: collection.metadata?.images?.[0]
  })

  return (
    <>
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <CollectionTemplate
        collection={collection}
        page={page}
        sortBy={sortBy}
        countryCode={params.countryCode}
      />
    </>
  )
}
