export const Footer = () => {
  return (
    <footer className="mb-12 mt-32 flex items-center justify-center text-neutral-400 text-sm font-mono gap-1 sm:gap-5 flex-col sm:flex-row">
      <div>
        <a
          href="https://uspiri.com/"
          className="hover:text-stone-200 transition"
        >
          by Uspiri
        </a>
      </div>
      <div>
        <a
          href="https://github.com/USpiri/things-shop/"
          className="hover:text-stone-200 transition"
          title="Github page"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </footer>
  );
};
