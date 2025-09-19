import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center pt-16">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-8 glow-primary">
          <span className="text-4xl">🎬</span>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This page doesn't exist</p>
        <p className="mb-8 text-muted-foreground">The content you're looking for might have been moved or deleted.</p>
        <a href="/" className="hero-gradient text-white px-8 py-3 rounded-lg font-semibold glow-primary hover:glow-hover transition-smooth inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
