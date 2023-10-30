import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-3/4 mx-auto mt-40 border-2 p-8 flex flex-col items-center rounded-3xl h-1/2">
      <h2 className="text-5xl font-bold">ברוכים הבאים לבינה עברית!</h2>
      <h3 className="mt-8 text-2xl flex-1">התנסו בכלי בינה מלאכותית בעברית בקלות</h3>
      <div className="flex flex-row gap-8 mt-8">
        <Link href="/sign-in">
          <Button>
            התחברות
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button>
            הצטרפות
          </Button>
        </Link>
      </div>
    </div>
  )
}