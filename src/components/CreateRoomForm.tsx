'use client'
import { createRoom } from "@/app/_actions";
import { SubmitButton } from "./SubmitButton";
import * as RadioGroup from "@radix-ui/react-radio-group";

export default function CreateRoomForm() {
  return (
    <form
      className="flex gap-6 flex-col justify-center items-center"
      action={createRoom}
    >
      <div className="max-w-xs min-w-[250px] h-">
        <label htmlFor="name" className="sr-only">
          Room Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-md sm:leading-6"
            placeholder="Drip e Top Bella non valgono"
          />
        </div>
      </div>
      <RadioGroup.Root
      className="flex gap-7"
      defaultValue="refinement"
      aria-label="Room type"
      name='type'
    >
      <div className="flex items-center cursor-pointer">
        <RadioGroup.Item
          className="bg-white w-[25px] h-[25px] rounded-full shadow-sm"
          value="refinement"
          id="r1"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-orange-500" />
        </RadioGroup.Item>
        <label className="leading-none pl-2" htmlFor="r1">
          Refinement
        </label>
      </div>
      <div className="flex items-center cursor-pointer">
        <RadioGroup.Item
          className="bg-white w-[25px] h-[25px] rounded-full shadow-sm"
          value="trio_reflection"
          id="r2"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-orange-500" />
        </RadioGroup.Item>
        <label className="leading-none pl-2" htmlFor="r2">
          Trio Reflection
        </label>
      </div>
    </RadioGroup.Root>
      <SubmitButton text="Crea la super room" />
    </form>
  );
}
