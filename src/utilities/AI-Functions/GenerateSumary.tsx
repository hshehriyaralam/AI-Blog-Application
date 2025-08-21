export default function GenerateSummaryFunction(setFormData: React.Dispatch<React.SetStateAction<any>>) {
  const generateSummary = () => {
    setFormData((prev: { title: any; }) => ({
      ...prev,
      summary: `AI-generated summary based on: "${prev.title}"...`
    }));
  };

  return { generateSummary };
}
