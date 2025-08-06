"use client";

import {useState} from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface SongCardProps {
  id: number;
  songName: string;
  artist: string;
  songLink: string;
  songFile?: string;
  wishes?: string;
  editedFile: string;
  feedback?: string;
}

export function Songcard({
  id,
  songName,
  artist,
  songLink,
  songFile = "No file provided",
  wishes = "No wishes provided",
  editedFile,
  feedback = "No feedback provided",
}: SongCardProps) {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className={`flex p-4 border-2 rounded-4xl shadow mb-7 border-gray-700 ${isFinished ? "line-through text-muted-foreground" : ""}`}>
      <Checkbox
        checked={isFinished}
        onCheckedChange={(checked) => setIsFinished(Boolean(checked))}
        className="ml-5 mr-3 h-6 w-6 border-black dark:border-gray-800"
      />
      <h1 className="mr-3">{songName}</h1>
      <div className="mr-3 dark:text-gray-400 font-bold">|</div>
      <p className="mr-3">{artist}</p>
      <div className="mr-3 dark:text-gray-400 font-bold">|</div>
      <p className="mr-3">{songFile}</p>
      <div className="mr-3 dark:text-gray-400 font-bold ">|</div>
      <p className="mr-3">{wishes}</p>
      <div className="mr-3 dark:text-gray-400 font-bold">|</div>
      <p className="mr-3">{editedFile}</p>
      <div className="mr-3 dark:text-gray-400 font-bold">|</div>
      <p className="mr-3">{feedback}</p>
    </div>
  )
}