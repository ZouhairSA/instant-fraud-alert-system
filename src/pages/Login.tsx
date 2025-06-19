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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-300 overflow-hidden">
      {/* Bulles animées en fond */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-100 opacity-30 rounded-full blur-2xl animate-float"></div>
      </div>
      {/* Header avec logo à gauche et retour à droite */}
      <div className="flex items-center justify-between mb-8 animate-fade-in w-full max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center justify-center">
          <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-14 w-auto drop-shadow-xl animate-fade-in" />
        </Link>
        <Link to="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Retour à l'accueil
        </Link>
      </div>
      <div className="w-full max-w-md z-10">
        {/* Carte de connexion glassmorphism */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 animate-slide-in-up">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2 animate-fade-in">Connexion</h1>
          <p className="text-center text-gray-600 text-base mb-6 animate-fade-in delay-100">Accédez à votre dashboard de surveillance</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in delay-200">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@detectorapp.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="h-12 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg transition-all duration-200 bg-white/80 shadow-sm"
              />
            </div>
            <div className="space-y-2 animate-fade-in delay-300">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="h-12 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg transition-all duration-200 bg-white/80 shadow-sm"
              />
            </div>
            <div className="flex items-center justify-between animate-fade-in delay-400">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">Mot de passe oublié ?</Link>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 relative overflow-hidden group animate-fade-in delay-500"
              disabled={isLoading}
            >
              <span className="absolute left-0 top-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg"></span>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center animate-fade-in delay-700">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Créer un compte</Link>
            </p>
          </div>
        </div>
        {/* Encart démo animé */}
        <div className="mt-8 animate-slide-in-up delay-500">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50 border-0 rounded-2xl shadow-lg px-6 py-4 gap-2">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-amber-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="font-bold text-amber-900 text-base">Démonstration</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-sm text-amber-800">
              <span>Email : <span className="font-semibold">admin@detectorapp.com</span></span>
              <span>Mot de passe : <span className="font-semibold">admin123</span></span>
            </div>
          </div>
        </div>
      </div>
      {/* Animations keyframes */}
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-bounce-slow { animation: bounce-slow 6s infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.4; } }
        .animate-pulse-slow { animation: pulse-slow 8s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        .animate-float { animation: float 7s infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slide-in-up { from { opacity: 0; transform: translateY(60px);} to { opacity: 1; transform: none; } }
        .animate-slide-in-up { animation: slide-in-up 1.1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Login;
