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

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      //   onSubmit={onSubmit}
      action="http://localhost:5000/upload"
      encType="multipart/form-data"
      method="POST"
    >
      <Input id="policy" name="file" type="file" placeholder="Policy Upload" />
      <Button>Submit</Button>
    </form>
  );
};
