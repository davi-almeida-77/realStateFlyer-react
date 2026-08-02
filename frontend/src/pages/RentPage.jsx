import ListingsLayout from '@/components/listings/ListingsLayout'
import { RENT_PROPERTIES } from '@/data/properties'

export default function RentPage() {
  return (
    <ListingsLayout
      pageType="rent"
      title="HOMES"
      subtitle="FOR RENT"
      properties={RENT_PROPERTIES}
    />
  )
}
