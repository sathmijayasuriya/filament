import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { editPost ,fetchPostBySlug} from "../../api/postApi";
import { fetchCategoriesByNames } from "../../api/categoryApi";
import { useQueryClient } from "@tanstack/react-query";
const EditPostForm = () => {
  const queryClient = useQueryClient();  
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState({ id: "", name: "" });
  const [publishedDate, setPublishedDate] = useState(null);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("draft");

  // Function to generate a slug from the title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const { data: post, isLoading: postLoading,error: postError } = useQuery({
    queryKey: ["post", slug],
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
  
  const { data: categories = [], isLoading: categoriesLoading,error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesByNames,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory({ id: String(post.category_id), name: post.category_name });
      setPublishedDate(post.published_at ? new Date(post.published_at) : null);
      setStatus(post.status || "draft");
      setTags(post.tags || "");
      setImageUrl(post.image_path);
    }
  },[post]);

  const {mutate:editMutation,error} = useMutation({
    mutationFn: ({ slug, data }) => editPost(slug, data),
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries(["posts"]);
      navigate(`/posts/${generateSlug(title)}`);
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      toast.error("An error occurred while updating the post");
    },
  })
  
  const uploadImageToFirebase = async (file) => {
    if (!file) return imageUrl;
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `blog-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
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
    if (!title || !content || !category.id) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    let newImageUrl = imageUrl;
    const newSlug = generateSlug(title); // Generate a new slug
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
          published_at: publishedDate ? publishedDate.getTime() : null,
          slug: newSlug, // Include the new slug in the update
      };
      editMutation({ slug, data: postData })
  };
  if (postLoading || categoriesLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  
  if (postError || categoriesError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading data. Please try again.
      </div>
    );
  }
  
  return (
      <form onSubmit={handleSubmit}>
          {error instanceof Error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
                  Error: {error.message}
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
                          <RichTextEditor
                              content={content}
                              setContent={setContent}
                          />
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
                                              publishedDate
                                                  ? format(
                                                        publishedDate,
                                                        "yyyy-MM-dd"
                                                    )
                                                  : ""
                                          }
                                          readOnly
                                          className="w-full pr-10"
                                      />
                                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                  </div>
                              </PopoverTrigger>
                              <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                              >
                                  <Calendar
                                      mode="single"
                                      selected={publishedDate}
                                      onSelect={setPublishedDate}
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
                          <Input
                              type="text"
                              id="tags"
                              value={tags}
                              onChange={(e) => setTags(e.target.value)}
                              placeholder={
                                  tags.trim()
                                      ? "Comma-separated tags"
                                      : "No tags"
                              }
                          />
                      </div>
                  </div>
              </div>
              <div className="bg-white w-full p-5 mt-7 rounded-lg border">
                  <Label className="mb-3" htmlFor="image">
                      Image
                  </Label>
                  <ImageUpload onImageChange={setImage} />
                  {imageUrl && !image && (
                      <div className="mt-2">
                          <p>Current Image:</p>
                          <img
                              src={imageUrl}
                              alt="Current Post Image"
                              className="max-w-xs max-h-40"
                              onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "placeholder-image.png";
                              }}
                          />
                      </div>
                  )}
              </div>

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