import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

// Route-level code splitting keeps the initial bundle small.
// <Suspense> is provided by MainLayout so the shell stays mounted while pages load.
const Home = lazy(() => import('@/pages/Home'))
const Work = lazy(() => import('@/pages/Work'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Services = lazy(() => import('@/pages/Services'))
const About = lazy(() => import('@/pages/About'))
const Team = lazy(() => import('@/pages/Team'))
const Journal = lazy(() => import('@/pages/Journal'))
const JournalDetail = lazy(() => import('@/pages/JournalDetail'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<ProjectDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<JournalDetail />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
