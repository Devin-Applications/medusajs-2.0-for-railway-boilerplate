import "styles/globals.css"
import { Providers } from "@lib/context/providers"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>
          <main className="relative">
            {props.children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
