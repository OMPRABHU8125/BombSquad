import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');

        // Handle authentication error
        if (error) {
          console.error('Authentication error:', error);
          toast({
            title: "Authentication Failed",
            description: "Unable to sign in with Google. Please try again.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        // Handle missing token
        if (!token) {
          console.error('No token received');
          navigate('/login');
          return;
        }

        // Save token to localStorage
        localStorage.setItem('token', token);
        console.log('Token saved successfully');

        // Fetch user profile data
        try {
          const response = await fetch('http://localhost:5000/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('User data saved:', userData);

            toast({
              title: "Welcome!",
              description: `Successfully logged in as ${userData.name}`,
            });
          } else {
            console.warn('Failed to fetch user profile, but continuing...');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          // Continue to home even if profile fetch fails
        }

        // Redirect to home page
        console.log('Redirecting to home...');
        navigate('/home');

      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Authenticating...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your sign in
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;