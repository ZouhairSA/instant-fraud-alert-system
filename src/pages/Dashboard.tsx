import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Camera, Bell, Users, Key, ArrowUp, ArrowDown, Download, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { app } from "../firebase"; // Assuming firebase.ts exports the initialized app
import { CameraModal } from "@/components/ui/CameraModal";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";

const typingDots = (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 48 }}>
    <style>{`
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(1); }
        40% { transform: scale(1.4); }
      }
    `}</style>
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6', margin: 4, animation: 'bounce 1.4s infinite', animationDelay: '0s' }} />
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6', margin: 4, animation: 'bounce 1.4s infinite', animationDelay: '0.2s' }} />
    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6', margin: 4, animation: 'bounce 1.4s infinite', animationDelay: '0.4s' }} />
  </div>
);

const Dashboard = () => {
  const [cameras, setCameras] = useState([]); // Initialise avec un tableau vide, les données viendront de Firestore
  const [alerts, setAlerts] = useState([]); // Initialise avec un tableau vide, les données viendront de Firestore
  const [contacts, setContacts] = useState([]);

  const [newCamera, setNewCamera] = useState({
    name: "",
    url: "",
    api_link: "https://api-tricherie-hestim.onrender.com/api/detect"
  });

  const { toast } = useToast();
  const db = getFirestore(app); // Obtenir l'instance Firestore

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 5;
  const totalPages = Math.ceil(alerts.length / alertsPerPage);
  const paginatedAlerts = alerts.slice((currentPage - 1) * alertsPerPage, currentPage * alertsPerPage);

  const [cameraToDelete, setCameraToDelete] = useState<string | null>(null);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Hook pour dark mode
  const [isDark, setIsDark] = useState(() => {
    // Toujours clair par défaut, sauf si l'utilisateur a choisi dark
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const fetchCamerasAndAlerts = async () => {
      try {
        // Fetch Cameras
        const camerasSnapshot = await getDocs(collection(db, "cameras"));
        const camerasData = camerasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCameras(camerasData);

        // Fetch Alerts
        const alertsQuery = query(collection(db, "alerts"), orderBy("datetime", "desc"));
        const alertsSnapshot = await getDocs(alertsQuery);
        const alertsData = alertsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlerts(alertsData);

      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données.",
          variant: "destructive"
        });
      }
    };
    fetchCamerasAndAlerts();

    // Récupérer les contacts
    const fetchContacts = async () => {
      try {
        const contactsSnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContacts(contactsData);
      } catch (error) {
        toast({ title: "Erreur", description: "Impossible de charger les contacts.", variant: "destructive" });
      }
    };
    fetchContacts();
  }, [db, toast]);

  const handleAddCamera = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "cameras"), {
        ...newCamera,
        status: "active" // Default status
      });
      setCameras(prevCameras => [...prevCameras, { id: docRef.id, ...newCamera, status: "active" }]);
      setNewCamera({ name: "", url: "", api_link: "https://api-tricherie-hestim.onrender.com/api/detect" });
      toast({
        title: "Caméra ajoutée",
        description: `${newCamera.name} a été ajoutée avec succès.`,
      });
    } catch (error) {
      console.error("Error adding camera: ", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la caméra.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCamera = async (id: string) => { // id should be string for Firestore doc id
    try {
      await deleteDoc(doc(db, "cameras", id));
      setCameras(cameras.filter(camera => camera.id !== id));
      toast({
        title: "Caméra supprimée",
        description: "La caméra a été supprimée avec succès.",
      });
    } catch (error) {
      console.error("Error deleting camera: ", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la caméra.",
        variant: "destructive"
      });
    }
  };

  const handleOpenCamera = (camera) => {
    setSelectedCamera(camera);
    setIsDialogOpen(true);
  };

  // Export CSV
  const exportAlertsCSV = () => {
    if (!alerts.length) return;
    const header = "camera_name,datetime,status\n";
    const rows = alerts.map(a => `${a.camera_name},${a.datetime},${a.status}`).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "alerts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculs dynamiques pour les statistiques
  const activeCameras = cameras.filter(c => c.status === "active").length;

  // Calcul du nombre d'alertes aujourd'hui
  const today = new Date().toISOString().slice(0, 10); // format YYYY-MM-DD
  const alertsToday = alerts.filter(a => a.datetime && a.datetime.startsWith(today)).length;

  const totalDetections = alerts.length;

  // Calcul du nombre de contacts aujourd'hui
  const contactsToday = contacts.filter(c => {
    if (!c.createdAt) return false;
    const date = c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000).toISOString().slice(0, 10) : c.createdAt?.slice(0, 10);
    return date === today;
  }).length;

  const stats = [
    { title: "Caméras Actives", value: activeCameras, icon: Camera, trend: `+${activeCameras}` },
    { title: "Alertes Aujourd'hui", value: alertsToday, icon: Bell, trend: `+${alertsToday}` },
    { title: "Détections", value: totalDetections, icon: Key, trend: `+${totalDetections}` },
    { title: "Statut Système", value: "Opérationnel", icon: Users, trend: "100%" },
    { title: "Contacts", value: contacts.length, icon: Mail, trend: `+${contactsToday}` },
  ];

  const handleDeleteContact = async (contactId) => {
    try {
      await deleteDoc(doc(db, "contacts", contactId));
      setContacts(contacts => contacts.filter(c => c.id !== contactId));
      toast({ title: "Contact supprimé", description: "Le contact a été supprimé avec succès." });
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de supprimer le contact.", variant: "destructive" });
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateDoc(doc(db, "contacts", contactId), { status: newStatus });
      setContacts(contacts => contacts.map(c => c.id === contactId ? { ...c, status: newStatus } : c));
      toast({ title: "Statut modifié", description: "Le statut du contact a été mis à jour." });
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de modifier le statut.", variant: "destructive" });
    }
  };

  // Fonction d'export CSV pour les contacts
  const exportContactsCSV = () => {
    if (!contacts.length) return;
    const header = "date,name,email,message,status\n";
    const rows = contacts.map(c => {
      const date = c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000).toLocaleString() : c.createdAt || "";
      return `"${date}","${c.name}","${c.email}","${(c.message || '').replace(/"/g, '""')}","${c.status}"`;
    }).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/hestimLogo.png" alt="HESTIM Logo" className="h-10 w-auto mr-2" width={40} height={40} />
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
              <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" onClick={e => { e.preventDefault(); setLogoutDialogOpen(true); }}>Déconnexion</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <div className="flex flex-col items-center justify-center text-center">
                    <ExclamationTriangleIcon className="w-12 h-12 text-yellow-500 mb-2" />
                    <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2">Confirmer la déconnexion</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 mb-4">
                      Êtes-vous sûr de vouloir vous déconnecter ?
                    </AlertDialogDescription>
                  </div>
                  <AlertDialogFooter className="flex flex-row justify-center gap-4 mt-2">
                    <AlertDialogCancel className="px-6">Annuler</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Link to="/login" className="px-6 bg-red-600 hover:bg-red-700 text-white">Se déconnecter</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                      placeholder="https://api-tricherie-hestim.onrender.com/api/detect"
                      value={newCamera.api_link}
                      onChange={(e) => setNewCamera({...newCamera, api_link: e.target.value})}
                      required
                    />
                  </div>
                  <Button
                    className="transition-all duration-200 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:scale-105"
                    type="submit"
                  >
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
                      <TableRow className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-900">
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
                              onClick={() => handleOpenCamera(camera)}
                            >
                              Voir
                            </Button>
                            <AlertDialog open={cameraToDelete === camera.id} onOpenChange={open => { if (!open) setCameraToDelete(null); }}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setCameraToDelete(camera.id)}
                                >
                                  Supprimer
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <div className="flex flex-col items-center justify-center text-center">
                                  <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mb-2" />
                                  <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2">Confirmer la suppression</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600 mb-4">
                                    Voulez-vous vraiment supprimer cette caméra ? Cette action est irréversible.
                                  </AlertDialogDescription>
                                </div>
                                <AlertDialogFooter className="flex flex-row justify-center gap-4 mt-2">
                                  <AlertDialogCancel className="px-6">Annuler</AlertDialogCancel>
                                  <AlertDialogAction className="px-6 bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (cameraToDelete) handleDeleteCamera(cameraToDelete); setCameraToDelete(null); }}>
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Alertes en Temps Réel</span>
                  </CardTitle>
                  <CardDescription>
                    Dernières détections et alertes du système
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={exportAlertsCSV}
                    disabled={alerts.length === 0}
                  >
                    Exporter CSV
                  </Button>
                  {/* Pour PDF, tu peux ajouter un bouton similaire plus tard */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedAlerts.length > 0 ? paginatedAlerts.map((alert) => (
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
                  )) : (
                    <div className="text-center text-gray-400 py-8">{typingDots}</div>
                  )}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      Précédent
                    </Button>
                    <span className="text-sm text-gray-600">Page {currentPage} / {totalPages}</span>
                    <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                      Suivant
                    </Button>
                  </div>
                )}
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

            {/* Tableau des contacts reçus */}
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div>
                  <CardTitle>Contacts reçus</CardTitle>
                  <CardDescription>Liste des messages reçus via le formulaire de contact</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={exportContactsCSV}
                  disabled={contacts.length === 0}
                  title="Exporter en CSV"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.length > 0 ? contacts.map(contact => (
                      <TableRow className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-900">
                        <TableCell className="whitespace-nowrap text-xs">
                          {contact.createdAt?.seconds
                            ? new Date(contact.createdAt.seconds * 1000).toLocaleString()
                            : contact.createdAt}
                        </TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                        <TableCell>
                          <select
                            value={contact.status}
                            onChange={e => handleStatusChange(contact.id, e.target.value)}
                            className={`px-2 py-1 rounded font-semibold text-xs
                              ${contact.status === "new" ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-green-100 text-green-700 border-green-300"}
                              border outline-none transition-colors`}
                          >
                            <option value="new" className="text-blue-700">new</option>
                            <option value="done" className="text-green-700">done</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <AlertDialog open={contactToDelete === contact.id} onOpenChange={open => { if (!open) setContactToDelete(null); }}>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" onClick={() => setContactToDelete(contact.id)}>
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <div className="flex flex-col items-center justify-center text-center">
                                <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mb-2" />
                                <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2">Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600 mb-4">
                                  Voulez-vous vraiment supprimer ce contact ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </div>
                              <AlertDialogFooter className="flex flex-row justify-center gap-4 mt-2">
                                <AlertDialogCancel className="px-6">Annuler</AlertDialogCancel>
                                <AlertDialogAction className="px-6 bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (contactToDelete) handleDeleteContact(contactToDelete); setContactToDelete(null); }}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400">Aucun contact reçu.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CameraModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        cameraUrl={selectedCamera?.url || ""}
      />
    </div>
  );
};

export default Dashboard;
