import type { Creator } from "../../models/Creator";
import { createCar } from "../../api/create-creator";


type CreateCarButtonProps = {
    data: Creator
    //onClick: () => Promise<void>;
};

export default function CreateCarButton({data}: CreateCarButtonProps) {
    console.log("Received data", data);
  const sample : Creator = {
    name: "Better Car model",
    url: "http://www.example.com",
    description: "Test Image",
    imageURL: "http://testimageurl",
  };
  return (
    <button
      onClick={() =>createCar(sample)}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
    >
      Create Car
    </button>
  );
}
