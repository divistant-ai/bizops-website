import { Download, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

type ActionButtonsProps = {
  onDownload: () => void;
  onShare: () => void;
  disabled?: boolean;
  className?: string;
};

export default function ActionButtons({
  onDownload,
  onShare,
  disabled = false,
  className = '',
}: ActionButtonsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="flex-1"
        onClick={onDownload}
        disabled={disabled}
        aria-label="Download hasil perhitungan"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1"
        onClick={onShare}
        disabled={disabled}
        aria-label="Bagikan hasil perhitungan"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
