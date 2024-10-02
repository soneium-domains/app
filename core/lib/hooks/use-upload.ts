import { useState } from "react";
import { upload } from "thirdweb/storage";


// Define the hook's return type
interface UseUploadJsonFileReturn {
  isLoading: boolean;
  data: string | null;
  hasError: Error | null;
  uploadJsonFile: (jsonString: string, fileName?: string) => Promise<string>;
}

// Type for the hook's argument
interface UseUploadJsonFileArgs {
  client: any;
}

const useUploadJsonFile = ({ client }: UseUploadJsonFileArgs): UseUploadJsonFileReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [hasError, setHasError] = useState<Error | null>(null);

  // Function to convert stringified JSON to a File
  const convertJsonToFile = (jsonString: string, fileName = "data.json"): File => {
    const blob = new Blob([jsonString], { type: "application/json" });
    return new File([blob], fileName, { type: "application/json" });
  };

  // Function to upload the file
  const uploadJsonFile = async (jsonString: string, fileName: string = "data.json"): Promise<string> => {
    setIsLoading(true);
    setHasError(null);

    try {
      const file = convertJsonToFile(jsonString, fileName);
      const formData = [file];

      // Upload the file using the provided upload function
      const uploadedUrl = await upload({ client, files: formData });
      setData(uploadedUrl.toString());
      setIsLoading(false);
      return uploadedUrl.toString();
    } catch (error) {
      setHasError(error as Error);
      setIsLoading(false);
      console.error("Error uploading file:", error);
      return 'Error';
    }
  };

  return { isLoading, data, hasError, uploadJsonFile };
};

export default useUploadJsonFile;