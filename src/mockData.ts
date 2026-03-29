import { Driver, RaceStatus, TelemetryPoint } from './types';

export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    team: 'Ferrari',
    position: 1,
    gapToLeader: '0.000',
    image: 'https://media.formula1.com/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png.transform/6col-retina/image.png',
    trackPosition: 85,
    tires: { type: 'Medium', laps: 8, condition: 85 },
    telemetry: { speed: 318, throttle: 100, brake: 0, gear: 8, drs: false },
    color: '#E80020',
  },
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    position: 2,
    gapToLeader: '+1.245',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png.transform/6col-retina/image.png',
    trackPosition: 83,
    tires: { type: 'Medium', laps: 10, condition: 78 },
    telemetry: { speed: 322, throttle: 100, brake: 0, gear: 8, drs: true },
    color: '#3671C6',
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    team: 'McLaren',
    position: 3,
    gapToLeader: '+4.890',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png.transform/6col-retina/image.png',
    trackPosition: 79,
    tires: { type: 'Hard', laps: 15, condition: 70 },
    telemetry: { speed: 315, throttle: 95, brake: 0, gear: 8, drs: false },
    color: '#FF8000',
  },
  {
    id: 'antonelli',
    name: 'Kimi Antonelli',
    team: 'Mercedes',
    position: 4,
    gapToLeader: '+12.340',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png', // Placeholder for Antonelli
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png.transform/6col-retina/image.png',
    trackPosition: 72,
    tires: { type: 'Medium', laps: 12, condition: 65 },
    telemetry: { speed: 310, throttle: 100, brake: 0, gear: 8, drs: false },
    color: '#27F4D2',
  },
  {
    id: 'bearman',
    name: 'Oliver Bearman',
    team: 'Haas',
    position: 5,
    gapToLeader: '+25.670',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col-retina/image.png', // Placeholder for Bearman
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas.png.transform/6col-retina/image.png',
    trackPosition: 60,
    tires: { type: 'Hard', laps: 22, condition: 45 },
    telemetry: { speed: 305, throttle: 80, brake: 10, gear: 7, drs: false },
    color: '#FFFFFF',
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    team: 'Ferrari',
    position: 6,
    gapToLeader: '+28.120',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png.transform/6col-retina/image.png',
    trackPosition: 55,
    tires: { type: 'Soft', laps: 5, condition: 92 },
    telemetry: { speed: 325, throttle: 100, brake: 0, gear: 8, drs: true },
    color: '#E80020',
  },
  {
    id: 'piastri',
    name: 'Oscar Piastri',
    team: 'McLaren',
    position: 7,
    gapToLeader: '+32.450',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png.transform/6col-retina/image.png',
    trackPosition: 50,
    tires: { type: 'Medium', laps: 18, condition: 55 },
    telemetry: { speed: 312, throttle: 90, brake: 0, gear: 8, drs: false },
    color: '#FF8000',
  },
  {
    id: 'russell',
    name: 'George Russell',
    team: 'Mercedes',
    position: 8,
    gapToLeader: '+35.890',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png.transform/6col-retina/image.png',
    trackPosition: 45,
    tires: { type: 'Hard', laps: 25, condition: 60 },
    telemetry: { speed: 308, throttle: 100, brake: 0, gear: 8, drs: false },
    color: '#27F4D2',
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz',
    team: 'Williams',
    position: 9,
    gapToLeader: '+42.120',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png.transform/6col-retina/image.png',
    trackPosition: 40,
    tires: { type: 'Medium', laps: 15, condition: 72 },
    telemetry: { speed: 302, throttle: 85, brake: 5, gear: 7, drs: false },
    color: '#64C4FF',
  },
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    team: 'Aston Martin',
    position: 10,
    gapToLeader: '+45.670',
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col-retina/image.png',
    carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png.transform/6col-retina/image.png',
    trackPosition: 35,
    tires: { type: 'Hard', laps: 28, condition: 58 },
    telemetry: { speed: 304, throttle: 100, brake: 0, gear: 8, drs: false },
    color: '#229971',
  },
];

export const MOCK_RACE_STATUS: RaceStatus = {
  status: 'LIVE',
  flag: 'Green',
  lap: 18,
  totalLaps: 58,
  trackName: 'Albert Park Circuit, Melbourne (2026)',
};

export const generateTelemetryData = (driverId: string): TelemetryPoint[] => {
  const points: TelemetryPoint[] = [];
  for (let i = 0; i < 20; i++) {
    points.push({
      time: i,
      speed: 280 + Math.random() * 40,
      throttle: 80 + Math.random() * 20,
      brake: Math.random() * 10,
    });
  }
  return points;
};

export const EXPLANATIONS = {
  DRS: {
    title: "¿Qué es el DRS?",
    content: "Significa 'Drag Reduction System'. Es un ala trasera móvil que se abre para reducir la resistencia al aire, permitiendo que el coche vaya más rápido en las rectas para adelantar.",
  },
  UNDERCUT: {
    title: "¿Qué es un Undercut?",
    content: "Es una estrategia donde un piloto entra a boxes antes que el coche de delante para poner neumáticos nuevos, rodar más rápido y adelantarle cuando el otro finalmente pare.",
  },
  TIRES: {
    title: "¿Por qué cambian neumáticos?",
    content: "Los neumáticos de F1 se desgastan muy rápido. Los 'Soft' (Rojos) son muy rápidos pero duran poco. Los 'Hard' (Blancos) son más lentos pero duran mucho más.",
  },
  TIRE_WEAR: {
    title: "Desgaste de Neumáticos",
    content: "A medida que el neumático se usa, pierde goma y agarre. Esto hace que el coche sea más lento en las curvas y más difícil de frenar. Un neumático al 50% puede perder hasta 1-2 segundos por vuelta comparado con uno nuevo.",
  },
  REGULATIONS_2026: {
    title: "Nuevas Reglas 2026",
    content: "En 2026, los motores de F1 usan combustibles 100% sostenibles y tienen una potencia eléctrica mucho mayor. Los coches son más pequeños y ligeros para mejorar el espectáculo.",
  }
};
