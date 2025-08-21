export default function GenerateTagsFunction(setFormData: React.Dispatch<React.SetStateAction<any>>) {
  const generateTags = () => {
    setFormData((prev: { tags: any; }) => ({
      ...prev,
      tags: [...prev.tags, "Tech", "Writing", "AI"]
    }));
  };

  return { generateTags };
}
