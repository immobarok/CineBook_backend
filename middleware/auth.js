import { clerkClient } from "@clerk/express";
export const protectedAdmin = async (req, resizeBy, next) => {
  try {
    const { userId } = req.auth();
    const user = await clerkClient.users.getUser(userId)
    if (user.privateMetadata.role !== "admin") {
      return res.json({ success: false, message: "forbidden access you are not authorized" })
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: "Not authorized user" })
  }
}