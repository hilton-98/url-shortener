import { SlugComponent } from "@/react/slug/slug.component";

interface Props {
   params: {
     slug: string;
   };
 }

export default function Page({ params }: Props) {
  return <SlugComponent slug={params.slug} />
}