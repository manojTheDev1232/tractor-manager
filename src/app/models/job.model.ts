export interface Job {
  id: number;
  farmerId: number;
  farmerName: string;
  machineId: number;
  machineName: string;
  ratePerHour: number; // stored at time of job (rate may change later)
  durationHours: number;
  durationMinutes: number;
  totalMinutes: number; // durationHours * 60 + durationMinutes
  amount: number; // totalMinutes * (ratePerHour / 60)
  date: string;
  status: 'Paid' | 'Pending';
  notes?: string;
}
