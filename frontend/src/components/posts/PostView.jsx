import React from 'react'
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Book from "@/assets/book.png";

export default function PostView() {
  return (
    <div className='mb-30'>
    <div className="px-6 py-6 ">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">postid</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">view</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">post tilte name</h2>
      </div>
      <PostViewMenu/>
      </div>
      <div className="flex justify-center items-center ">
      <div className="w-full">
        {/* Post Details Card */}   
        <Card className="p-4">
          <CardContent className="p-4 flex flex-col gap-4">
            {/* Post Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Title</TableCell>
                      <TableCell>Deleniti laboriosam rerum quia inventore.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Slug</TableCell>
                      <TableCell>deleniti-laboriosam-rerum-quia-inventore</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Published at</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-600">
                          Dec 10, 2024
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Author</TableCell>
                      <TableCell>Adaline Kessler</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Category</TableCell>
                      <TableCell>voluptas itaque similique</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tags</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Image */}
              <div className="flex mt-">
              <AspectRatio ratio={1} className="w-auto h-auto  rounded-lg overflow-hidden">
              <img src={Book} alt="Author" className="absolute inset-0 w-full h-full object-cover" />
              </AspectRatio>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Section*/}
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="content">
            <AccordionTrigger className="p-4 bg-gray-50 border rounded-md">Content</AccordionTrigger>
            <AccordionContent className="p-4 bg-white border rounded-md">
              Rabbit Sends in a great hurry, muttering to itself 'Then I'll go round a deal too far off to the whiting,' said Alice, 
              quite forgetting in the kitchen that did not sneeze, were the cook, to see that.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    </div>
  )
}
