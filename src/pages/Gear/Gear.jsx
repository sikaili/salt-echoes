import './gear.css';
const devices = {
  equipment: [
    {
      name: 'Genelec 8240 * 2',
    },
    {
      name: 'Genelec 8040 * 2',
    },
    {
      name: 'Genelec 8030 * 4 / 1029 * 2',
    },
    {
      name: 'Prepared Piano (strings)',
    },
    {
      name: 'Girardin MT68 Console',
    },
    {
      name: 'Girardin PM82 Console',
    },
    {
      name: 'Revox PR99 MK3',
    },
    {
      name: 'Neumann KM 184 Stereo Set',
    },
    {
      name: 'AKG C414 XLS',
    },
    {
      name: 'RME Fireface UCX',
    },
    {
      name: 'Synths, Guitars, Pedals',
    },
    // {
    //   "name": "Fender American Pro Precision Bass"
    // },
    // {
    //   "name": "Fender American Vintage Jazzmaster"
    // },
  ],
};
const Equipments = () => {
  return (
    <div className="gear">
      <h4>Gear for recording and monitoring:</h4>
      <p></p>
      {devices.equipment.map(device => {
        return <li key={device.name}>{device.name}</li>;
      })}
      <p></p>

      <img src={`/imgs/gear/_${Math.floor(Math.random() * 9)}.jpg`} />
      {/* <img src="/imgs/gear/_2.jpg"/>
      <img src="/imgs/gear/_0.jpg"/> */}
    </div>
  );
};

export default Equipments;
