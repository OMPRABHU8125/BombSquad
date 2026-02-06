import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Unauthorized</h1>
      <p className="text-gray-600 mb-6">
        You must be logged in to access this page.
      </p>

      <Button onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </div>
  );
};

export default Unauthorized;
