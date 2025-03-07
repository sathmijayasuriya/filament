import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import RichTextEditor from "./RichTextEditor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import ImageUpload from "./ImageUpload ";
import MenuBarComponent from './PostViewMenu';


const EditPostForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState({ id: "", name: "" });
  const [categories, setCategories] = useState([]);
  const [publishedDate, setPublishedDate] = useState(null);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // For existing image URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      console.log("Fetching post with slug:", slug);

    fetch(`http://localhost:5000/api/posts/view/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setCategory({ id: String(data.category_id), name: data.category_name });
        setPublishedDate(
          data.published_at ? new Date(data.published_at) : null
        );
        if (Array.isArray(data.tags) && data.tags.length > 0) { // Check if array is not empty
            setTags(data.tags.join(", "));
        } else if (typeof data.tags === "string" && data.tags.length > 0) {
            setTags(data.tags);
        } else {
            setTags(""); // Set to empty string if null, undefined, or empty
        }

        setImageUrl(data.image_path);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post");
      });

    fetch("http://localhost:5000/api/categories/names")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      });
  }, [slug]);

  const uploadImageToFirebase = async (file) => {
    if (!file) return imageUrl; // If no new image, keep the existing URL

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `blog-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: Add progress tracking here
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Firebase upload error:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (err) {
              console.error("Error getting download URL:", err);
              reject(err);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error in uploadImageToFirebase:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !content || !category.id) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    let newImageUrl = imageUrl;

    try {
      if (image) {
        newImageUrl = await uploadImageToFirebase(image);
      }

      const postData = {
        title,
        content,
        category_id: parseInt(category.id),
        image_path: newImageUrl,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        published_at: publishedDate
          ? format(publishedDate, "yyyy-MM-dd")
          : null,
      };

      const response = await fetch(
        `http://localhost:5000/api/posts/edit/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Post updated successfully!");
        navigate(`/posts/${slug}`);
      } else {
        setError(responseData.error || "Failed to update post");
        toast.error(responseData.error || "Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      setError("An error occurred while updating the post");
      toast.error("An error occurred while updating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
          Error: {error}
        </div>
      )}
      <div className="px-40">
        <div>
          <MenuBarComponent slug={slug} />
        </div>
        <div className="w-full px-20 p-5 rounded-lg border bg-white">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="mt-4">
              <Label className="mb-3" htmlFor="title">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Label className="mb-3" htmlFor="slug">
                Slug
              </Label>
              <Input type="text" id="slug" value={slug} readOnly />
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
            <div className="mt-4">
              <Label className="mb-3" htmlFor="category">
                Category
              </Label>
              <Select
    value={category.id}
    onValueChange={(id) => {
        const selectedCategory = categories.find((cat) => cat.id === id);
        if (selectedCategory) {
            setCategory({ id: selectedCategory.id, name: selectedCategory.name });
        }
    }}
    required
>
    <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category">
        {category.name}
        </SelectValue>
    </SelectTrigger>
    <SelectContent>
        {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
            </SelectItem>
        ))}
    </SelectContent>
</Select>
            </div>

            <div className="mt-4">
              <Label className="mb-3" htmlFor="publishedDate">
                Published Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      type="text"
                      value={
                        publishedDate ? format(publishedDate, "yyyy-MM-dd") : ""
                      }
                      readOnly
                      className="w-full pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={publishedDate}
                    onSelect={setPublishedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-4">
    <Label className="mb-4" htmlFor="tags">
        Tags
    </Label>
    <Input
        type="text"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder={tags.trim() ? "Comma-separated tags" : "No tags"} // Conditional placeholder
    />
</div>
          </div>
        </div>
        {/* Image Upload Section */}
        <div className="bg-white w-full p-5 mt-7 rounded-lg border">
          <Label className="mb-3" htmlFor="image">
            Image
          </Label>
          <ImageUpload onImageChange={setImage} />
          {/* {image && <p className="mt-2">Selected file: {image.name}</p>} */}
          {imageUrl && !image && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img
                src={imageUrl}
                alt="Current Post Image"
                className="max-w-xs max-h-40" // Adjust size as needed
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "placeholder-image.png"; // Replace with your placeholder
                }}
              />
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="mt-6 flex justify-start gap-4">
          <Button
            className="bg-orange-400 hover:bg-orange-500 text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/posts/${slug}`)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditPostForm;
