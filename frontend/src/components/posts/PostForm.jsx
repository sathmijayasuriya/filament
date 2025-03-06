// src/components/PostForm.jsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { DatePicker } from '@/components/ui/date-picker';
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload ";
import RichTextEditor from "./RichTextEditor";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      slug,
      content,
      author,
      category,
      publishedDate,
      tags,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full p-5 rounded-lg border bg-white">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label className="mb-3" htmlFor="title">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-3" htmlFor="slug">
              Slug
            </Label>
            <Input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <Label className="mb-3" htmlFor="content">
            Content
          </Label>
          <div className="border rounded-lg p-3">
            <RichTextEditor content={content} setContent={setContent} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label className="mb-3" htmlFor="author">
              Author
            </Label>
            <Select value={author} onValueChange={setAuthor}>
              <SelectTrigger className="w-full" disabled>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="author1">Author 1</SelectItem>
                <SelectItem value="author2">Author 2</SelectItem>
                {/* Add more authors */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-3" htmlFor="category">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
                {/* Add more categories */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* <div>
          <Label htmlFor="publishedDate">Published Date</Label>
          <DatePicker date={publishedDate} onDateChange={setPublishedDate} />
        </div> */}
          <div>
            <Label className="mb-3" htmlFor="tags">
              Tags
            </Label>
            <Input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="New tag"
            />
          </div>
        </div>
      </div>
      {/* 2 section */}
      <div className= " bg-white w-full p-5 mt-7 rounded-lg border">
        <Label className="mb-3" htmlFor="image">
          Image
        </Label>
        <ImageUpload onImageChange={handleImageChange} />
        {image && <p className="mt-2">Selected file: {image.name}</p>}
      </div>

      <div className="mt-6 flex justify-start gap-4">
        <Button
          className="bg-orange-400 hover:bg-orange-500 text-white"
          type="submit"
        >
          Create
        </Button>
        <Button type="button" variant="outline">
          Create & create another
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
