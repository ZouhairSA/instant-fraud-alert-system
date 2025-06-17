
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Camera, Bell, Users, Key, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const [cameras, setCameras] = useState([
    { id: 1, name: "Caméra Salle 1", url: "rtsp://192.168.1.100:554/stream", api_link: "https://your-model.onrender.com/api/detect", status: "active" },
    { id: 2, name: "Caméra Salle 2", url: "rtsp://192.168.1.101:554/stream", api_link: "https://your-model.onrender.com/api/detect", status: "inactive" },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, camera_name: "Caméra Salle 1", datetime: "2025-06-17 14:30:25", status: "Triche détectée" },
    { id: 2, camera_name: "Caméra Salle 1", datetime: "2025-06-17 14:25:10", status: "Comportement suspect" },
    { id: 3, camera_name: "Caméra Salle 2", datetime: "2025-06-17 14:20:05", status: "Normal" },
  ]);

  const [newCamera, setNewCamera] = useState({
    name: "",
    url: "",
    api_link: "https://your-model.onrender.com/api/detect"
  });

  const { toast } = useToast();

  const handleAddCamera = (e: React.FormEvent) => {
    e.preventDefault();
    const camera = {
      id: cameras.length + 1,
      ...newCamera,
      status: "active"
    };
    setCameras([...cameras, camera]);
    setNewCamera({ name: "", url: "", api_link: "https://your-model.onrender.com/api/detect" });
    toast({
      title: "Caméra ajoutée",
      description: `${camera.name} a été ajoutée avec succès.`,
    });
  };

  const handleDeleteCamera = (id: number) => {
    setCameras(cameras.filter(camera => camera.id !== id));
    toast({
      title: "Caméra supprimée",
      description: "La caméra a été supprimée avec succès.",
    });
  };

  const stats = [
    { title: "Caméras Actives", value: cameras.filter(c => c.status === "active").length, icon: Camera, trend: "+2" },
    { title: "Alertes Aujourd'hui", value: alerts.length, icon: Bell, trend: "+5" },
    { title: "Détections", value: "12", icon: Key, trend: "+3" },
    { title: "Statut Système", value: "Opérationnel", icon: Users, trend: "100%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Camera className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Détecteur de Triche</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard Administrateur</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline">
                Profile Admin
              </Button>
              <Link to="/login">
                <Button variant="ghost">Déconnexion</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Camera Form */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Ajouter une Caméra</span>
                </CardTitle>
                <CardDescription>
                  Ajoutez une nouvelle caméra au système de surveillance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCamera} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="camera-name">Nom de la caméra</Label>
                      <Input
                        id="camera-name"
                        placeholder="Caméra Salle 3"
                        value={newCamera.name}
                        onChange={(e) => setNewCamera({...newCamera, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="camera-url">URL de la caméra</Label>
                      <Input
                        id="camera-url"
                        placeholder="rtsp://192.168.1.102:554/stream"
                        value={newCamera.url}
                        onChange={(e) => setNewCamera({...newCamera, url: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-link">Lien API du modèle Render</Label>
                    <Input
                      id="api-link"
                      placeholder="https://your-model.onrender.com/api/detect"
                      value={newCamera.api_link}
                      onChange={(e) => setNewCamera({...newCamera, api_link: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Ajouter la caméra
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Cameras List */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Caméras Connectées</CardTitle>
                <CardDescription>
                  Liste de toutes les caméras configurées dans le système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cameras.map((camera) => (
                      <TableRow key={camera.id}>
                        <TableCell className="font-medium">{camera.name}</TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                          {camera.url}
                        </TableCell>
                        <TableCell>
                          <Badge variant={camera.status === "active" ? "default" : "secondary"}>
                            {camera.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCamera(camera.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Panel */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Alertes en Temps Réel</span>
                </CardTitle>
                <CardDescription>
                  Dernières détections et alertes du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{alert.camera_name}</span>
                        <Badge 
                          variant={alert.status === "Triche détectée" ? "destructive" : 
                                  alert.status === "Comportement suspect" ? "secondary" : "default"}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{alert.datetime}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>État du Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Render</span>
                  <Badge variant="default">Connecté</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firebase</span>
                  <Badge variant="default">Opérationnel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Détection IA</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Badge variant="default">Activées</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
