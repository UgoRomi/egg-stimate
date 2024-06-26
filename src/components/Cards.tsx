"use client";
import {
  showHideVotes,
  updateUser as updateUserAction,
  vote as voteAction,
} from "@/app/_actions";
import Image from "next/image";
import { useCallback, useRef, useTransition } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { cn, getRoomIdFromUrl, getUserFromCookie } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { Results } from "./Results";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { UserProfile } from "./UserProfile";

interface CardProps {
  value: number;
  onClick: (value: number) => void;
}

const Card: React.FC<CardProps> = ({ value, onClick }) => {
  const users = useStore((state) => state.users);
  const updateUser = useStore((state) => state.updateUser);
  const userCookie = getUserFromCookie();
  const currentUser = !userCookie ? undefined : users.get(userCookie.id);
  if (!currentUser) {
    return null;
  }
  const hasLowerFocus =
    currentUser?.current_vote !== undefined &&
    currentUser.current_vote !== null &&
    currentUser.current_vote !== value;
  const isCurrentVote = currentUser?.current_vote === value;

  return (
    <div className={cn("w-[120px] h-[189px] flex justify-center items-center")}>
      <div
        className={cn(
          "w-[93px] h-[146px] cursor-pointer transition-all",
          hasLowerFocus && "opacity-50",
          isCurrentVote && "w-[120px] h-[189px]"
        )}
        onClick={() => {
          onClick(value);
          updateUser({ ...currentUser, current_vote: value });
        }}
      >
        <AspectRatio.Root ratio={93 / 146}>
          <Image
            priority
            src={`/cards/${value}.svg`}
            alt={`Scrum poker card ${value}`}
            fill
          />
        </AspectRatio.Root>
      </div>
    </div>
  );
};

export function Cards() {
  const users = useStore((state) => state.users);
  const userCookie = getUserFromCookie();
  const currentUser = !userCookie ? undefined : users.get(userCookie.id);
  const showVotes = useStore((state) => state.showVotes);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const spectators = useStore((state) =>
    Array.from(state.users.values()).filter((user) => user.is_spectator)
  );
  const currentRoom = useStore((state) => state.currentRoom);

  const submitVote = useCallback(
    (vote: number) => {
      startTransition(() => voteAction(vote));
      // if every user has voted, toggle the votes
      if (
        Array.from(users.values()).every(
          (user) =>
            user.current_vote !== null ||
            user.id === currentUser?.id ||
            user.is_spectator
        )
      ) {
        if (!currentRoom?.id) return;
        startTransition(() => showHideVotes(currentRoom.id.toString(), true));
      }
    },
    [currentUser?.id, users, currentRoom?.id]
  );

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-white p-4 flex items-center flex-col">
      <div className="w-full flex mb-7">
        {spectators.length > 0 && (
          <span className="flex items-center">
            👀 {spectators.length}{" "}
            {spectators.length > 1 ? "spettatori" : "spettatore"}
          </span>
        )}
        <UserProfile />
        <button
          onClick={() => {
            // copy the current URL to the clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copiato negli appunti");
          }}
          type="button"
          className="rounded-full flex justify-center items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-500"
        >
          <Copy />
          Invita il team
        </button>
      </div>
      <div className="px-10 w-full h-full flex justify-center items-center">
        {showVotes ? (
          <Results />
        ) : currentUser?.is_spectator ? (
          <div className="h-full flex justify-center items-center flex-col">
            <span className="text-6xl mb-3">👀</span>
            <span className="text-xl mb-2 font-semibold">
              Oggi sei uno spettatore!
            </span>
            <span className="text-center mb-6">
              In questa modalità non ti è consentito votare. Se cambi idea puoi
              unirti alla partita quando vuoi 🧡
            </span>
            <button
              disabled={isPending}
              onClick={() => {
                const formData = new FormData();
                formData.append(
                  "is_spectator",
                  currentUser.is_spectator ? "off" : "on"
                );
                formData.append("name", currentUser.name);
                formData.append("userId", currentUser.id.toString());
                startTransition(() => updateUserAction(formData));
              }}
              className="rounded-full bg-orange-500 cursor-pointer px-5 py-3 text-md text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ho cambiato idea
            </button>
          </div>
        ) : currentRoom?.type === "trio_reflection" ? (
          <div className="flex flex-col">
            <p>Scegli la tua carta 👇🏻</p>
            <div
              ref={ref}
              className="grid grid-cols-[repeat(3,120px)] gap-x-7 gap-y-2 overflow-y-auto"
              style={{
                maxHeight: `calc(100vh - ${
                  ref.current?.offsetTop ?? 0
                }px - 16px)`,
              }}
            >
              <Card value={12} onClick={submitVote} />
              <Card value={13} onClick={submitVote} />
              <Card value={14} onClick={submitVote} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p>Scegli la tua carta 👇🏻</p>
            <div
              ref={ref}
              className="grid grid-cols-[repeat(3,120px)] gap-x-7 gap-y-2 overflow-y-auto"
              style={{
                maxHeight: `calc(100vh - ${
                  ref.current?.offsetTop ?? 0
                }px - 16px)`,
              }}
            >
              <Card value={0} onClick={submitVote} />
              <Card value={1} onClick={submitVote} />
              <Card value={2} onClick={submitVote} />
              <Card value={3} onClick={submitVote} />
              <Card value={4} onClick={submitVote} />
              <Card value={5} onClick={submitVote} />
              <Card value={6} onClick={submitVote} />
              <Card value={7} onClick={submitVote} />
              <Card value={8} onClick={submitVote} />
              <Card value={9} onClick={submitVote} />
              <Card value={10} onClick={submitVote} />
              <Card value={11} onClick={submitVote} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
