import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TopicCreater from "@/components/TopicCreater";
import { redis } from "@/lib/redis";
import { Star } from "lucide-react";

export default async function Home() {

  const servedRequest = await redis.get("served-requests")


  return (
    <section className="min-h-screen ng-grid-grid-50">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="hidden lg:block absolute insert-0 top-8">
        </div>
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <h1 className="relative leading-snug w-fit tracking-tight text-balance mt-16 font-bold text-gray-900 text-5xl md:text-6xl">
              what is your view about
            </h1>
            <TopicCreater/>
            <div className="mt-12 flex flex-col sm:felx-row items-center sm:items-start gap-5">
              <div className="flex flex-col gap-1 justify-between items-center sm:items-start">
                <div className="flex gap-0.5">
                  <Star className="h-4 w-4 text-yellow-600 fill-yellow-600"/>
                  <Star className="h-4 w-4 text-yellow-600 fill-yellow-600"/>
                  <Star className="h-4 w-4 text-yellow-600 fill-yellow-600"/>
                  <Star className="h-4 w-4 text-yellow-600 fill-yellow-600"/>
                  <Star className="h-4 w-4 text-yellow-600 fill-yellow-600"/>
                </div>

                <p>
                  <span className="font-semibold">
                  {Math.ceil(Number(servedRequest)/10) * 10 }
                  </span>{" "}
                  served requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

    </section>
  );
}
