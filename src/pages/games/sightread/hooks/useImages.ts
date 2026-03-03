import { useState, useEffect } from "react";

type UseImagesResult = {
  loading: boolean;
  images: [JSON, JSON, JSON] | [];
  error: string | null;
};

export default function useImages(directory: string): UseImagesResult {
  const [images, setImages] = useState<[JSON, JSON, JSON] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res1 = await fetch(`/api/images?directory=${directory}/1`);
        if (!res1.ok) throw new Error("Failed to fetch images");

        const data1 = await res1.json();

        const res2 = await fetch(`/api/images?directory=${directory}/2`);
        if (!res2.ok) throw new Error("Failed to fetch images");

        const data2 = await res2.json();

        const res3 = await fetch(`/api/images?directory=${directory}/3`);
        if (!res3.ok) throw new Error("Failed to fetch images");

        const data3 = await res3.json();

        setImages([data1, data2, data3]);
      } catch (err) {
        setError((err instanceof Error ? err.message : "Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [directory]);

  return { images, loading, error };
}
