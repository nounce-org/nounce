import React from "react";

interface StepsProps {
  steps: string[];
  currentStep: number;
}

const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <ol className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4 w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        // Step is completed
        if (stepNumber < currentStep) {
          return (
            <li key={step} className="flex">
              <span className="bg-green-200 p-1.5 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
          );
        }

        // Step is current
        if (stepNumber === currentStep) {
          return (
            <li key={step} className="flex items-center justify-center gap-2 font-bold">
              <span className="h-6 w-6  bg-blue-50 text-center text-[10px]/6 font-bold">{stepNumber}</span>
              <span>{step}</span>
            </li>
          );
        }

        // Step is upcoming
        return (
          <li key={step} className="flex items-center justify-end gap-2 font-semibold">
            <span className="h-6 w-6 bg-gray-50 text-center text-[10px]/6 font-bold text-gray-600">{stepNumber}</span>
            <span>{step}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
