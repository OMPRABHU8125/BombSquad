import { Camera, BookOpen, Leaf, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: Camera,
    label: "Scan Crop",
    description: "Detect disease",
    path: "/scan",
    color: "bg-krishi-green",
  },
  {
    icon: BookOpen,
    label: "Library",
    description: "Learn more",
    path: "/library",
    color: "bg-krishi-sky",
  },
  {
    icon: Leaf,
    label: "My Crops",
    description: "Track health",
    path: "/crops",
    color: "bg-krishi-warning",
  },
  {
    icon: MessageCircle,
    label: "Expert Help",
    description: "Get advice",
    path: "/expert",
    color: "bg-krishi-earth",
  },
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            to={action.path}
            className="bg-card rounded-2xl p-4 shadow-krishi-sm hover:shadow-krishi-md transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">{action.label}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickActions;
