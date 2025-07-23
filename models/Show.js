import mongoose from "mongoose";

const showSchema = mongoose.Schema({
  movie: { type: String, require: true, ref: "Movie" },
  showDateTime: { type: Date, require: true },
  showPrice: { type: Number, require: true },
  occupiedSeats: { type: Object, default: {} },
}, { minimize: false })

const Show = mongoose.model("Show", showSchema);
export default Show;