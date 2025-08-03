"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultView, Key, Phrase, RemoveWallet } from "../components/components";
import { CloseIcon } from "../components/icons";

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

  return (
    <>
      <button
        className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
        style={{ fontFamily: "Open Runde" }}
      >
        Try it out
      </button>
      <AnimatePresence mode="popLayout">
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Portal>
            <Drawer.Overlay
              className="fixed inset-0 z-10 bg-black/30"
              onClick={() => setIsOpen(false)}
            />
            <Drawer.Content
              asChild
              className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-none md:mx-auto md:w-full"
            >
              <motion.div
                animate={{ height: bounds.height }}
              >
                <Drawer.Close asChild>
                  <button
                    data-vaul-no-drag=""
                    className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
                  >
                    <CloseIcon />
                  </button>
                </Drawer.Close>
                <motion.div
                  key={view}
                  ref={elementRef}
                  className="px-6 pb-6 pt-2.5 antialiased"
                  style={{ fontFamily: "Open Runde" }}
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9
                  }}
                >
                  {content}
                </motion.div>
              </motion.div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </AnimatePresence>
    </>
  );
}