
const devices = {
  "equipment": [
    {
      "name": "Genelec 8240 * 2"
    },
    {
      "name": "Genelec 8040 * 2"
    },
    {
      "name": "Genelec 8030 * 4 / 1029 * 2"
    },
    {
      "name": "Prepared Piano (strings)"
    },
    {
      "name": "Girardin MT68 Console"
    },
    {
      "name": "Girardin PM82 Console"
    },
    {
      "name": "Revox PR99"
    },
    {
      "name": "AKG C414 Microphone"
    },
    {
      "name": "RME Fireface UCX"
    },
    {
      "name": "Synths, Guitars, Pedals"
    },
    // {
    //   "name": "Fender American Pro Precision Bass"
    // },
    // {
    //   "name": "Fender American Vintage Jazzmaster"
    // },
    
  ]
}
const Equipments = () => {
  return (
    <div>
      <h4>
        Gear for recording and monitoring:
      </h4>
      <p></p>
      {
        devices.equipment.map(device=>{
          return (
            <li key={device.name}>{device.name}</li>
          )
        })
      }
    </div>
  )
}

export default Equipments