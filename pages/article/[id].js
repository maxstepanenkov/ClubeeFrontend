import { useRouter } from 'next/router';
import MainLayout from '../../components/layout';

export default function ({ article }) {
  const { query } = useRouter();
  return (
    <MainLayout>
      <div>
        <h1>
          {article.title}
        </h1>
        <div>
          {article.body}
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${params.id}`);
  const article = await response.json();

  return {
    props: {article}
  }
}