import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true, ref: 'User' },
  show: { type: String, required: true, ref: 'Show' },
  amount: { type: String, required: true },
  bookedSeats: { type: Array, required: true },
  isPaid: { type: Boolean, required: false },
  paymentLink: { type: String }
}, { timestemps: true })

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;