import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MainLayout from '../components/layout';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  }
}))

const Index = ({ articles }) => {
  return (
    <MainLayout>
      <Root>
        {articles?.length ? articles.map(article => (
          <li key={article.id}>
            <Box
              sx={{ 
                marginLeft: 3,
                marginRight: 3,
                marginBottom: 2,
                border: '1px solid #d7d7d7',
                borderRadius: 3,
                padding: 1
              }}
            >
              <Typography variant="h6">
                <Link href={`/article/${article._id}`}>
                  <a style={{ textDecoration: 'none', color: 'grey' }}>{article.title}</a>
                </Link>
              </Typography>
              <Divider />
              <Typography variant="subtitle1" sx={{ color: '#838383' }}>
                {article.body}
              </Typography>
            </Box>
          </li>
        )) : <div>nope</div>}
      </Root>
    </MainLayout>
  );
};

export default Index;

export async function getStaticProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`);
  const articles = await response.json();

  return {
    props: {articles}
  }
}