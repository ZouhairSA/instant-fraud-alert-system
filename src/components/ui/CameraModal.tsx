import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
// Si tu n'as pas @radix-ui/react-icons, installe-le ou remplace par une icône SVG
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cameraUrl: string;
}

export function CameraModal({ open, onOpenChange, cameraUrl }: CameraModalProps) {
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setError(null);
  }, [cameraUrl, open]);

  // Pour iframe, l'événement onError ne fonctionne pas toujours selon la source.
  // On peut afficher un timeout si le flux ne charge pas.
  React.useEffect(() => {
    if (!open || !cameraUrl) return;
    const timeout = setTimeout(() => {
      setError("Impossible d'afficher la caméra. L'URL est incorrecte ou la caméra n'est pas active.");
    }, 5000); // 5s pour charger
    return () => clearTimeout(timeout);
  }, [cameraUrl, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full rounded-2xl shadow-2xl p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">Aperçu de la caméra</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {!error ? (
            <iframe
              src={cameraUrl}
              title="Camera Stream"
              className="w-full h-[480px] rounded-xl border shadow-lg bg-black"
              allow="autoplay; encrypted-media"
              onLoad={() => setError(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[480px] text-center">
              <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-2xl font-semibold text-red-600 mb-2">Erreur de chargement</p>
              <p className="text-gray-500 text-lg">{error}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 