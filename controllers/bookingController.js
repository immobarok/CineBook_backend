import Booking from "../models/Booking";
import Show from "../models/Show"

const checkSeatsAvailability = async (showId, selectedSeat) => {
  try {
    const showData = await Show.findById(showId)
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatToken = selectedSeat.some(seat => occupiedSeats[seat])
    return !isAnySeatToken;
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message })
  }
}

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailability = await checkSeatsAvailability(showId, selectedSeats)
    if (!isAvailability) {
      return res.json({ success: false, message: "Selected Seats are not available." })
    }
    const showData = await Show.findById(showId).populate('movie');
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats
    })
    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    })
    showData.markModified('occupiedSeats');
    await showData.save()
    //stripe payment integrate

    res.json({ success: true, message: "Booked successfully" })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

export const getOccupiedSeats = async (req,res)=>{
  try {
    const {showId} = req.params;
    const showData = await Show.findById(showId)
    const occupiedSeats = Object.keys(showData.occupiedSeats)
    res.json({success:true,occupiedSeats})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}