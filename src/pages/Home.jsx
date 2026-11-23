import { useRef } from 'react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import ContactCTA from '@/components/home/ContactCTA'
import FilmStripBand from '@/components/home/FilmStripBand'
import Hero from '@/components/home/Hero'
import JournalPreview from '@/components/home/JournalPreview'
import ProcessSection from '@/components/home/ProcessSection'
import SelectedWorks from '@/components/home/SelectedWorks'
import ServicesSection from '@/components/home/ServicesSection'
import Showreel from '@/components/home/Showreel'
import StudioIntro from '@/components/home/StudioIntro'
import TeamPreview from '@/components/home/TeamPreview'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function Home() {
  const rootRef = useRef(null)
  useDocumentMeta()
  useScrollReveal(rootRef)

  return (
    <div ref={rootRef}>
      <Hero />
      <StudioIntro />
      <SelectedWorks />
      <ServicesSection />
      <Showreel />
      <ProcessSection />
      <FilmStripBand />
      <TeamPreview />
      <JournalPreview />
      <ContactCTA />
    </div>
  )
}
