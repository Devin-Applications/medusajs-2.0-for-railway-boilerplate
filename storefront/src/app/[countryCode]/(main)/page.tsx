import { ReactNode } from "react"
import dynamic from "next/dynamic"

const ClientHome = dynamic(() => import("./client-page"), { ssr: false })

export default function Home() {
  return <ClientHome />
}
