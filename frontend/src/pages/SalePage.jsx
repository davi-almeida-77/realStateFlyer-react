import ListingsLayout from '@/components/listings/ListingsLayout'
import { SALE_PROPERTIES } from '@/data/properties'

export default function SalePage() {
  return (
    <ListingsLayout
      pageType="sale"
      title="HOMES"
      subtitle="FOR SALE"
      properties={SALE_PROPERTIES}
    />
  )
}
