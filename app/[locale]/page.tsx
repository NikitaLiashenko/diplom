import React from "react";
import Home from "@/components/Home/Home";

const HomePage = () => {
  return (
      <Home />
  );
};

export default HomePage;


// import { Poppins } from "next/font/google";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { LoginButton } from "@/components/auth/login-button";
// import { useTranslations } from "next-intl";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"]
// })

// export default function Home() {
//   const t = useTranslations('HomePage');

//   return (
//     <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
//       <div className="space-y-6 text-center">
//         <h1 className={cn(
//           "text-6xl font-semibold text-white drop-shadow-md",
//           font.className
//           )}>
//           {t('title')}
//         </h1>
//         <p className="text-white text-lg">
//           {t('description')}
//         </p>
//         <div>
//           <LoginButton>
//             <Button variant="secondary" size="lg">
//               {t('button')}
//             </Button>
//           </LoginButton>
//         </div>
//       </div>
//     </main>
//   )
// }

