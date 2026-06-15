export interface DieselPurchase {
  id: number;
  vendorId: number;
  vendorName: string;
  liters: number;
  ratePerLiter: number;
  amount: number; // liters * ratePerLiter
  date: string;
  odometerReading?: number;
}
