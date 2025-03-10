"use client"

import { Button } from "@medusajs/ui"
import React, { ComponentProps } from "react"

const ClientButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props} />
}

export default ClientButton
