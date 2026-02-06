import { Volume2, VolumeX } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { cn } from "@/lib/utils";

interface ReadAloudButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ReadAloudButton = ({ text, className, size = "md" }: ReadAloudButtonProps) => {
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  const sizeClasses = {
    sm: "p-1.5 w-8 h-8",
    md: "p-2 w-10 h-10",
    lg: "p-3 w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-xl transition-all",
        isSpeaking 
          ? "bg-primary text-primary-foreground shadow-krishi-primary" 
          : "bg-card shadow-krishi-sm hover:shadow-krishi-md",
        sizeClasses[size],
        className
      )}
      title={isSpeaking ? "Stop reading" : "Read aloud"}
    >
      {isSpeaking ? (
        <VolumeX className={cn(iconSizes[size])} />
      ) : (
        <Volume2 className={cn(iconSizes[size], "text-foreground")} />
      )}
    </button>
  );
};

export default ReadAloudButton;
