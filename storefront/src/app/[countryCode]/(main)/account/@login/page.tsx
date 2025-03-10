import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your JBS Builder Lic account.",
}

export default function Login() {
  return <LoginTemplate />
}
