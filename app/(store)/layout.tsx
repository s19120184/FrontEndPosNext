import ShoppingCart from "@/componets/cart/ShoppingCart";
import MainNav from "@/componets/ui/MainNav";
import ToastNotification from "@/componets/ui/ToastNotification";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {/* MainNav */}
        <MainNav/>
        <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
            <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                {children}
            </div> 
            <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white ">
                  <ShoppingCart/>
            </aside>
        </main>
        {/* notificacion del toast */}
        <ToastNotification/>
      </>
    );
  }