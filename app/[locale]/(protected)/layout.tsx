import Header from "@/components/ui/header/header";

const ProtectedLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            <section className="mt-6 px-2 sm:px-10 pb-20 sm:pb-10 sm:pt-20">
                {children}
            </section>
        </>
    );
}

export default ProtectedLayout;