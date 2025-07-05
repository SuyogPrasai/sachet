'use client'

import React from 'react'
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

interface ThreadProps {
  title: string
  titleNepali?: string
  description: string
  author: string
  timestamp: string
  tags: string[]
  prize?: string
  deadline?: string
  location?: string
  participants?: string
  id: string
  published_for?: string
  votes?: number
}

export const ThreadCard: React.FC<ThreadProps> = ({
  title,
  titleNepali,
  description,
  author,
  timestamp,
  tags,
  prize,
  deadline,
  location,
  participants,
  id,
  published_for,
  votes = 0
}) => {
  return (
    <div className="mac-window w-full mt-5">
      <div className="mac-window-header">
        <div className="mac-button close" />
        <div className="mac-button minimize" />
        <div className="mac-button maximize" />
        <span className="font-mono text-xs">{(tags[0] || 'thread').toLowerCase()}_post.dat</span>
      </div>

      <div className="flex">
        {/* Voting column */}
        <div className="flex flex-col items-center px-4 py-6 border-r border-gray-300">
          <button className="text-gray-500 hover:text-black">↑</button>
          <span className="font-mono">{votes}</span>
          <button className="text-gray-500 hover:text-black">↓</button>
        </div>

        {/* Thread content */}
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-mono mb-1">
            {tags.map(tag => (
              <span
                key={tag}
                className={clsx(
                  'px-2 py-1 rounded font-mono text-xs',
                  tag === 'Academic'
                    ? 'bg-black text-white'
                    : 'bg-green-200 text-green-800 border border-black'
                )}
              >
                {tag}
              </span>
            ))}
            <span>Posted by {author} • {timestamp}</span>
          </div>

          <h3 className="text-xl font-bold font-oswald mb-1">{title}</h3>
          {titleNepali && <h4 className="text-md text-gray-600 font-mono mb-2">{titleNepali}</h4>}
          <p className="text-gray-800 font-mono text-sm mb-4">{description}</p>

          {/* Prize, Deadline, Location, Participants */}
          {(prize || deadline || location || participants) && (
            <div className="border border-gray-200 p-4 flex flex-wrap gap-4 font-mono text-sm">
              {prize && (
                <div className="flex items-center gap-1 text-green-600 font-bold">
                  <span>🎯</span> {prize}
                </div>
              )}
              {deadline && (
                <div className="flex items-center gap-1 text-red-600">
                  <span>⏰</span> Due: {deadline}
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1 text-blue-600">
                  <MapPin className="h-4 w-4" /> {location}
                </div>
              )}
              {participants && (
                <div className="flex items-center gap-1 text-purple-600">
                  <Users className="h-4 w-4" /> {participants}
                </div>
              )}
            </div>
          )}

          {/* Action row */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600 font-mono">💬 89 comments • 🔗 Share</div>
            <Link
              href={`/threads/${id}`}
              className="retro-button border border-black px-4 py-2 font-mono text-sm bg-gray-100 text-gray-500 hover:text-black transition"
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
