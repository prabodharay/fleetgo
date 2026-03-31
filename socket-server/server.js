const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

/*
Driver socket registry
*/

const driverSockets = new Map()

io.on("connection", (socket) => {

  console.log("socket connected", socket.id)

  /*
  driver registers after login
  */

  socket.on("driver_online", async (data) => {

    const driverId = data.driverId

    driverSockets.set(driverId, socket.id)

    await db.collection("drivers").doc(driverId).update({
      socketId: socket.id,
      online: true
    })

    console.log("driver online", driverId)

  })

  /*
  driver accepts job
  */

  socket.on("accept_job", async (data) => {

    const { driverId, bookingId } = data

    await db.collection("driver_jobs")
      .doc(driverId)
      .update({
        status: "accepted"
      })

    await db.collection("bookings")
      .doc(bookingId)
      .update({
        driverId: driverId,
        status: "driver_assigned"
      })

  })

  /*
  driver rejects job
  */

  socket.on("reject_job", async (data) => {

    const { driverId } = data

    await db.collection("driver_jobs")
      .doc(driverId)
      .update({
        status: "rejected"
      })

  })

  socket.on("disconnect", () => {

    console.log("socket disconnected", socket.id)

    driverSockets.forEach((value, key) => {

      if (value === socket.id) {
        driverSockets.delete(key)
      }

    })

  })

})

/*
dispatch event
*/

async function sendJobToDriver(driverId, bookingId) {

  const socketId = driverSockets.get(driverId)

  if (!socketId) return false

  io.to(socketId).emit("new_job", {
    bookingId
  })

  return true
}

module.exports = {
  sendJobToDriver
}

server.listen(3001, () => {
  console.log("FleetGo Socket Server running")
})