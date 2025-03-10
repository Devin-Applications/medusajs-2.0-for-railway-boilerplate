import "styles/globals.css"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        {props.children}
      </body>
    </html>
  )
}
