export default function addTrack(id, results, playlistTracks, playlistUris) {
    const resultsList = results.tracks.items
    const trackToAdd = resultsList.filter(track => track.id === id)[0]

    return {
        playlistTracks: [...playlistTracks, trackToAdd],
        playlistUris: [...playlistUris, trackToAdd.uri]
    }
}
