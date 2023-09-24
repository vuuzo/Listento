'use client'

import fetcher from "@/lib/fetcher"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

type NowPlaying = {
  title: string
  songUrl: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
}

const recent: NowPlaying = {
  title: "HYAENA",
  songUrl: "https://open.spotify.com/track/0hL9gOw6XBWsygEUcVjxEc",
  albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44",
  artist: "Travis Scott",
  isPlaying: false
}

const NowPlaying = () => {
  const {
    data: playing,
    isLoading,
    error
  } = useSWR<NowPlaying>('/api/listening', fetcher)
  
  return (
        isLoading ? (
          <div>Fetching data...</div>
        ) : error ? (
          <div>There was an error</div>
        ) : (
          <>
            {
              playing?.isPlaying ? (
                <>
                <h2 className="py-4 uppercase font-bold flex items-center gap-2"><span>Now playing</span> <div className="w-2 aspect-square bg-red-600 rounded-full animate-pulse" /></h2>

                <Link href={playing.songUrl} target="_blank" className="inline-block">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="relative w-[120px] aspect-square shrink-0 rounded-3xl overflow-hidden">
                      <Image alt={'sraka'} src={playing?.albumImageUrl as string} fill className="object-fill absolute"/>
                    </div>
                    <div>
                      <h2 className="font-primary leading-[48px] text-[40px]">{playing?.title}</h2>
                      <p className="font-secondary leading-[19px]">{playing?.artist}</p>
                    </div>
                  </div>
                </Link>
                </>
              ) : (
                <>
                <h2 className="py-4 uppercase font-bold flex items-center gap-2">Recent track</h2>

                <Link href={recent.songUrl} target="_blank" className="inline-block">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="relative w-[120px] aspect-square shrink-0 rounded-3xl overflow-hidden">
                      <Image alt={'sraka'} src={recent.albumImageUrl as string} fill className="object-fill absolute"/>
                    </div>
                    <div>
                      <h2 className="font-primary font-semibold text-[40px]">{recent.title}</h2>
                      <p className="font-secondary">{recent.artist}</p>
                    </div>
                  </div>
                </Link>
                </>
              )
            }
          </>
        )
  )
}

export default NowPlaying