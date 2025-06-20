import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Bell, Users, Key, ArrowDown, MapPin } from "lucide-react";
import { submitContactForm } from "@/services/contactService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Camera,
      title: "Gestion des Caméras",
      description: "Ajoutez et gérez facilement vos caméras de surveillance avec une interface intuitive"
    },
    {
      icon: Bell,
      title: "Dashboard d'Alertes",
      description: "Recevez des notifications instantanées et consultez l'historique des détections"
    },
    {
      icon: Key,
      title: "Authentification Sécurisé",
      description: "Système d'authentification robuste avec gestion des rôles administrateurs"
    },
    {
      icon: Users,
      title: "Surveillance Temps Réel",
      description: "Monitoring continu et analyse automatique des flux vidéo"
    }
  ];

  const steps = [
    { icon: "🔐", title: "Connexion", description: "Authentifiez-vous de manière sécurisée" },
    { icon: "🎥", title: "Ajout des Caméras", description: "Configurez vos caméras de surveillance" },
    { icon: "🤖", title: "Lien avec le Modèle", description: "Connectez à notre IA de détection sur Render" },
    { icon: "🚨", title: "Détection des Triches", description: "Analyse automatique en temps réel" },
    { icon: "📊", title: "Alertes et Suivi", description: "Notifications instantanées et reporting" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-wrap md:flex-nowrap h-auto md:h-16 items-center justify-between px-2 md:px-6">
          <div className="flex items-center space-x-2 w-full md:w-auto justify-center md:justify-start py-2 md:py-0">
            <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-8 md:h-10 w-auto mr-2" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              Comment ça marche
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        <div className="container px-2 md:px-4 lg:px-6 relative z-10">
          <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center overflow-hidden">
            {/* Gradient animé en fond */}
            <style>{`
              @keyframes gradient-x {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              .animate-gradient-x {
                background-size: 200% 200%;
                animation: gradient-x 8s ease-in-out infinite;
              }
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(30px);}
                to { opacity: 1; transform: none;}
              }
              .animate-fade-in {
                animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
              }
            `}</style>
            <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-r from-blue-100 via-white to-blue-200 opacity-80"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in">
              Protégez vos examens et concours<br />
              <span className="block bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-transparent animate-gradient-x">
                Détection de Triche Instantanée
              </span>
              <span className="block">par Intelligence Artificielle</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              Surveillez, détectez et agissez en temps réel grâce à notre plateforme intelligente et sécurisée.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                Tester la démo
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-700 font-bold bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300">
                Nous contacter
              </button>
            </div>
            {/* Image animée */}
            <div className="w-full flex justify-center mt-12 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=400&fit=crop&crop=center"
                alt="Technologie de surveillance avancée"
                className="rounded-2xl shadow-2xl mx-auto max-w-full w-full md:max-w-4xl border-4 border-white transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Scroll indicator animé */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
              <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Surveillance Intelligente et Détection Avancée
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre système révolutionnaire combine l'intelligence artificielle et la surveillance en temps réel 
                pour détecter automatiquement les comportements frauduleux et les tentatives de triche.
              </p>
              
              <div className="grid gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Surveillance en temps réel 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Détection automatique basée sur l'IA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Notifications instantanées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Interface d'administration complète</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop&crop=center"
                alt="Dashboard de surveillance"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container px-2 md:px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fonctionnalités Avancées
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Découvrez toutes les capacités de notre système de détection intelligent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Un processus simple et efficace en 5 étapes
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-blue-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Formulaire de contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center h-full min-h-[28rem] md:min-h-[32rem]">
              <form onSubmit={handleSubmit} className="space-y-6 h-full">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                    className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={isSubmitting}
                    className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    disabled={isSubmitting}
                    className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500">
                Ou contactez-nous directement à <a href="mailto:contact@detectorapp.com" className="text-blue-600 underline">contact@detectorapp.com</a>
              </div>
            </div>
            {/* Carte Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-full min-h-[28rem] md:min-h-[32rem] flex flex-col justify-center">
              <iframe
                src="https://www.google.com/maps?q=293+Bd+Ghandi,+Casablanca+20410&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation"
                className="flex-1"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container px-2 md:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-8 md:h-10 w-auto mr-2" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sécurité en temps réel pour un monde plus sûr.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Navigation</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Accueil</a>
                <Link to="/dashboard" className="block text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Légal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mentions légales</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Conditions d'utilisation</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>contact@detectorapp.com</p>
                <p>Support 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Détecteur de Triche. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
