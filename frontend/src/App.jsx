import { Routes, Route } from 'react-router-dom'
import { ThemeProvider }     from '@/context/ThemeContext'
import HomePage              from '@/pages/HomePage'
import PropertyDetailPage    from '@/pages/PropertyDetailPage'
import ContactPage           from '@/pages/ContactPage'
import SalePage              from '@/pages/SalePage'
import RentPage              from '@/pages/RentPage'
import BioAgentPage          from '@/pages/BioAgentPage'
import CustomCursor          from '@/components/ui/CustomCursor'
import ScrollProgress        from '@/components/ui/ScrollProgress'

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="/sale"         element={<SalePage />} />
        <Route path="/rent"         element={<RentPage />} />
        <Route path="/agent"        element={<BioAgentPage />} />
      </Routes>
    </ThemeProvider>
  )
}
