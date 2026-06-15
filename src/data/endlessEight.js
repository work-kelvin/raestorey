function trackUrl(filename) {
  return `/endless-eight/${encodeURIComponent(filename)}`
}

export const endlessEight = {
  title: 'Endless Eight',
  recreatedNote: ' ',
  description: ' ',
  tracks: [
    {
      id: 'ee-01',
      title: 'White',
      artist: 'Frank Ocean, John Mayer',
      audioUrl: trackUrl('1 White.mp3'),
    },
    {
      id: 'ee-02',
      title: 'Sound of Rain',
      artist: 'Solange',
      audioUrl: trackUrl('2 Sound of Rain.mp3'),
    },
    {
      id: 'ee-03',
      title: 'Waitin\' (unplugged)',
      artist: 'Kelela',
      audioUrl: trackUrl('3 Waitin_ (unplugged).mp3'),
    },
    {
      id: 'ee-04',
      title: 'Boogie Nights / All Night',
      artist: 'Erykah Badu',
      audioUrl: trackUrl('4 Boogie Nights_All Night.mp3'),
    },
    {
      id: 'ee-05',
      title: 'Cuchifrito',
      artist: 'Carlos Henriquez',
      audioUrl: trackUrl('5 Cuchifrito.mp3'),
    },
    {
      id: 'ee-06',
      title: 'Follow Me Ghetto (Acid)',
      artist: 'Parriss Mitchell, dj funk',
      audioUrl: trackUrl('6 Follow Me Ghetto (Acid).mp3'),
    },
    {
      id: 'ee-07',
      title: 'Music People',
      artist: 'Moodymann',
      audioUrl: trackUrl('7 Music People.mp3'),
    },
    {
      id: 'ee-08',
      title: 'Soul Makossa',
      artist: 'Manu Dibango',
      audioUrl: trackUrl('8 Soul Makossa.mp3'),
    },
  ],
}
