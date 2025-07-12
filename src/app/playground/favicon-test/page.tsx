import FaviconTester from "../../components/FaviconTester";

export default function FaviconTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Favicon Theme Testing
        </h1>

        <FaviconTester />

        <div className="mt-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Testing Instructions for Edge Browser:
            </h2>

            <div className="text-left space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-500">1.</span>
                <span>Use the buttons above to force favicon changes</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-500">2.</span>
                <span>Check the browser tab icon for changes</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-500">3.</span>
                <span>
                  Try switching your system theme (Windows: Settings →
                  Personalization → Colors)
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-500">4.</span>
                <span>If Edge doesn&apos;t update immediately, try:</span>
              </div>

              <div className="ml-6 space-y-1 text-sm">
                <div>• Hard refresh (Ctrl + Shift + R)</div>
                <div>• Close and reopen the tab</div>
                <div>• Clear browser cache</div>
                <div>• Open in new tab/window</div>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-500">5.</span>
                <span>Check browser console (F12) for favicon update logs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
