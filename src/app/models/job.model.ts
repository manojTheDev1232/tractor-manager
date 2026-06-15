export interface Job {
  id: number;
  farmerId: number;
  farmerName: string;
  acres: number;
  ratePerAcre: number;
  amount: number; // acres * ratePerAcre
  date: string; // ISO date
  status: 'Paid' | 'Pending';
  notes?: string;
}
