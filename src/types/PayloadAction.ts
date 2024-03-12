export interface PayloadAction<PayloadType = null> {
  type: string
  payload: PayloadType
}
