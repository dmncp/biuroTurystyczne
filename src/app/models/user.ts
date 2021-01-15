export interface User{
  uid: string;
  key?: string;
  email: string;
  trips?: string[];
  userType?: string;
  reservedTrips?: {tripKey: string, reservedPlaces: number, rate: number}[];
  // zawiera klucze do wycieczek w bazie oraz ilość zarezerwowanych
}
