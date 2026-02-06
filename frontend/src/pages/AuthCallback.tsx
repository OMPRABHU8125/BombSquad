import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
          navigate('/login?error=' + error);
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

        // Fetch user profile data
        const response = await fetch('http://localhost:5000/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log('User authenticated:', userData);
          navigate('/home');
        } else {
          console.error('Failed to fetch user profile');
          navigate('/login');
        }

      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 animate-spin text-green-600 mx-auto mb-6" />
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