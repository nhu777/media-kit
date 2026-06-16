import { Download } from 'lucide-react';
import Image from 'next/image';

const images = [
  { name: 'Banff National Park', src: '/linktree-images/banff.jpg' },
  { name: 'Yosemite National Park', src: '/linktree-images/yosemite.jpg' },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Image Previews */}
        <div className="bg-elevated rounded-2xl shadow-elevation-200 p-6 mb-6">
          <h1 className="text-title-md text-primary mb-3">Linktree Images</h1>
          <p className="text-body-sm-emph text-tertiary tracking-wide mb-4">
            Use these images in your research session
          </p>
          <div className="grid grid-cols-2 gap-3">
            {images.map(image => (
              <div
                key={image.name}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-tertiary"
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <a
          href="/linktree-images.zip"
          download="linktree-images.zip"
          className="flex items-center justify-center gap-3 w-full bg-accent text-on-accent text-body-base-emph py-4 px-6 rounded-full shadow-elevation-100 hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          Download Images
        </a>

        {/* Footer */}
        <p className="text-center text-body-sm text-tertiary mt-6">
          After downloading, unzip the folder and locate the images on your
          computer.
        </p>
      </div>
    </div>
  );
}
