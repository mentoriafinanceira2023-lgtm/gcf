import MainLayout from '../../layouts/MainLayout'
import Kanban from './components/Kanban'

function CRMPage() {
  return (
    <MainLayout title="CRM" subtitle="Acompanhe oportunidades e relacionamento com clientes.">
      <Kanban />
    </MainLayout>
  )
}

export default CRMPage
