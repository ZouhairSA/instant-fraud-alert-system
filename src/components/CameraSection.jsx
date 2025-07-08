import React, { useRef, useState } from 'react';

function CameraPopup({ open, onClose }) {
  const videoRef = useRef(null);
  const [result, setResult] = useState(null);

  React.useEffect(() => {
    let stream;
    if (open) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [open]);

  const handleCapture = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');
      const res = await fetch('http://127.0.0.1:10000/predict', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResult(data.predictions);
    }, 'image/jpeg');
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: '2rem', borderRadius: 8, minWidth: 300,
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)', textAlign: 'center'
      }}>
        <h2>Caméra en direct</h2>
        <video ref={videoRef} autoPlay style={{ width: '100%' }} />
        <div style={{ margin: '1rem 0' }}>
          <button onClick={handleCapture}>Prendre une photo et détecter</button>
        </div>
        {result && (
          <div>
            <strong>Résultat :</strong> {result.length ? result.join(', ') : 'Aucun objet détecté'}
          </div>
        )}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}

export default function CameraSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Ouvrir la caméra du PC</button>
      <CameraPopup open={open} onClose={() => setOpen(false)} />
    </div>
  );
} 