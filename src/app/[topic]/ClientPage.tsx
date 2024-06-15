"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { Wordcloud } from "@visx/wordcloud";
import { useEffect, useState } from "react";
import { submitComment } from "../actions";
import { io } from "socket.io-client";

const socket =io("http://localhost:8000")

interface ClientPageProps {
    topicName: string
    initialData: { text: string; value: number }[]
}

const ClientPage = ({ topicName, initialData }: ClientPageProps) => {

    const COLORS = ["#143059", "#2F6B9A", "#82a6c2"]

    const [words, setWords] = useState(initialData);
    const [input, setInput] = useState<string>("");

    useEffect(()=>{
        socket.emit("joined-room", `room:${topicName}`);
    },[topicName])

    const fontScale = scaleLog({
        domain: [
            Math.min(...words.map((w) => w.value)),
            Math.max(...words.map((w) => w.value))
        ],
        range: [10, 100]
    });

    const { mutate, isPending } = useMutation({
        mutationFn: submitComment,
    });

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen">
            <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
                    What people think about {" "}
                    <span className="text-blue-600">{topicName}</span>
                </h1>
                <p className="text-sm">Updated in real World</p>

                <div className="aspect-square max-w-xl flex items-center justify-center">
                    <Wordcloud
                        words={words}
                        width={500}
                        height={500}
                        fontSize={(data) => fontScale(data.value)}
                        font={"Impact"}
                        spiral="rectangular"
                        padding={2}
                        rotate={0}
                        random={() => 0.5}
                    >
                        {(cloudWords) =>
                            cloudWords.map((w, i) => (
                                <Text
                                    key={w.text}
                                    fill={COLORS[i % COLORS.length]}
                                    textAnchor="middle"
                                    transform={`translate(${w.x},${w.y})`}
                                    fontSize={w.size}
                                    fontFamily={w.font}
                                >
                                    {w.text}
                                </Text>
                            ))
                        }
                    </Wordcloud>
                </div>

                <div className="max-w-lg w-full">
                    <Label className="font-seminold tracking-tight text-lg">I think about </Label>
                    <div className="mt-1 flex gap-2 items-center">
                        <Input
                            value={input}
                            onChange={({ target }) => setInput(target.value)}
                            placeholder={`${topicName} is absolutely....`}
                        />
                        <Button disabled={isPending} onClick={() => mutate({ comment: input, topicName })}>Share</Button>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}

export default ClientPage;
