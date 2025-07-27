import Booking from "../models/Booking.js"
import Show from "../models/Show";

export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true })
}

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShow = await Show.find({ showDateTime: { $gte: new Date() } }).populate('moive');

    const totalUser = await User.countDocuments();
    const dashboradData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShow,
      totalUser,
    }
    res.json({ success: true, dashboradData })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie').sort({ showDateTime: 1 })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

//api to get all booking
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user').populate({
      path: "show",
      populate: { path: "movie" }
    }).sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}