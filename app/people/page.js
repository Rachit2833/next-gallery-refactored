
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Friends from "../_MyComponents/peopleComponents/Friends";
import PeopleAvatar from "../_MyComponents/peopleComponents/PeopleAvatar";

 export const revalidate=0
async function Page() {

  return (
    <Card>
      <CardHeader className="border-b-4">
        <CardTitle>Capture Moments, Share Memories</CardTitle>
        <CardDescription>
          Discover unforgettable memories with friends. Relive and cherish each
          captured moment together.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Friends>
          <PeopleAvatar />
        </Friends>

      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default Page;
