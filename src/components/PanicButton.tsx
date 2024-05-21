"use client";
import { useStore } from "@/lib/zustand";
import * as Dialog from "@radix-ui/react-dialog";
import useSWRMutation from "swr/mutation";

async function deleteUser(url: string) {
  await fetch(url, {
    method: "DELETE",
  });
}

export const PanicButton = () => {
  const currentRoom = useStore((state) => state.currentRoom);
  const { trigger } = useSWRMutation(
    currentRoom?.id ? `/api/rooms/${currentRoom.id}/users` : null,
    deleteUser,
    {
      onSuccess() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        // Reload the page
        window.location.reload();
      },
    }
  );
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white shadow-sm hover:bg-mauve3 inline-flex items-center justify-center rounded-md bg-red-600 px-4 mx-auto font-medium leading-none">
          ⚠️ Panic button
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-red-400 m-0 text-[17px] font-medium">
            Panic mode
          </Dialog.Title>
          <Dialog.Description className="text-neutral-600 mt-[10px] mb-5 text-[15px] leading-normal">
            Having some issues or bugs? Since the developer was too lazy to
            actually fix them all, you can use this button to start fresh and
            reload the page.
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={() => trigger()}
                className="bg-red-600 text-white inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Start fresh
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
