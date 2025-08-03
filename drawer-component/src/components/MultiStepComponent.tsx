"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import "./styles.css";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setCurrentDirection] = useState("right")
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <div
            ref={ref}
          >
            <h2 className="heading">This is step one</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="skeletons">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </div>
        );
      case 1:
        return (
          <div
            ref={ref}
          >
            <h2 className="heading">This is step two</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="skeletons">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </div>
        );
      case 2:
        return (
          <div
            ref={ref}
          >
            <h2 className="heading">This is step three</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="skeletons">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" style={{ width: 128 }} />
              <div className="skeleton" style={{ width: 224 }} />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </div>
        );
    }
  }, [currentStep]);

  return (
    <div className="multi-step-wrapper">
      <div className="multi-step-inner">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-110%", opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.2,
              bounce: 0
            }}
            style={{
              height: bounds.height
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
        <div className="actions">
          <button
            className="secondary-button"
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep === 0) {
                return;
              }
              setCurrentDirection("right")
              setCurrentStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <button
            className="primary-button"
            disabled={currentStep === 2}
            onClick={() => {
              if (currentStep === 2) {
                setCurrentStep(0);
                return;
              }
              setCurrentDirection("left")
              setCurrentStep((prev) => prev + 1);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}