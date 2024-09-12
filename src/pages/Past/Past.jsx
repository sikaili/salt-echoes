import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './past.css';
import { useEffect, useState, useRef } from 'react';
export const listIframe = [
  {
    name: 'Impro Aluminiu, 08/27/2024',
    src: 'https://www.youtube.com/embed/nklq1Eo1nMo',
    participants:
      'Antonean Diaz, Sikai Li, Tiona Andrianaivomananjaona, Xi Rojin',
  },
  {
    name: 'Impro 2 + 2 08/23/2024',
    src: 'https://www.youtube.com/embed/brwjhfqM8z4',
    participants:
      'Antonean Diaz, Sikai Li, Tiona Andrianaivomananjaona, Xi Rojin',
  },
  {
    name: 'Impro Hadéen.V 04/19/2024',
    src: 'https://www.youtube.com/embed/WtEFSjo-I3Q?si=9FZCqy16k7mrAItt',
    participants: 'Arthur Caumont, Dorian Campagne, Sikai Li, Weizhou Zhang',
  },
];
function Past() {
  const listAudio = [
    {
      name: '08/02/2024 ALSTY (extrait)',
      participants:
        'Arthur Caumont, Leah Welsch, Sikai Li, Tina Jander, Yijie Ma',
      src: '/audio/impro_08_02_arthur_leah_tina_yijie.m4a',
    },
    {
      name: '06/22/2024 La Fatigue.I',
      participants: 'Dorian Campagne, Sikai Li, Tiona Andrianaivomananjaona',
      src: '/audio/22-tiona-dorian_I.m4a',
    },
    {
      name: '06/22/2024 La Fatigue.II',
      participants: 'Dorian Campagne, Sikai Li, Tiona Andrianaivomananjaona',
      src: '/audio/22-tiona-dorian_II.m4a',
    },
    // {
    //   name: '05/28/2024 V X S Piano Loop',
    //   participants: 'Dorian Campagne, Sikai Li',
    //   src: '/audio/22-tiona-dorian_II.m4a',
    // },
    {
      name: '04/19/2024 Impro Hadéen.IV',
      participants: 'Arthur Caumont, Dorian Campagne, Sikai Li, Weizhou Zhang',
      src: '/audio/jam_04_19_IV.m4a',
    },
    {
      name: '04/19/2024 Impro Hadéen.III',
      participants: 'Arthur Caumont, Dorian Campagne, Sikai Li',
      src: '/audio/jam_04_19_III.m4a',
    },
    {
      name: '04/19/2024 Impro Hadéen.II',
      participants: 'Arthur Caumont, Dorian Campagne, Sikai Li',
      src: '/audio/jam_04_19_II.m4a',
    },
    {
      name: '04/16/2024 Impro 2 X 2 (extrait)',
      participants: 'Katya Krajza, Sikai Li',
      src: '/audio/jam_04_16_II_extrait.m4a',
    },
  ];
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const getAllParticipants = listAudio => {
    let participants = [];
    listAudio.map(item => {
      participants = [
        ...participants,
        ...item.participants.split(',').map(participant => participant.trim()),
      ];
    });
    return [...new Set(participants)];
  };
  const countParticipantOccurrences = listAudio => {
    const count = {};
    listAudio.forEach(item => {
      item.participants
        .split(',')
        .map(participant => participant.trim())
        .forEach(participant => {
          if (count[participant]) {
            count[participant]++;
          } else {
            count[participant] = 1;
          }
        });
    });
    return count;
  };

  const [filter, setFilter] = useState(null);
  useEffect(() => {
    const allParticipants = getAllParticipants(listAudio).sort();
    const participantCounts = countParticipantOccurrences(listAudio);
    setFilter([
      {
        filterName: 'Name',
        filterItems: allParticipants.map(participant => ({
          name: participant,
          count: participantCounts[participant],
        })),
      },
    ]);
  }, []);

  const handleFilterClick = participant => {
    setSelectedParticipant(
      selectedParticipant === participant ? null : participant
    );
    filterRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredListAudio = selectedParticipant
    ? listAudio.filter(item => item.participants.includes(selectedParticipant))
    : listAudio;
  const filterRef = useRef(null);

  return (
    <div className="past">
      <h4>Passé Composé:</h4>
      <div className="video-grid">
        {listIframe.map(item => (
          <div key={item.name} className="video">
            <iframe
              className="iframe1"
              src={item.src + '?vq=hd1080'}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <p className="video-description">Video: {item.name}</p>
          </div>
        ))}
      </div>
      {filter &&
        filter.map((filterItem, index) => (
          <div key={index} className="filter" ref={filterRef}>
            {filterItem.filterItems.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => handleFilterClick(item.name)}
                className={`filterButton ${
                  selectedParticipant === item.name ? 'selected' : ''
                }`}
              >
                {item.name} ({item.count})
              </button>
            ))}
          </div>
        ))}

      {filteredListAudio.map(item => (
        <AudioPlayer
          className="audio-player"
          preload="metadata"
          key={item.name}
          header={item.name}
          src={item.src}
          onPlay={() => console.log('onPlay')}
          footer={item.participants}
          customVolumeControls={[]}
          customAdditionalControls={[]}
        />
      ))}
    </div>
  );
}

export default Past;
