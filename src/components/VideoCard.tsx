import { useState } from 'react';
import { Play, X } from 'lucide-react';
import type { TopicVideo } from '@/data/topicVideos';

function embedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function VideoCard({ title, channel, youtubeId }: TopicVideo) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-border">
      {open ? (
        <div className="relative">
          <iframe
            src={embedUrl(youtubeId)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full"
            loading="lazy"
          />
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs hover:bg-background"
            aria-label="Close video"
          >
            <X className="h-3 w-3" /> Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group block w-full text-left"
          aria-label={`Play video: ${title}`}
        >
          <div className="relative aspect-video bg-secondary">
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 fill-current" />
              </span>
            </div>
          </div>
          <div className="p-3">
            <div className="line-clamp-2 text-sm font-medium">{title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{channel}</div>
          </div>
        </button>
      )}
    </div>
  );
}
