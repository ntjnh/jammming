export default function removeTrack(idx, playlistTracks, playlistUris) {
    const updatedTracks = [...playlistTracks.slice(0, idx), ...playlistTracks.slice(idx + 1)]
    const updatedUris = [...playlistUris.slice(0, idx), ...playlistUris.slice(idx + 1)]

    return { playlistTracks: updatedTracks, playlistUris: updatedUris }
}
