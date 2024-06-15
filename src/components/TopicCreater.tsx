"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { createTopic } from "@/app/actions";

const TopicCreater = () => {
  const [input, setinput] = useState("");

  const {mutate, error, isPending} = useMutation({
    mutationFn: createTopic,
  })

  return (
    <div className="mt-12 flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={({ target }) => setinput(target.value)}
          className="bg-white min-w-64"
          placeholder="Enter Topic Here..."
        />
        <Button disabled={isPending} onClick={() => mutate({topicName : input})}> Create</Button>
      </div>

      {error ?<p className="text-small"> {error.message}</p> : null}
    </div>
  );
};

export default TopicCreater;
