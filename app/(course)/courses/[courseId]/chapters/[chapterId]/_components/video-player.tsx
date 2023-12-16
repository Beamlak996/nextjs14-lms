"use client"

import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import { Loader2, Lock } from "lucide-react"
import { useState } from "react"

type VideoPlayerProps = {
    title: string
    chapterId: string
    courseId: string
    playbackId: string
    nextChapterId?: string
    isLocked: boolean
    completeOnEnd: boolean
}

export const VideoPlayer = ({
    title,
    chapterId,
    courseId,
    playbackId,
    nextChapterId,
    isLocked,
    completeOnEnd
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false)



    return (
      <div className="relative aspect-video">
        {!isReady && !isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
            <Lock className="h-8 w-8" />
            <p className="text-sm">This chapter is locked</p>
          </div>
        )}
        {!isLocked && (
          <MuxPlayer
            title={title}
            className={cn("lg:w-[600px] lg:h-[300px]", !isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={() => {}}
            autoPlay
            playbackId={playbackId}
          />
        )}
      </div>
    );
}