// PostsTableRow.jsx
import { TableRow, TableCell, Button } from "@/components/ui/table";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { Badge } from "@/components/ui/badge";
import { dateToYYYYMMDD } from "../utils/dateUtils";

const PostsTableRow = ({ row, navigate, handleDeleteClick }) => {
  const imagePath = row.original.image_path;
  const storage = getStorage(app);
  const imageRef = ref(storage, imagePath);

  return (
    <TableRow
      noBorder={true}
      className={`hover:bg-gray-100 ${
        row.getIsSelected() ? "border-l-2 border-orange-400" : ""
      } cursor-pointer`}
    >
      <TableCell>{/* ... (checkbox) */}</TableCell>
      <TableCell>
        {/* ... (image rendering) */}
      </TableCell>
      <TableCell>{row.original.title}</TableCell>
      <TableCell>
        <Badge>{row.original.status}</Badge>
      </TableCell>
      <TableCell>{dateToYYYYMMDD(row.original.published_at)}</TableCell>
      <TableCell>
        {/* ... (action buttons) */}
      </TableCell>
    </TableRow>
  );
};

export default PostsTableRow;