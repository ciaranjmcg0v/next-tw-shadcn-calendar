import NewEvent from "@/components/Calendar/Events/NewEvent/NewEvent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300">
      <NewEvent />
    </main>
  );
}
