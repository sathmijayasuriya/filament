import { useQuery } from "@tanstack/react-query";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const fetchImageURL = async (imagePath) => {
  const storage = getStorage(app);
  const imageRef = ref(storage, imagePath);
  return await getDownloadURL(imageRef);
};

export const useImageURL = (imagePath) => {
  return useQuery({
    queryKey: ["imageURL", imagePath],
    queryFn: () => fetchImageURL(imagePath),
    enabled: !!imagePath,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
