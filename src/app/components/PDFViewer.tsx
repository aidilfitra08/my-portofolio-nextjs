"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import SimpleBar from "simplebar-react";

type FitMode = "page-width" | "page-fit" | "custom";

interface PDFViewerProps {
  url: string;
  fileName?: string;
  className?: string;
}

export default function PDFViewer({
  url,
  fileName = "Document",
  className = "",
}: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [fitMode, setFitMode] = useState<FitMode>("page-width");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());

  // Load pdfjs on client and set worker to CDN
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Dynamically import to avoid SSR issues
        const pdfjsLib = await import("pdfjs-dist");
        // Pin to a CDN worker (match major version if possible)
        // You can update the version number to match installed pdfjs-dist
        // Example uses jsDelivr for pdfjs-dist v4
        // If you update package.json version, also update this URL.
        // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.530/build/pdf.worker.min.mjs";

        setLoading(true);
        setError(null);

        // Load document directly (expects file in public/ or absolute URL)
        // @ts-ignore
        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;
        if (!isMounted) return;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (e) {
        if (!isMounted) return;
        setError("Failed to load PDF. Please try again.");
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [url]);

  // Render all pages when doc/scale/mode changes
  useEffect(() => {
    if (!pdfDoc) return;
    (async () => {
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        await renderPage(pageNum);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfDoc, scale, fitMode]);

  // Track scroll to update current page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollTop = container.scrollTop;
      let pageInView = 1;
      const pages = container.querySelectorAll("[data-page-number]");
      pages.forEach((pageEl) => {
        const el = pageEl as HTMLElement;
        const top = el.offsetTop - container.offsetTop;
        const height = el.offsetHeight;
        if (scrollTop >= top - 100 && scrollTop < top + height - 100) {
          pageInView = parseInt(el.dataset.pageNumber || "1", 10);
        }
      });
      setCurrentPage(pageInView);
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [pdfDoc]);

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc || !containerRef.current) return;
    const canvas = canvasRefs.current.get(pageNum);
    if (!canvas) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      let calcScale = scale;

      if (fitMode === "page-width") {
        const containerWidth = containerRef.current.clientWidth - 40; // padding
        const viewport = page.getViewport({ scale: 1.0 });
        calcScale = containerWidth / viewport.width;
      } else if (fitMode === "page-fit") {
        const containerWidth = containerRef.current.clientWidth - 40;
        const containerHeight = containerRef.current.clientHeight - 40;
        const viewport = page.getViewport({ scale: 1.0 });
        const widthScale = containerWidth / viewport.width;
        const heightScale = containerHeight / viewport.height;
        calcScale = Math.min(widthScale, heightScale);
      }

      const viewport = await page.getViewport({ scale: calcScale });
      const context = canvas.getContext("2d");
      if (!context) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      // @ts-ignore
      await page.render({ canvasContext: context, viewport }).promise;
    } catch (e) {
      // per-page render failures are ignored
    }
  };

  const handleZoomIn = () => {
    setFitMode("custom");
    setScale((s) => Math.min(s + 0.25, 5));
  };
  const handleZoomOut = () => {
    setFitMode("custom");
    setScale((s) => Math.max(s - 0.25, 0.5));
  };
  const handleFitWidth = () => setFitMode("page-width");
  const handleFitPage = () => setFitMode("page-fit");

  if (error) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className}`}
      >
        <div className="text-sm text-gray-300">{error}</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col bg-[#525252] ${className}`}>
      {loading ? (
        <div className="flex items-center justify-center h-full bg-[#525252]">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-gray-300" />
            <span className="text-gray-300 text-sm">Loading PDF...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-2 bg-[#323639] text-white shrink-0 border-b border-gray-700 shadow-md">
            <div className="text-sm text-gray-300">
              Page {currentPage} / {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="p-2 rounded hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Zoom out"
              >
                <FontAwesomeIcon icon={faSearchMinus} className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 5}
                className="p-2 rounded hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Zoom in"
              >
                <FontAwesomeIcon icon={faSearchPlus} className="w-4 h-4" />
              </button>
              <span className="text-sm min-w-[50px] text-center text-gray-300 mx-1">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleFitWidth}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  fitMode === "page-width"
                    ? "bg-gray-600 text-white"
                    : "bg-transparent text-gray-300 hover:bg-gray-600"
                }`}
                title="Fit to width"
              >
                Fit Width
              </button>
              <button
                onClick={handleFitPage}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  fitMode === "page-fit"
                    ? "bg-gray-600 text-white"
                    : "bg-transparent text-gray-300 hover:bg-gray-600"
                }`}
                title="Fit to page"
              >
                Fit Page
              </button>
            </div>
            <div className="text-sm text-gray-300 truncate max-w-[200px]">
              {fileName}
            </div>
          </div>

          <SimpleBar
            scrollableNodeProps={{ ref: containerRef }}
            className="flex-1 min-h-0"
            autoHide={false}
          >
            <div className="flex flex-col items-center p-5 gap-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <div
                    key={pageNum}
                    data-page-number={pageNum}
                    className="bg-white shadow-2xl"
                  >
                    <canvas
                      ref={(el) => {
                        if (el) canvasRefs.current.set(pageNum, el);
                      }}
                      className="select-none block"
                      style={{ userSelect: "none" }}
                    />
                  </div>
                )
              )}
            </div>
          </SimpleBar>
        </>
      )}
    </div>
  );
}
