import { useState, useEffect, useCallback } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import ImageUpload from "./ImageUpload ";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TagInput from "./TagInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createPost } from "../../api/postApi";
import { useQueryClient } from "@tanstack/react-query";
import {fetchCategoriesByNames} from "../../api/categoryApi";
const PostForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState({ id: "", name: "" });
  const [categories, setCategories] = useState([]);
  const [publishedDate, setPublishedDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  //calendar CLose
  const [calenderOpen, setCalendarOpen] = useState(false);
  const handleSelect = (date) => {
    setPublishedDate(date);
    setCalendarOpen(false); // Close the popover
  };

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesByNames,
    // refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCategories(data);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories");
    },
  })
  // Auto-generate slug from title
  useEffect(() => {
    setSlug(title.toLowerCase().replace(/\s+/g, "-"));
  }, [title]);

  // Upload image to Firebase and return URL
  const uploadImageToFirebase = async (file) => {
    if (!file) return "";
    
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
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
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
  const cancel = useCallback(() =>{
    navigate("/posts");
  },[navigate]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setContent("");
    setCategory({ id: "", name: "" });
    setPublishedDate(null);
    setTags("");
    setImage(null);
    console.log("data ",setTitle)
  };

  const {mutate: createPostMutation,isLoading} = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      resetForm();
      queryClient.invalidateQueries(["posts"]);
        navigate("/posts");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      setError("An error occurred while creating the post");
      toast.error("An error occurred while creating the post");
    },
  })

  //  submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !content || !category.id) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // setIsSubmitting(true);
    let imageUrl = "";
      if (image) {
        console.log("Starting image upload...");
        imageUrl = await uploadImageToFirebase(image);
        console.log("Image uploaded successfully:", imageUrl);
      }
      const postData = {
        title,
        slug,
        content,
        category_id: parseInt(category.id),
        image_path: imageUrl,
        tags: JSON.stringify(tags), 
        published_at: publishedDate ? format(publishedDate, "yyyy-MM-dd") : null,
      };
      console.log("Post data:", postData);
      try {
        await createPostMutation(postData);
      } catch (error) {
        console.error("Error creating post:", error);
        setError("An error occurred while creating the post");
      }
      
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
          Error: {error}
        </div>
      )}

      <div className="w-full p-5 rounded-lg border bg-white">
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
                const selectedCategory = categories.find(
                  (cat) => cat.id === id
                );
                if (selectedCategory) {
                  setCategory({
                    id: selectedCategory.id,
                    name: selectedCategory.name,
                  });
                }
              }}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
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
            <Popover open = {calenderOpen} onOpenChange={setCalendarOpen}>
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
                  onSelect={handleSelect}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
            <TagInput value={tags} onChange={setTags} />
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="bg-white w-full p-5 mt-7 rounded-lg border">
        <Label className="mb-3" htmlFor="image">
          Image
        </Label>
        <ImageUpload onImageChange={setImage} />
        {image && <p className="mt-2">Selected file: {image.name}</p>}
      </div>

      {/* Submit Buttons */}
      <div className="mt-6 flex justify-start gap-4">
        <Button
          className="bg-orange-400 hover:bg-orange-500 text-white"
          type="submit"
          disabled={isLoading}
          >
          {isLoading ? "Creating..." : "Create"}
        </Button>
        <Button onClick={resetForm} type="button" variant="outline">
          Create & create another
        </Button>
        <Button
          disabled={isLoading} 
          onClick={cancel}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PostForm;