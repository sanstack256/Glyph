"use client";

import { useState } from "react";

export default function Navbar() {
  const [showModal, setShowModal] =
    useState(false);

  return (


    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            src="/nlogo.png"
            alt="Glyph"
            className="h-10 w-auto"
          />

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
    rounded-xl
    border
    border-white/20
    px-4
    py-2
    text-sm
    transition-all
    duration-200
    hover:bg-white/10
  "
        >
          How it Works
        </button>
      </div>


      {
        showModal && (
          <div
            className="
  fixed
  inset-0
  z-50
  flex
  items-center
  justify-center
  bg-black/70
  backdrop-blur-sm
  animate-in
  fade-in
  duration-200
"

            onClick={() =>
              setShowModal(false)
            }
          >
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
              className="

  w-full
  max-w-md
  rounded-3xl
  border
  border-white/10
  bg-[#111]
  p-6
  shadow-2xl
  animate-in
  zoom-in-95
  duration-200
"
            >
              <h2 className="mb-4 text-xl font-semibold">
                How Glyph Works
              </h2>

              <div className="space-y-4 text-sm text-white/70">

                <p>
                  Upload any image to begin.
                </p>

                <p>
                  Glyph analyzes the brightness
                  of every pixel and maps it to
                  carefully selected ASCII
                  characters.
                </p>

                <p>
                  Increase the Detail slider for
                  sharper, more detailed artwork.
                </p>

                <p>
                  When you're happy with the
                  result, download it as a PNG.
                </p>

                <p>
                  ASCII Art Generator
                  Version 1.0
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
          mt-6
          w-full
          rounded-xl
          bg-white
          py-2
          text-black
        "
              >
                Got it
              </button>
            </div>
          </div>
        )
      }


    </header >
  );
}