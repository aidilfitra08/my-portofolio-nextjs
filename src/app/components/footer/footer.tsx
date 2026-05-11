export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[var(--background)] py-2 text-[var(--foreground)] font-mono mx-auto border-t border-[var(--border-color)] transition-colors duration-300 [data-theme=neobrutalism]:border-t-4"
    >
      {/* <div className="col-span-2  border-b dark:border-neutral-100 border-neutral-950 mx-10 mt-4"></div> */}
      <div className="col-span-2 mx-10 py-4 text-center text-xs">
        <p>2025 AidilDev Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}
