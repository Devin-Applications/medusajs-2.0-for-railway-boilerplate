import Hero from "@modules/home/components/hero"
import Services from "@modules/home/components/services"
import UseCases from "@modules/home/components/use-cases"
import ServiceAreas from "@modules/home/components/service-areas"
import WhyChooseUs from "@modules/home/components/why-choose-us"
import CallToAction from "@modules/home/components/call-to-action"
import ContactForm from "@modules/common/components/contact-form"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <UseCases />
      <ServiceAreas />
      <WhyChooseUs />
      <CallToAction />
      <ContactForm />
    </>
  )
}
