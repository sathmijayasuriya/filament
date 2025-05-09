import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PostViewMenu from "./PostViewMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import MenuBarComponent from "./PostViewMenu";
import { fetchPostBySlug } from "../../api/postApi";
import { useQuery } from "@tanstack/react-query";

export default function PostView() {
    const { slug } = useParams(); // Get the slug from the URL
    const [imageUrl, setImageUrl] = useState(null);

    // useQuery to fetch post data
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["posts", slug],
        queryFn: () => fetchPostBySlug(slug),
        enabled: !!slug,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data.image_path) {
                const storage = getStorage(app);
                const imageRef = ref(storage, data.image_path);
                getDownloadURL(imageRef)
                    .then((url) => {
                        setImageUrl(url);
                    })
                    .catch((error) => {
                        console.error("Error getting download URL:", error);
                    });
            }
        },
        onError: (error) => {
            console.error("Error fetching category:", error);
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!post) return <div>Post not found.</div>;

    //remove tags in content
    const stripHtmlTags = (html) => {
        if (!html) return "";
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };
    const formatTags = (tagsData) => {
        if (tagsData && typeof tagsData === "string") {
            try {
                const parsedTags = JSON.parse(tagsData);
                if (Array.isArray(parsedTags)) {
                    return parsedTags.join(", ");
                } else {
                    return tagsData;
                }
            } catch (error) {
                console.error("Error parsing tags in PostView:", error);
                return tagsData;
            }
        } else if (Array.isArray(tagsData)) {
            return tagsData.join(", ");
        } else {
            return "-";
        }
    };

    return (
        <div className="mb-30">
            <div className="px-6 py-6 ">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/posts/${slug}`}>
                            {slug}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">view</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="flex justify-between items-center mt-4">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                </div>
                <MenuBarComponent slug={slug} />
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
                                                                {post.published_at
                                                                    ? new Date(
                                                                          post.published_at
                                                                      ).toLocaleDateString()
                                                                    : "draft"}
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
                                                            {post.author ||
                                                                "Unknown"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow noBorder={true}>
                                                        <TableCell className="font-medium text-sm py-1">
                                                            Category
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow noBorder={true}>
                                                        <TableCell className="text-sm py-1">
                                                            {post.category_name ||
                                                                "Uncategorized"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow noBorder={true}>
                                                        <TableCell className="font-medium text-sm py-1">
                                                            Tags
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow noBorder={true}>
                                                    <TableCell className="text-sm py-1 flex flex-wrap gap-2">
                                                    {(() => {
    let tagArray = [];

    if (Array.isArray(post.tags)) {
        tagArray = post.tags;
    } else if (typeof post.tags === "string") {
        try {
            const parsed = JSON.parse(post.tags);
            if (Array.isArray(parsed)) tagArray = parsed;
        } catch {
            tagArray = post.tags.split(",").map(t => t.trim());
        }
    }

    return tagArray.length > 0 ? (
        tagArray.map((tag, index) => (
            <Badge
                key={index}
                className="bg-orange-50 text-orange-600 text-xs font-medium px-2 py-1 rounded-md"
            >
                {tag}
            </Badge>
        ))
    ) : (
        "-"
    );
})()}

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
                                {stripHtmlTags(post.content)}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
