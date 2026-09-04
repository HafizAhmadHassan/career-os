import { ExternalLink, List } from 'lucide-react';
import type { TopicPlaylist } from '@/data/topicPlaylists';

export function PlaylistCard({ title, channel, playlistId, thumbnail }: TopicPlaylist) {
  return (
    <a
      href={`https://www.youtube.com/playlist?list=${playlistId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-md border border-border hover:border-primary/50 transition-colors"
    >
      <div className="relative aspect-video bg-secondary">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <List className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-medium">{title}</div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {channel} <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
}
