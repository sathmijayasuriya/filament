import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

const posts = [
  { id: 1, title: "Et corrupti possimus et.", author: "Eloisa Schamberger", status: "Published", date: "Dec 21, 2024" },
  { id: 2, title: "Repellat quo quam odit ut.", author: "Eloisa Schamberger", status: "Published", date: "Nov 15, 2024" },
];

export default function PostTable() {
  return (
    <div className="border rounded-lg p-4">
      <Button className="mb-4">New Post</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded ${post.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {post.status}
                </span>
              </TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
