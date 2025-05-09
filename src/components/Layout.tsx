
import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "../components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
      <footer className="bg-muted py-4 text-center text-muted-foreground">
        <div className="container mx-auto">
          SIWES Electronic Workbook © {new Date().getFullYear()}
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
