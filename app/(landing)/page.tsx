import { Button } from "@/components/ui/button";
import Link  from "next/link";

export default function LandingPage() {
  return (
    <div className="w-96 mx-auto mt-8">
      <h2>ברוכים הבאים לבינה עברית!</h2>
      <h3>התנסו בכלי בינה מלאכותית בעברית בקלות</h3>
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
  )
}