// src/components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-700 py-4 mt-10">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
          <a
            href="https://dapp.solforgeai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white"
          >
            Made on SOL FORGE
          </a>
          <span>|</span>
          <a
            href="https://diogh.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white"
          >
            DIOGH
          </a>
        </div>
      </div>
    </footer>
  );
}
