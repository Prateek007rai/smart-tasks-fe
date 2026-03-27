import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center pt-12">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center">
        <div>
          <h1 className="text-center text-4xl font-bold">Smart Tasks</h1>
          <h4 className="text-center text-xl font-bold">The Task: Smart Task Manager with AI Briefing </h4>
        </div>
      </main>
    </div>
  );
}
