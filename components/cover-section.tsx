export default function CoverSection() {
  return (
    <section className="h-[60vh] min-h-[600px]">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Experience
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Cinema
              </span>
              Like Never Before
            </h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Book premium seats, enjoy the latest blockbusters, and immerse
            yourself in the ultimate cinematic experience with state-of-the-art
            technology.
          </p>
        </div>
      </div>
    </section>
  );
}
