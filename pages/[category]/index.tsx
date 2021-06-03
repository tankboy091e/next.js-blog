import { PostProps } from 'templates/post'
import { GetServerSideProps } from 'next'
import isValidCategory from 'lib/util/category'

export default function Page(props : PostProps) {
  return (
    <></>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params
  if (isValidCategory(category)) {
    return {
      redirect: {
        destination: `/${category}/1`,
        permanent: false,
      },
    }
  }
  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }
}

// export const getStaticProps: GetStaticProps = async () => ({
//   props: {},
// })

// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [
//     { params: { category: 'sum' } },
//     { params: { category: 'essais' } },
//     { params: { category: 'dev' } },
//   ],
//   fallback: false,
// })
