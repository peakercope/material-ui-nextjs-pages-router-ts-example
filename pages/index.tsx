import Image from "next/image";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import banner from "../public/assets/half-page-banners-desktop-dog-coat.jpeg";
import useSWR from "swr";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getTodos = () => fetcher("https://jsonplaceholder.typicode.com/todos");

export default function Home() {
  const { t } = useTranslation('common');
  const { data = [] } = useSWR(`/todos`, getTodos);

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        <Image src={banner} priority fill alt="" style={{ objectFit: "cover" }} />
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <List>
          {data.map((todo: any) => (
            <ListItem key={todo.id}>{todo.title}</ListItem>
          ))} 
        </List>
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}