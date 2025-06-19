import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
// Si tu n'as pas @radix-ui/react-icons, installe-le ou remplace par une icône SVG
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Hls from "hls.js";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cameraUrl: string;
}

export function CameraModal({ open, onOpenChange, cameraUrl }: CameraModalProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!open || !cameraUrl) return;
    setError(null);
    setLoading(true);
    let hls: Hls | null = null;
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(cameraUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLoading(false);
          video.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          setError("Impossible d'afficher la caméra. Le flux vidéo est inaccessible ou non compatible.");
          setLoading(false);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = cameraUrl;
        video.addEventListener('loadedmetadata', () => {
          setLoading(false);
          video.play();
        });
        video.addEventListener('error', () => {
          setError("Impossible d'afficher la caméra. Le flux vidéo est inaccessible ou non compatible.");
          setLoading(false);
        });
      } else {
        setError("Votre navigateur ne supporte pas la lecture de ce flux vidéo.");
        setLoading(false);
      }
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [cameraUrl, open]);

  // Animation trois points
  const typingDots = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 48 }}>
      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: scale(1); } 40% { transform: scale(1.4); } }
      `}</style>
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6', margin: 6, animation: 'bounce 1.4s infinite', animationDelay: '0s' }} />
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6', margin: 6, animation: 'bounce 1.4s infinite', animationDelay: '0.2s' }} />
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6', margin: 6, animation: 'bounce 1.4s infinite', animationDelay: '0.4s' }} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full rounded-2xl shadow-2xl p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">Aperçu de la caméra</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {loading && !error ? (
            <div className="flex flex-col items-center justify-center h-[480px] text-center">
              {typingDots}
              <p className="mt-4 text-lg text-gray-500">Chargement du flux vidéo...</p>
            </div>
          ) : !error ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-[480px] rounded-xl border shadow-lg bg-black"
              style={{ display: loading ? 'none' : 'block' }}
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