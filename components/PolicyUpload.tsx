import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const PolicyUpload = () => {
  //   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault(); // Prevent the default form submission behavior

  //     const formData = new FormData(event.currentTarget);

  //     fetch("http://localhost:5000/upload", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         // Add any headers if necessary, for example:
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Handle the response data
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         // Handle any errors
  //         console.error("Error:", error);
  //       });
  //   };
  const [fileInput, setFileInput] = useState<any | null>(null);

  const handleChange = (event: any) => {
    setFileInput(event.target.files[0]);
  };

  return (
    <form
      className="w-full space-y-3"
      //   onSubmit={onSubmit}
      action="http://localhost:5000/upload"
      encType="multipart/form-data"
      method="POST"
    >
      <label className="text-sm text-slate-500">
        Please Select file to analizea and then click submit
      </label>
      <Input
        id="policy"
        name="file"
        type="file"
        placeholder="Policy Upload"
        onChange={handleChange}
      />
      <Button disabled={!fileInput} className="w-full">
        Submit
      </Button>
    </form>
  );
};
