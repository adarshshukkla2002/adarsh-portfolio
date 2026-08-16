import PageTransition from "@/components/effects/PageTransition";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-screen items-center">
        <div className="shell text-center">
          <h1 className="text-mega">
            <GradientText>404</GradientText>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed">
            No file exists at this reference. It may have been closed, or the
            reference may be wrong.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button to="/">Back to start</Button>
            <Button to="/work" variant="ghost">
              Browse casework
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
