import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement Firebase Authentication
      console.log("Login attempt:", formData);
      
      // Simulation d'authentification réussie
      setTimeout(() => {
        toast({
          title: "Connexion réussie",
          description: "Redirection vers le dashboard...",
        });
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Logo centré en haut, cliquable pour revenir à la page précédente */}
      <img
        src="/hestimLogo.png"
        alt="HESTIM Logo"
        className="h-14 w-auto mb-8 mt-8 cursor-pointer"
        onClick={() => window.history.back()}
        title="Retour"
      />
      {/* Formulaire de connexion simple */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-6 xs:p-4 mx-2">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Saisissez votre email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="mt-1 h-12 text-base rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 px-4"
            />
          </div>
          <div className="relative">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Saisissez votre mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="mt-1 h-12 text-base rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 pr-12 px-4"
            />
            {/* Icône œil pour afficher/masquer le mot de passe */}
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10-7 .18-1.02.64-2.01 1.32-2.87m2.1-2.1A9.956 9.956 0 0112 5c5 0 9.27 3.11 10 7-.18 1.02-.64 2.01-1.32 2.87m-2.1 2.1A9.956 9.956 0 0112 19c-1.02 0-2.01-.18-2.87-.51M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c0 4-5 7-10 7S2 16 2 12s5-7 10-7 10 3 10 7z" /></svg>
              )}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" />
              <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base sm:text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">Créer un compte</a>
          </p>
        </div>
      </div>
      {/* Section de copie email/password démo */}
      <div className="mt-6 w-full max-w-md flex flex-col items-center gap-2 text-sm bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm mx-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Email :</span>
          <span className="select-all">admin@detectorapp.com</span>
          <button
            type="button"
            className="ml-1 px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded text-xs text-blue-800 font-semibold transition-colors"
            onClick={() => navigator.clipboard.writeText('admin@detectorapp.com')}
            title="Copier l'email"
          >
            Copier
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Mot de passe :</span>
          <span className="select-all">admin123</span>
          <button
            type="button"
            className="ml-1 px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded text-xs text-blue-800 font-semibold transition-colors"
            onClick={() => navigator.clipboard.writeText('admin123')}
            title="Copier le mot de passe"
          >
            Copier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
