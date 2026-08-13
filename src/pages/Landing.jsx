import PublicNav from '../components/marketing/PublicNav'
import Hero from '../components/marketing/Hero'
import AudienceStrip from '../components/marketing/AudienceStrip'
import HowItWorks from '../components/marketing/HowItWorks'
import FeatureGrid from '../components/marketing/FeatureGrid'
import DifferenceSection from '../components/marketing/DifferenceSection'
import CTASection from '../components/marketing/CTASection'
import Footer from '../components/marketing/Footer'

export default function Landing() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <PublicNav />
      <Hero />
      <AudienceStrip />
      <HowItWorks />
      <FeatureGrid />
      <DifferenceSection />
      <CTASection />
      <Footer />
    </div>
  )
}
