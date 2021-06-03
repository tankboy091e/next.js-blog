import { GetServerSideProps } from 'next'

export default function Page() {
  return (
    <></>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => (
  {
    redirect: {
      destination: '/sum',
      permanent: false,
    },
  }
)
