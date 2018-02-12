export interface Account {
  id: number;
  name: string;
  salesOwner?: string;
  purchaseOnCredit?: number;
  creditExemption?: number;
  paymentTermsDays?: string;
  licensingVertical?: string;
  invoiceContactId?: number;
}
