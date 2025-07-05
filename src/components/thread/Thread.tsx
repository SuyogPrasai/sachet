'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Share2 } from 'lucide-react'

interface ThreadProps {
  title: string
  titleNepali?: string
  description: string
  author: string
  timestamp: string
  tags: string[]
  id: string
  category: string
  published_for?: string
  votes?: number
  details?: Record<string, string>
}

export const ThreadCard: React.FC<ThreadProps> = ({
  title,
  titleNepali,
  description,
  author,
  timestamp,
  tags,
  id,
  published_for,
  category,
  votes = 0,
  details = {}
}) => {
  return (
    <div className="mac-window w-full mt-5">
      {/* Header */}
      <div className="mac-window-header">
        <div className="mac-button close" />
        <div className="mac-button minimize" />
        <div className="mac-button maximize" />
        <span className="font-mono text-xs">{(tags[0] || 'thread').toLowerCase()}_post.dat</span>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row">
        {/* Votes */}
        <div className="flex flex-row sm:flex-col items-center sm:items-center px-4 py-4 sm:py-6 border-b sm:border-b-0 sm:border-r border-gray-300 gap-2 sm:gap-0">
          <button className="text-gray-500 hover:text-black">↑</button>
          <span className="font-mono">{votes}</span>
          <button className="text-gray-500 hover:text-black">↓</button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 flex-1">
          {/* Tags & Meta */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-mono mb-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded bg-green-100 text-green-800 border border-green-300 text-xs"
              >
                {tag}
              </span>
            ))}
            <span className="bg-black text-white px-3 py-1 text-xs">{category}</span>
            <span className="text-xs">Posted by {author} • {timestamp}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold font-oswald mb-1">{title}</h3>
          {titleNepali && <h4 className="text-md text-gray-600 font-mono mb-2">{titleNepali}</h4>}

          {/* Description */}
          <p className="text-gray-800 font-mono text-sm mb-4">{description}</p>

          {/* Dynamic Details */}
          {Object.keys(details).length > 0 && (
            <div className="border border-gray-200 p-4 font-mono text-sm w-full rounded-md bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(details).map(([key, value]) => {
                  if (value) {
                    return (
                      <div key={key} className="flex gap-2">
                        <span className="font-semibold capitalize whitespace-nowrap">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-gray-700 font-serif">{value}</span>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition text-sm font-mono"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>

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
