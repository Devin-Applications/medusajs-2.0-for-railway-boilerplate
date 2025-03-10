"use client"

import dynamic from "next/dynamic"
import { clx } from "@medusajs/ui"
import React from "react"
import X from "@modules/common/icons/x"

const DialogRoot = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Root), { ssr: false })
const DialogPortal = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Portal), { ssr: false })
const DialogOverlay = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Overlay), { ssr: false })
const DialogContent = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Content), { ssr: false })
const DialogTitle = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Title), { ssr: false })
const DialogDescription = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Description), { ssr: false })
const DialogClose = dynamic(() => import("@radix-ui/react-dialog").then(mod => mod.Close), { ssr: false })

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
  search?: boolean
  children: React.ReactNode
  'data-testid'?: string
}

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  'data-testid': dataTestId
}: ModalProps) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={close}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-enter z-50" />
        <DialogContent
          data-testid={dataTestId}
          className={clx(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-full p-6 bg-white rounded-lg shadow-xl",
            "focus:outline-none animate-enter z-50",
            {
              "max-w-md": size === "small",
              "max-w-xl": size === "medium",
              "max-w-3xl": size === "large",
              "bg-transparent shadow-none": search,
            }
          )}
        >
          {children}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DialogTitle className="flex items-center justify-between mb-4">
      <div className="text-xl font-semibold">{children}</div>
      <DialogClose asChild>
        <button
          className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          data-testid="close-modal-button"
        >
          <X size={20} />
        </button>
      </DialogClose>
    </DialogTitle>
  )
}

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DialogDescription className="text-gray-600 mb-6">
      {children}
    </DialogDescription>
  )
}

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-4">{children}</div>
}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center justify-end gap-x-4 mt-6">{children}</div>
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal
