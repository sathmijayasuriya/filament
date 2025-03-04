import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import PostTable from "@/components/posts/PostTable";
import Layout from "../components/layouts/UserLayout";
export default function Posts() {
  return (
    <Layout>
      <Breadcrumbs items={[{ label: "Posts", path: "/posts" }]} />
      <PostTable />
    </Layout>
  );
}
