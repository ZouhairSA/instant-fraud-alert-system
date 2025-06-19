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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
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
              className="mt-1 h-11 text-base rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Saisissez votre mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="mt-1 h-11 text-base rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" />
              <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
          </div>
          <button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
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
      <div className="mt-6 w-full max-w-md flex flex-col items-center gap-2 text-sm bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
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
