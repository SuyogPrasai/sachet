import SachetHero from "@/components/hero/Hero"
import NewsletterSignup from "@/components/hero/NewsletterSection"
import Timeline from "@/components/hero/Timeline"
import Footer from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
function Home() {
  return (
    <div>
      <SachetHero />
      
      <NewsletterSignup />

      <Timeline />

    </div>
  )
}

export default Home