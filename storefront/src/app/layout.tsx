import "styles/globals.css"
import ClientLayout from "./client-layout"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ClientLayout>
          {props.children}
        </ClientLayout>
      </body>
    </html>
  )
}
