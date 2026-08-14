import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar, Footer } from "@/components/layout";
import { LsaBanner } from "@/components/lsa-banner";
import Home from "@/pages/home";
import HireLsa from "@/pages/hire-lsa";
import JobVacancies from "@/pages/job-vacancies";
import Contact from "@/pages/contact";
import SummerTutoring from "@/pages/summer-tutoring";
import AbaTherapy from "@/pages/aba-therapy";
import Workshop from "@/pages/workshop";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <LsaBanner />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/summer-tutoring" component={SummerTutoring} />
          <Route path="/aba-therapy" component={AbaTherapy} />
          <Route path="/workshop" component={Workshop} />
          <Route path="/hire-a-lsa" component={HireLsa} />
          <Route path="/job-vacancies" component={JobVacancies} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
