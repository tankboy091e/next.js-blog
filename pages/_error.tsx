import Layout from 'layouts/default'
import { NextPageContext } from 'next'
import ErrorSection from 'templates/error-section'

function Error({ statusCode } : any) {
  return (
    <Layout>
      <ErrorSection
        message={statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      />
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const getStatusCode = () => {
    if (res) {
      return res.statusCode
    }
    if (err) {
      return err.statusCode
    }
    return 404
  }
  const statusCode = getStatusCode()
  return { statusCode }
}

export default Error
