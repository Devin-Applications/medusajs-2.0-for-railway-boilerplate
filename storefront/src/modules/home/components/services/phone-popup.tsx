"use client"

import React from "react"
import Modal from "../../../../modules/common/components/modal"
import { Button, Heading, Text } from "@medusajs/ui"
import { Phone } from "@medusajs/icons"

const PhonePopup = ({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Title>Contact Us to Book Your Dumpster</Modal.Title>
      <Modal.Body>
        <div className="flex flex-col items-center py-4">
          <Phone className="w-12 h-12 text-orange-500 mb-4" />
          <Text className="text-center mb-2">
            Call us now to book your dumpster rental:
          </Text>
          <Heading level="h2" className="text-2xl font-bold text-orange-500 mb-6">
            (516) 515-1951
          </Heading>
          <Text className="text-center text-grey-60 text-sm">
            Our team is ready to assist you with your waste management needs.
          </Text>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => {
            window.location.href = "tel:5165151951"
          }}
        >
          Call Now
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PhonePopup
