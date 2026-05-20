interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-muted font-body text-xs">
          Stap {currentStep} van {totalSteps}
        </span>
        <span className="text-text-muted font-body text-xs">
          {Math.round(pct)}% ingevuld
        </span>
      </div>
      <div className="h-1 bg-[#E8E0D0] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
