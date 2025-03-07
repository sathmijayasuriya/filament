import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PostViewMenu from './PostViewMenu';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase';

export default function PostView() {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/posts/view/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        if (data.image_path) {
          const storage = getStorage(app);
          const imageRef = ref(storage, data.image_path);

          getDownloadURL(imageRef).then((url) => {
            setImageUrl(url);
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });
        }

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="mb-30">
      <div className="px-6 py-6 ">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/posts/${slug}`}>{slug}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">view</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
        </div>
        <PostViewMenu />
      </div>
      <div className="flex justify-center items-center ">
        <div className="w-full">
          <Card className="p-4">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Table className="border-collapse">
                        <TableBody>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Title
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              {post.title}
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Slug
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              {post.slug}
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Published at
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="py-1">
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-600 text-xs"
                              >
                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Not published'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div>
                      <Table className="border-collapse">
                        <TableBody>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Author
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              {post.author || 'Unknown'}
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Category
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              {post.category_name  || 'Uncategorized'}
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Tags
                            </TableCell>
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              {post.tags ? JSON.parse(post.tags).join(', ') : '-'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                {/* Image */}
                <div className="flex items-center justify-center">
                  <div className="w-40 h-50 rounded-lg overflow-hidden relative">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Content Section*/}
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="content">
              <AccordionTrigger className="p-4 bg-gray-50 border rounded-md">
                Content
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white border rounded-md">
                {post.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}