import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";
function ImageUploadForm() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    fetchImages();
  }, []);
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      alert("No Files");
      return;
    }
    const file = e.target.files[0];
    const filetype = file.name.split(".")[file.name.split.length - 1];
    await Storage.put(`${uuid()}.${filetype}`, file);
    fetchImages();
  }
  async function fetchImages() {
    const files = await Storage.list("", { pageSize: 5 });
    const signedFiles = await Promise.all(
      files.results.map(async (file) => {
        const signedFile = await Storage.get(file.key!);
        return signedFile;
      })
    );
    setImages(signedFiles);
  }
  return (
    <div>
      <header>
        <input type="file" onChange={onChange} />
        {images.map((image) => (
          <img src={image} key={image} style={{ width: 500 }} />
        ))}
      </header>
    </div>
  );
}

export default ImageUploadForm;
