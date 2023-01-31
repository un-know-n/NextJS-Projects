import { ChangeEvent, useState } from 'react';

export const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // Check if file is uploaded
    if (event.target.files?.[0]) {
      // Read the url of the file
      reader.readAsDataURL(event.target.files[0]);
    }

    // When reader loaded the info and if it is successful, write it to local state
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return { selectedFile, setSelectedFile, onSelectFile };
};
