import { FormEvent } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datepicker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import Tiptap from "./Tiptap";

interface ReviewInputParams {
  handleSubmit: () => any;
  handleTitleChange: (newTitle: string) => any;
  handleDateChange: (newDate: Date) => any;
  handleRatingChange: (newRating: number[]) => any;
  handleContentChange: (newContent: string) => any;
  reviewInputData: ReviewFormData;
  isEditing : boolean;
}

export interface ReviewFormData {
  title: string;
  date: Date;
  rating: number[];
  content: string;
}

export default function ReviewInput({
  handleSubmit,
  handleTitleChange,
  handleContentChange,
  handleDateChange,
  handleRatingChange,
  reviewInputData,
  isEditing
}: ReviewInputParams) {
  const checkForEditAndSubmit = (e : FormEvent) => {
    e.preventDefault();
    handleSubmit();
  }
  return (
    <form onSubmit={(e) => checkForEditAndSubmit(e)}>
      <div className="w-full px-4 border-gray-700 border rounded-md">
        <div className="flex items-center justify-center">
          <Input
            type="text"
            className="my-8 px-4 py-3 border-b border-r border-l border-gray-700 text-gray-300 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none bg-gray-900 focus:border-gray-700"
            placeholder="Title"
            value={reviewInputData.title}
            onChange={(e: FormEvent) =>
              handleTitleChange((e.target as HTMLInputElement).value)
            }
          ></Input>

          <DatePicker
            className="w-1/3 ml-8 bg-gray-900 text-gray-300 border-gray-700"
            onChange={handleDateChange}
            defaultDate={reviewInputData.date}
            
          ></DatePicker>
        </div>
        <div className="flex items-center">
          <Slider
            defaultValue={reviewInputData.rating}
            max={100}
            step={5}
            className="w-full px-4 mb-8"
            onValueChange={handleRatingChange}
          />
          <Label className="border border-gray-700 text-gray-300 p-2 w-16 mx-4 rounded-md font-medium text-[16px]outline-none bg-gray-900 mb-8">
            {reviewInputData.rating}
          </Label>
        </div>

        <Tiptap
          content={reviewInputData.content}
          onChange={(newContent: string) => handleContentChange(newContent)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="hover:bg-green-300 hover:text-gray-900 mt-4 border border-green-300 text-green-300 bg-gray-900"
          onClick={(e: FormEvent) => checkForEditAndSubmit(e)}
        >
          {isEditing? "Edit" : "Add"} Review
        </Button>
      </div>
    </form>
  );
}
