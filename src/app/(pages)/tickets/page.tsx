import  { FC, Suspense } from 'react'
import TicketsGrid from './tickets-grid'
import Loading from './loading'

const Page:FC = () => {
  return (
    <div>
      <div>
        <h1 className=' text-2xl font-bold text-gray-100 mb-2'>Tickets</h1>
      
      <p className=' text-gray-400'>Tüm ticketlarınızı kategori bazında görüntüleyin ve yönetin</p>
      
      </div>
  <Suspense fallback={<Loading/>}>
      <TicketsGrid/>

  </Suspense>
    </div>
  )
}

export default Page