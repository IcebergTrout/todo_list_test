import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TreeCard({
    title,
} : {
    title: string;
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
