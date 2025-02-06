import React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Define step types
type Step =
  | "size"
  | "color"
  | "smallFlowers"
  | "mainFlowers"
  | "specialItems"
  | "animals";

type StepIndicatorProps = {
  currentStep: Step;
  steps: Step[];
  onStepClick: (step: Step) => void;
  canNavigateToStep: (step: Step) => boolean;
  getStepStatus: (step: Step) => "complete" | "current" | "upcoming";
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
  canNavigateToStep,
  getStepStatus,
}) => {
  const getStepName = (step: Step) => {
    switch (step) {
      case "size":
        return "Size";
      case "color":
        return "Color";
      case "smallFlowers":
        return "Small Flowers";
      case "mainFlowers":
        return "Main Flowers";
      case "specialItems":
        return "Special Items";
      case "animals":
        return "Animals";
    }
  };

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-0">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((step, stepIdx) => (
            <li key={step} className="relative flex flex-1 justify-center">
              {stepIdx !== steps.length - 1 && (
                <div
                  className="absolute left-[50%] right-[-50%] top-[50%] -translate-y-[50%] flex items-center z-0"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-0.5 w-full",
                      getStepStatus(step) === "complete"
                        ? "bg-main-600"
                        : "bg-gray-200"
                    )}
                  />
                </div>
              )}

              <button
                onClick={() => canNavigateToStep(step) && onStepClick(step)}
                disabled={!canNavigateToStep(step)}
                className={cn(
                  "relative flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full z-10",
                  getStepStatus(step) === "complete"
                    ? "bg-main-600 hover:bg-main-700"
                    : getStepStatus(step) === "current"
                    ? "border-2 border-main-600 bg-white"
                    : "border-2 border-gray-300 bg-white hover:border-gray-400",
                  !canNavigateToStep(step) && "cursor-not-allowed opacity-50"
                )}
              >
                {getStepStatus(step) === "complete" ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                ) : (
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium",
                      getStepStatus(step) === "current"
                        ? "text-main-600"
                        : "text-gray-500"
                    )}
                  >
                    {stepIdx + 1}
                  </span>
                )}
              </button>

              <span
                className={cn(
                  "absolute top-8 sm:top-10 text-[10px] sm:text-sm font-medium text-center z-10",
                  getStepStatus(step) === "complete" ||
                    getStepStatus(step) === "current"
                    ? "text-main-600"
                    : "text-gray-500"
                )}
              >
                {getStepName(step)}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default StepIndicator;
