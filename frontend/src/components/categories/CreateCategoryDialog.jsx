import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast"; 
import { useNavigate } from "react-router-dom"; 


export default function CreateCategoryDialog({ open, onOpenChange, onConfirm, onCancel,onCategoryCreated  }) {
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); 
  const [slug, setSlug] = useState(""); 
  const navigate = useNavigate(); 
    // Update slug when name changes
    const handleNameChange = (e) => {
      setName(e.target.value);
      setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
    };

    const handleSubmit = async () => {
      if (!name) {
        toast.error("Please enter a category name.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/categories/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            visibility: isVisible ? 1 : 0, 
            description,
          }),
        });
  
        if (response.ok) {
          toast.success("Category created successfully!");
          onConfirm(); 
          setName("");
          setSlug("");
          setIsVisible(true);
          setDescription("");
          onCategoryCreated(); // refresh
          navigate("/categories"); 
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to create category.");
        }
      } catch (error) {
        console.error("Error creating category:", error);
        toast.error("An error occurred while creating the category.");
      }
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter category name"
                className="mt-1"
                value={name}
                onChange={handleNameChange} // Call handleNameChange on name input change
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="Auto-generated"
                className="mt-1"
                disabled
                value={slug} // Set the value of the slug input
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
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
                placeholder="Enter category description"
                className="mt-1 h-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="visibility" checked={isVisible} onCheckedChange={setIsVisible} />
            <Label htmlFor="visibility">Visible to customers.</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              className="bg-orange-400 hover:bg-orange-500 text-white"
              variant="primary"
              onClick={handleSubmit} 
            >
              Create
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="outline">Create & create another</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}