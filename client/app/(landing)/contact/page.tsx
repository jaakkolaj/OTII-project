import { ContactForm } from "./_components/contact-form";
import { Navbar } from "@/app/(landing)/_components/navbar";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Navbar/>
            <main className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                <ContactForm />
            </div>
            </main>
            
        </div>
    );
}
