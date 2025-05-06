import React,{useRef } from "react";
import { createLink } from "../../api/linksApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
    Bold,
    Italic,
    Link,
    Heading,
    Code2,
    ListOrdered,
    List,
    Image,
    Undo,
    Redo,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from "../posts/ImageUpload "
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function LinksCreateForm() {
  const colorInputRef = useRef(null);
      const queryClient = useQueryClient();
      const [title, setTitle] = React.useState("");
      const [color, setColor] = React.useState("#000000");
      const [description, setDescription] = React.useState("");
      const [url, setUrl] = React.useState("");
      const [image, setImage] = React.useState(null);
      const navigate = useNavigate();

      const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("color", color);
            formData.append("description", description);
            formData.append("url", url);
            if (image) {
                formData.append("image", image);
            }

            return await createLink(formData); 
        },
        onSuccess: () => {
            toast.success("Link created successfully!");
            queryClient.invalidateQueries(["links"]);
            navigate("/links"); 
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create link");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };
    const resetForm = () => {
        setTitle("");
        setColor("#000000");
        setDescription("");
        setUrl("");
        setImage(null);
    };
    const cancel = () => {
        navigate("/links");
    };

  return (
      <form className="p-4" onSubmit={handleSubmit}>
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
                  <div className="mt-4 w-full max-w-sm">
                      <Label className="mb-2 block font-medium text-sm text-gray-700">
                          Color <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                          <div className="relative"></div>
                          <Input
                              type="text"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              onBlur={() => {
                                  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
                                      toast.error(
                                          "Please enter a valid 7-character hex color (e.g., #123ABC)"
                                      );
                                  }
                              }}
                              maxLength={7}
                              className="w-full border rounded px-3 py-2 pr-10"
                          />

                          {/* Hidden color input */}
                          <input
                              ref={colorInputRef}
                              type="color"
                              value={
                                  /^#[0-9A-Fa-f]{6}$/.test(color)
                                      ? color
                                      : "#000000"
                              }
                              onChange={(e) => setColor(e.target.value)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-0"
                              style={{ zIndex: 2 }}
                          />
                          {/* Visible color circle */}
                          <div
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border cursor-pointer"
                              style={{
                                  backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(
                                      color
                                  )
                                      ? color
                                      : "#000000",
                              }}
                              onClick={() => colorInputRef.current?.click()}
                          />
                      </div>
                  </div>
              </div>
              <div className="mt-4">
                  <Label className="mb-3" htmlFor="content">
                      Description
                  </Label>
                  <div className="border rounded-md p-2">
                      <div className="flex items-center space-x-2 mb-2">
                          <Button variant="outline" size="icon">
                              <Bold size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Italic size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Link size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Heading size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Code2 size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <ListOrdered size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <List size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Image size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Undo size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                              <Redo size={16} />
                          </Button>
                      </div>
                      <Textarea
                          id="description"
                          placeholder="description"
                          className="mt-1 h-40"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="mt-4">
                      <Label className="mb-4" htmlFor="tags">
                          URL
                      </Label>
                      <Input
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                      />
                  </div>
              </div>
              {/* Image Upload Section */}
              <div className="bg-white w-full p-5 mt-7 rounded-lg border">
                  <Label className="mb-3" htmlFor="image">
                      Image
                  </Label>

                  <ImageUpload onImageChange={setImage} />
                  {image && (
                      <div className="mt-2 flex items-center gap-2">
                          <p className="text-sm text-gray-700">
                              Selected file: {image.name}
                          </p>
                          <button
                              type="button"
                              onClick={() => setImage(null)}
                              className="text-red-500 hover:text-red-700"
                          >
                              <X size={16} />
                          </button>
                      </div>
                  )}
              </div>
              <div className="mt-6 flex justify-start gap-4">
                  <Button
                      className="bg-orange-400 hover:bg-orange-500 text-white"
                      type="submit"
                      disabled={isLoading}
                  >
                      {isLoading ? "Creating..." : "Create"}
                  </Button>
                  <Button onClick={resetForm} type="button" variant="outline">
                      Create & create Links
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
          </div>
      </form>
  );
};
