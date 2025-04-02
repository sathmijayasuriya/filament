import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const TagInput = ({ value: initialTags, onChange }) => {
  const [tags, setTags] = useState(initialTags || []);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="p-2">
      {" "}
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter tags (comma or enter separated)"
        ref={inputRef}
      />
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="badgebutton"
            size="sm"
            className="flex items-center gap-1 text-xs"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag}
            <X className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
