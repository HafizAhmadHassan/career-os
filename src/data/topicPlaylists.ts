export interface TopicPlaylist {
  title: string;
  channel: string;
  playlistId: string;
  thumbnail: string;
}

export const topicPlaylists: Record<string, TopicPlaylist[]> = {
  'git-github-mastery': [
    { title: 'Master Git & Github Series', channel: 'YouTube Playlist', playlistId: 'PLbtI3_MArDOlJ4036mWiUKaQToUS8MZVu', thumbnail: 'https://i.ytimg.com/vi/Oq6nxXD-MZc/hqdefault.jpg' },
  ],
  'rest-api-design': [
    { title: 'REST API Development With Python Flask', channel: 'YouTube Playlist', playlistId: 'PLqIb7mt_Xhs4XUSBbxZWGqAYsXWcJ8n2N', thumbnail: 'https://i.ytimg.com/vi/CTgIKWHNmYo/hqdefault.jpg' },
  ],
  'docker-containers': [
    { title: 'Docker tutorial for beginners in Hindi', channel: 'YouTube Playlist', playlistId: 'PL8p2I9GklV47v6WZTjHAqdsHxpTIpjRwn', thumbnail: 'https://i.ytimg.com/vi/iFiSYMdZWDk/hqdefault.jpg' },
    { title: 'Kubernetes Tutorials for Beginners to Advanced', channel: 'YouTube Playlist', playlistId: 'PLrFWmDe-rbloGXuycxXX6HNFRVcvRhQcq', thumbnail: 'https://i.ytimg.com/vi/_QcA2k2KWRQ/hqdefault.jpg' },
  ],
  'open-source-contribution': [
    { title: 'Open Source Contributions Guide', channel: 'YouTube Playlist', playlistId: 'PLinedj3B30sBsmRRL8XyTGadjRGkzRPb7', thumbnail: 'https://i.ytimg.com/vi/tlJVWvzOnlw/hqdefault.jpg' },
  ],
  'typescript-modern-web': [
    { title: 'Master Backend Development Series | NodeJS | MongoDB | Express JS', channel: 'YouTube Playlist', playlistId: 'PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH', thumbnail: 'https://i.ytimg.com/vi/T55Kb8rrH1g/hqdefault.jpg' },
    { title: 'Complete React Domination | Full Course + Projects', channel: 'YouTube Playlist', playlistId: 'PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx', thumbnail: 'https://i.ytimg.com/vi/3LRZRSIh_KE/hqdefault.jpg' },
  ],
};

export function getPlaylistsForSlug(slug: string): TopicPlaylist[] {
  return topicPlaylists[slug] ?? [];
}
