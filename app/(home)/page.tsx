import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import CallAction from "@/components/user/CallAction";
import DemoVideo from "@/components/user/DemoVideo";
import Feature from "@/components/user/Feature";
import Hero from "@/components/user/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen animated background */}
      <AnimatedGridPattern className="fixed inset-0 w-screen h-screen z-0 opacity-20" />

      {/* Content layered above animation */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 ">
        <Hero />
        <Feature />
        <DemoVideo />
        <CallAction />
      </div>
    </div>
  );
}
