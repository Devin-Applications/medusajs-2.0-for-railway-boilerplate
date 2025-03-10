import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { RegionProvider } from "@lib/context/region-context"
import RegionModal from "@modules/common/components/region-modal"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <RegionProvider>
          <main className="relative">
            <RegionModal />
            {props.children}
          </main>
        </RegionProvider>
      </body>
    </html>
  )
}
