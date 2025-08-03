import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function MainLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
