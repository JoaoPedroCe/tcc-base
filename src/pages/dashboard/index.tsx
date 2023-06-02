import Card from '~/components/Cards/LayoutContentCard'
import DefaultLayout from '~/components/Layout/Default'

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Card title="dashboard" extra="More">
        dashboard
      </Card>
    </DefaultLayout>
  )
}

export default Dashboard
