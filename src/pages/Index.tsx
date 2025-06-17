import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Bell, Users, Key, ArrowDown } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Détecteur de Triche</span>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                Système Intelligent de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Détection de Triche
                </span>
                en Temps Réel
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
                Analyse automatique des caméras et détection instantanée des fraudes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg transition-all duration-300 hover-scale">
                  Commencer
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover-scale">
                En savoir plus
              </Button>
            </div>

            <div className="mt-12 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&crop=center"
                alt="Technologie de surveillance avancée"
                className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
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
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fonctionnalités Avancées
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Découvrez toutes les capacités de notre système de détection intelligent
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Contactez-nous
              </h2>
              <p className="text-lg text-gray-600">
                Vous avez des questions ? Nous sommes là pour vous aider.
              </p>
            </div>
            
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      disabled={isSubmitting}
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
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Ou contactez-nous directement à : 
                    <a href="mailto:contact@detectorapp.com" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                      contact@detectorapp.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Camera className="h-6 w-6" />
                <span className="text-lg font-bold">Détecteur de Triche</span>
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
