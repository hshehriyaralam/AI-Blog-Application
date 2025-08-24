import { useSuggestSummaryTagsMutation } from '../../Redux/Services/blogApi';
import { useAlert } from '../../Context/AlertContext';

export default function useAIGenerate(
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  formData: { title: string; content: string }
) {
  const [suggestAI, { isLoading: aiLoading, error: aiError }] = useSuggestSummaryTagsMutation();
  const { showAlert } = useAlert();

  const handleSuggest = async () => {
    if (!formData.title || !formData.content) {
      showAlert('error', 'Please add title & content first');
      return;
    }
    try {
      const res = await suggestAI({
        blogTitle: formData.title,
        blogContent: formData.content,
      }).unwrap();

      setFormData((prev: any) => ({
        ...prev,
        summary: res.summary,
        tags: res.tags,
      }));
      showAlert('success', 'Generated Successfully');
    } catch (e) {
      showAlert('error', 'Generate failed');
      console.error(e);
    }
  };

  return { handleSuggest, aiLoading, aiError };
}
