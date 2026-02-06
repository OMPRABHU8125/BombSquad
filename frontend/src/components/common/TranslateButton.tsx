import { Languages } from "lucide-react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TranslateButtonProps {
  className?: string;
  variant?: "icon" | "full";
}

const TranslateButton = ({ className, variant = "icon" }: TranslateButtonProps) => {
  const { language, setLanguage, t } = useLanguage();
  const currentLang = languages.find(l => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 p-2 bg-card/90 backdrop-blur-sm rounded-xl shadow-krishi-sm hover:shadow-krishi-md transition-all",
            className
          )}
        >
          <Languages className="w-5 h-5 text-foreground" />
          {variant === "full" && (
            <span className="text-sm font-medium text-foreground">
              {currentLang?.nativeName}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {t('selectLanguage')}
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              language === lang.code && "bg-primary/10 text-primary"
            )}
          >
            <span>{lang.nativeName}</span>
            <span className="text-xs text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TranslateButton;
