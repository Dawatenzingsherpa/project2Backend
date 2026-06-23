
export interface OrderData{
  phoneNumber : string,
  shippingAddress : string,
  totalAmount : number,
  paymentDetails : {
    paymentMethod : PaymentMethod,
    paymentStatus ?: PaymentStatus,
    pidx ?: string
  }

  items : OrderDetails[]
}

export interface OrderDetails{
  quantity : number,
  productId : string
}


export enum PaymentMethod{
  Cod = 'cod',
  Khalti = 'khalti'
}

enum PaymentStatus{
  Paid = 'paid',
  Unpaid = 'unpaid'
}

export interface KhaltiResponse{
  pidx :string,
  payment_url : string,
  expires_at : Date | string,
  expire_in : string,
  user_fee : number
}

export interface TransactionVerifyResponse{
  
   pidx: string,
   total_amount: number,
   status: TransactionStatus,
   transaction_id: string,
   fee: number,
   refunded: boolean


}

export enum TransactionStatus{
  Completed = "Completed",
  Pending = "Pending",
  Cancelled =  "Cancelled"
}