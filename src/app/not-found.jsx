import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default async function NotFound() {
  return (
    <main className="max-w-[1280px] m-auto text-center top-[42%] sticky">
      <section className="max-w-[400px] flex flex-col items-center m-auto gap-2">
        <h1 className="flex gap-2 items-center text-7xl font-bold text-red-500">
            404
        </h1>
      <h3 className="text-lg font-medium">
        The page you are trying to look for does not exist, please try again later!
      </h3>
      <div className="flex gap-2 items-center justify-center">
        <Button asChild className="w-fit">
            <Link href="/">Back To Home</Link>
        </Button>
        <Button asChild className="w-fit" variant="outline">
            <Link href="/contact">Any Questions</Link>
        </Button>
      </div>
      </section>
    </main>
  );
}
