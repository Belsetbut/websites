"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, Download, Headphones } from "lucide-react";

export interface SongCardProps {
  id: Id<"songs">;
  songName: string;
  songLink: string;
  songFileId?: Id<"_storage">;
  wishes?: string;
  editedFile?: Id<"_storage">;
  feedback?: string;
}

export function Songcard(props: SongCardProps) {
  const [isFinished, setIsFinished] = useState(false);

  const fileUrl = useQuery(
    api.songs.getFileUrl,
    props.songFileId ? { fileId: props.songFileId } : "skip"
  );

  const editedFileUrl = useQuery(
    api.songs.getFileUrl,
    props.editedFile && props.editedFile !== "Noch nicht bearbeitet" ? { fileId: props.editedFile } : "skip"
  );

  console.log("For " + props.songName + ":" + props.editedFile)
  return (
    <motion.div
      layout
      whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      className="relative p-5 rounded-2xl border mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-md transition-colors duration-300 overflow-hidden"
    >
      {/* Dark green overlay with blur when finished */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-green-600/70 dark:bg-green-700/70 backdrop-blur-3xl pointer-events-none z-100"
          />
        )}
      </AnimatePresence>

      {/* Completion Button */}
      <motion.button
        onClick={() => setIsFinished(!isFinished)}
        whileTap={{ scale: 0.9 }}
        className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 z-20
          ${isFinished
            ? "bg-green-500 border-green-500 text-white backdrop-blur-3xl"
            : "bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-600 dark:text-gray-300"
          }`}
      >
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Song Name Section */}
      <div className={`${isFinished ? "opacity-80" : ""} relative z-10`}>
        <h3 className="font-semibold text-lg mb-3 dark:text-white">
          {props.songName}
        </h3>
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap gap-3 border-gray-200 dark:border-gray-700 pt-3 relative z-10">
        {props.songLink && props.songLink.trim() !== "" && !props.songLink.includes("No link provided") && (
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            href={props.songLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <Headphones size={16} />
            Online anhören
          </motion.a>
        )}

        {fileUrl && (
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Datei herunterladen
          </motion.a>
        )}
      </div>

      {/* Wishes Section */}
      {props.wishes && (
        <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3 relative z-10">
          <p className="text-sm italic text-gray-600 dark:text-gray-300">
            Wünsche: {props.wishes}
          </p>
        </div>
      )}

      {/* Edited file Section */}
      <div className="flex flex-wrap gap-3 border-gray-200 dark:border-gray-700 pt-3 relative z-10">
        <p className="mt-1">
        Bearbeitete Datei:
        </p>
        {editedFileUrl ? (
          <motion.a
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            href={editedFileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 h-8 rounded-full border border-green-500 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Bearbeitete Datei herunterladen
          </motion.a>
        ) : (
          <span className="text-sm mt-2 italic text-gray-600 dark:text-gray-300">
            Noch nicht bearbeitet
          </span>
        )}
      </div>

      {/* Feedback Section */}
      {props.feedback && (
        <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3 relative z-10">
          <p className="text-sm italic text-gray-600 dark:text-gray-300">
            Feedback: {props.feedback}
          </p>
        </div>
      )}

    </motion.div>
  );
}