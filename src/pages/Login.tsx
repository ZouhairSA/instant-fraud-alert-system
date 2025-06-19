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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#bae6fd] overflow-hidden font-sans">
      {/* Fond animé : bulles et dégradé mouvant */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-indigo-200 opacity-30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 opacity-20 rounded-full blur-2xl animate-float2"></div>
      </div>
      {/* Header glassmorphism pro */}
      <header className="w-full flex justify-center pt-8 z-20">
        <div className="flex items-center justify-between w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 px-6 py-3 relative overflow-hidden">
          <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-12 w-auto drop-shadow-xl" />
          <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 text-blue-700 font-semibold rounded-full px-5 py-2 shadow-md transition-all duration-200 text-base ml-2 border border-blue-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Retour à l'accueil
          </a>
        </div>
      </header>
      {/* Formulaire centré verticalement */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-lg mx-auto z-10 px-2">
        {/* Carte de connexion glassmorphism premium */}
        <div className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-10 w-full mt-8 animate-fade-in overflow-hidden group">
          {/* Border glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-indigo-400/30 blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
          <h1 className="text-4xl font-black text-center text-gray-900 mb-2 tracking-tight drop-shadow">Connexion</h1>
          <p className="text-center text-gray-600 text-lg mb-8">Accédez à votre dashboard de surveillance</p>
          <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">Email</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@detectorapp.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="h-12 text-base pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-xl transition-all duration-200 bg-white/90 shadow-md border border-blue-100 focus:shadow-blue-200/60 hover:shadow-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">Mot de passe</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6a2 2 0 100 4 2 2 0 000-4zm6 2a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="h-12 text-base pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-xl transition-all duration-200 bg-white/90 shadow-md border border-blue-100 focus:shadow-blue-200/60 hover:shadow-lg"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 focus:ring-blue-400" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">Mot de passe oublié ?</a>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-extrabold shadow-xl transition-all duration-200 hover:scale-105 rounded-xl relative overflow-hidden group border-0 focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              <span className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg"></span>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Connexion...
                </span>
              ) : (
                <span className="drop-shadow">Se connecter</span>
              )}
            </button>
          </form>
          <div className="mt-7 text-center">
            <p className="text-base text-gray-600">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-bold transition-colors underline underline-offset-2">Créer un compte</a>
            </p>
          </div>
        </div>
        {/* Encart démo stylé premium */}
        <div className="mt-10 bg-gradient-to-br from-amber-100 to-amber-50 border-0 rounded-2xl shadow-xl px-8 py-5 w-full flex flex-col items-center animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-bold shadow">DEMO</span>
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <span className="font-bold text-amber-900 text-base">Démonstration</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-base text-amber-800">
            <span>Email : <span className="font-semibold">admin@detectorapp.com</span></span>
            <span>Mot de passe : <span className="font-semibold">admin123</span></span>
          </div>
        </div>
      </main>
      {/* Footer moderne enrichi */}
      <footer className="w-full mt-auto py-7 bg-white/70 backdrop-blur-2xl shadow-inner flex flex-col items-center justify-center z-10 border-t border-white/40">
        <div className="flex items-center gap-2 mb-1">
          <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-6 w-auto opacity-80" />
          <span className="text-gray-500 text-sm font-semibold">&copy; 2025 HESTIM - Détecteur de Triche. Tous droits réservés.</span>
        </div>
        <div className="flex gap-5 mt-2">
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold">Mentions légales</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold">Confidentialité</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold">Contact</a>
        </div>
        <div className="flex gap-3 mt-3">
          <a href="#" className="hover:scale-110 transition-transform"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z"/></svg></a>
          <a href="#" className="hover:scale-110 transition-transform"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.19 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.59-.86 8.19-4.52 8.19-8.93 0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
          <a href="#" className="hover:scale-110 transition-transform"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21.54 7.2a2.09 2.09 0 00-1.47-1.47C18.36 5.5 12 5.5 12 5.5s-6.36 0-8.07.23A2.09 2.09 0 002.46 7.2C2.23 8.91 2.23 12 2.23 12s0 3.09.23 4.8a2.09 2.09 0 001.47 1.47c1.71.23 8.07.23 8.07.23s6.36 0 8.07-.23a2.09 2.09 0 001.47-1.47c.23-1.71.23-4.8.23-4.8s0-3.09-.23-4.8zM9.75 15.02V8.98l6.5 3.02-6.5 3.02z"/></svg></a>
        </div>
      </footer>
      {/* Animations keyframes premium */}
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-bounce-slow { animation: bounce-slow 7s infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.4; } }
        .animate-pulse-slow { animation: pulse-slow 10s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        .animate-float { animation: float 8s infinite; }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-float2 { animation: float2 9s infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1.1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Login;
