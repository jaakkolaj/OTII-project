import { toast } from "sonner";

interface ConfirmToastProps {
  title: string;
  description?: string;
  actionLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

/**
 * Reusable Sonner confirmation toast
 */
export const showConfirmToast = ({
  title,
  description,
  actionLabel = "Poista",
  cancelLabel = "Peruuta",
  onConfirm,
}: ConfirmToastProps) => {
  return toast(title, {
    description,
    duration: Infinity, // Pysyy näkyvissä kunnes reagoidaan
    action: {
      label: actionLabel,
      onClick: onConfirm,
    },
    closeButton: false, // Piilotetaan sulje-painike, koska meillä on omat toiminnot
    cancel: {
      label: cancelLabel,
      onClick: () => {}, // Sulkee toastin
    },
    // Tyylitellään toimintonappi kriittiseksi (punainen)
    actionButtonStyle: { 
      backgroundColor: 'rgb(220 38 38)', 
      color: 'white' 
    },
  });
};