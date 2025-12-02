export default function removeTrack(id, playlistTracks, playlistUris) {
    return {
        playlistTracks: playlistTracks.filter(track => track.id !== id),
        playlistUris: playlistUris.filter(track => !track.includes(id))
    }
}
