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
    <div className="mb-30">
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
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              Consequuntur tenetur aut quas.
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>

                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Slug
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              consequuntur-tenetur-aut-quas
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>

                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Published at
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="py-1">
                              {" "}
                              {/* Added py-1 */}
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-600 text-xs"
                              >
                                Mar 25, 2025
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
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              Madonna Rath
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>

                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Category
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">
                              veritatis atque velit
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>

                          <TableRow noBorder={true}>
                            <TableCell className="font-medium text-sm py-1">
                              Tags
                            </TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                          <TableRow noBorder={true}>
                            <TableCell className="text-sm py-1">-</TableCell>{" "}
                            {/* Added py-1 */}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex items-center justify-center">
                  <div className="w-40 h-50 rounded-lg overflow-hidden relative">
                    <img
                      src={Book}
                      alt="Author"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
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
                Rabbit Sends in a great hurry, muttering to itself 'Then I'll go
                round a deal too far off to the whiting,' said Alice, quite
                forgetting in the kitchen that did not sneeze, were the cook, to
                see that.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
