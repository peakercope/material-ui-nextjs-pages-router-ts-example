import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import useSWR from "swr";
import { Box, Button, Container, List, ListItem, Typography } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getPosts = () => fetcher("https://jsonplaceholder.typicode.com/posts");

export default function About() {
  const { data = [] } = useSWR(`/posts`, getPosts);

  return (
    <Container maxWidth="lg">
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
          About Material UI - Next.js example in TypeScript
        </Typography>
        <Box sx={{ maxWidth: "sm" }}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <List>
          {data.map((post: any) => (
            <ListItem key={post.id}>{post.title}</ListItem>
          ))}
        </List>
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  return {
    props: {
      foo: "bar",
    },
  };
}
