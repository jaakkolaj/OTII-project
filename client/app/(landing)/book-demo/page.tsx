import { BookDemoForm } from "./_components/book-demo-form";
import { ReviewsCarousel } from "@/components/ui/reviewcarousel";
import { MeshGradient } from "@/components/ui/meshgradient";

export default function Page() {
    return (
        <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <MeshGradient />

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-screen px-4 pointer-events-none">
                <ReviewsCarousel />
            </div>

            <div className="relative z-10 w-full">
                <div className="mx-auto relative w-full max-w-5xl">
                    <div className="relative z-20 mx-auto w-full max-w-md">
                        <BookDemoForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
