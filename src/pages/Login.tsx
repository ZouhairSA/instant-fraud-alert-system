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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <Link to="/" className="inline-flex items-center justify-center">
            <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-12 w-auto" />
          </Link>
        </div>
        {/* Login Form */}
        <Card className="shadow-2xl border-0 animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-extrabold text-center text-gray-900">Connexion</CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              Accédez à votre dashboard de surveillance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@detectorapp.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="h-12 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="h-12 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded border-gray-300" />
                  <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">Mot de passe oublié ?</Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-bold shadow-lg transition-all duration-200 hover:scale-105"
                disabled={isLoading}
              >
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
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Créer un compte</Link>
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Demo Credentials */}
        <Card className="border-0 bg-gradient-to-br from-amber-100 to-amber-50 shadow animate-fade-in">
          <CardContent className="pt-6">
            <p className="text-base font-bold text-amber-900 text-center mb-2">
              Démonstration
            </p>
            <div className="flex flex-col items-center gap-1 text-sm text-amber-800">
              <span>Email : <span className="font-semibold">admin@detectorapp.com</span></span>
              <span>Mot de passe : <span className="font-semibold">admin123</span></span>
            </div>
          </CardContent>
        </Card>
        {/* Back to Home */}
        <div className="text-center animate-fade-in">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
