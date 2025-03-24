import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold  text-center">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg">
            Oops! It seems you’ve wandered off the path. The page you’re looking
            for doesn’t exist or has been moved.
          </p>
          <Link href="/">
            <Button
              variant="default"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}