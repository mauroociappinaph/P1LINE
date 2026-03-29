export type TireType = 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';

export interface Driver {
  id: string;
  name: string;
  team: string;
  position: number;
  gapToLeader: string;
  image: string;
  carImage: string;
  trackPosition: number; // 0-100 representing progress along the track
  tires: {
    type: TireType;
    laps: number;
    condition: number; // 0-100
  };
  telemetry: {
    speed: number;
    throttle: number; // 0-100
    brake: number; // 0-100
    gear: number;
    drs: boolean;
  };
  color: string;
}

export interface RaceStatus {
  status: 'LIVE' | 'FINISHED' | 'SUSPENDED';
  flag: 'Green' | 'Yellow' | 'Red' | 'Safety Car' | 'VSC';
  lap: number;
  totalLaps: number;
  trackName: string;
}

export interface TelemetryPoint {
  time: number;
  speed: number;
  throttle: number;
  brake: number;
}
