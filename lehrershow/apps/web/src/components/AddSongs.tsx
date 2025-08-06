"use client";

import { Button } from "./ui/button";

export function AddSongs() {
    return (
              <Button className="flex float-right mt-5 cursor-pointer" onClick={AddSong}>Füge ein Lied hinzu</Button>
    )}

function AddSong() {
    // Logic to add a song goes here
    console.log("Add song button clicked");
}