import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat({ number }: { number: string }) {
  if (!number) return null;
  const digits = number.replace(/[^0-9]/g, '');

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={26} fill="black" className="text-[#25D366]" />
    </a>
  );
}
