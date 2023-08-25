import { Button } from "@/components/ui/button";
import Link  from "next/link";

export default function LandingPage() {
  return (
    <div dir="rtl">
      <h2>ברוכים הבאים!</h2>
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