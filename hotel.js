const roomTypes = Object.freeze({
    SINGLE: 'SINGLE',
    DOUBLE: 'DOUBLE',
    SUITE: 'SUITE',
});

class Hotel {
    bookings = new Map();

    constructor(roomsList) {
        this.roomInventory = {
            [roomTypes.SINGLE]: new Map(),
            [roomTypes.DOUBLE]: new Map(),
            [roomTypes.SUITE]: new Map(),
        };
        for (const r of roomsList) {
            const roomList = this.roomInventory[r.type];
            roomList.set(r.roomNumber, { ...r, bookings: new Map()});
        };
    };

    bookRoom({ guestId, roomType, checkIn, checkOut }) {
        const roomsAvailable = this.getAvailableRooms({ roomType, checkIn, checkOut })
        if (roomsAvailable.length) {
            const room = roomsAvailable[0];
            const bookingId = crypto.randomUUID();

            // save booking to the room obj and the bookings map
            room.bookings.set(bookingId, {
                checkIn,
                checkOut
            });
            this.bookings.set(bookingId, {
                roomType, 
                roomNumber: room.roomNumber
            });

            const res = { ...room, bookingId, checkIn, checkOut};
            delete res.bookings;
            return res;
        }
        return false;
    };

    cancelBooking(bookingId) {
        if (!this.bookings.has(bookingId)) return false;
        const roomDetails = this.bookings.get(bookingId);
        this.bookings.delete(bookingId);

        const rooms = this.roomInventory[roomDetails.roomType];
        const room = rooms.get(roomDetails.roomNumber);

        if (!room.bookings.has(bookingId)) return false;
        room.bookings.delete(bookingId);
        return true;
    }

    getAvailableRooms({roomType, checkIn, checkOut}) {
        const rooms = this.roomInventory[roomType];
        const roomsAvailable = [];
        for (const [k, v] of rooms) {
            let canBook = true;
            for (const [bookingId, booking] of v.bookings) {
                if (checkIn < booking.checkOut &&
                    checkOut > booking.checkIn
                ) {
                    canBook = false;
                    break;
                }
            }
            if (canBook) {
                roomsAvailable.push(v);
            }
        };
        return roomsAvailable;
    };
}

const hotel = new Hotel([
    {
        roomNumber: "101",
        type: roomTypes.SINGLE,
        price: 120,
    },
    {
        roomNumber: "102",
        type: roomTypes.SINGLE,
        price: 120,
    },
    {
        roomNumber: "201",
        type: roomTypes.SUITE,
        price: 350,
    },
]);

console.log('rooms available', hotel.getAvailableRooms({roomType: roomTypes.SINGLE, checkIn: new Date("2026-08-01"), checkOut: new Date("2026-09-01") }));
const bookingDetails1 = hotel.bookRoom({guestId: "anh", roomType: roomTypes.SINGLE, checkIn: new Date("2026-08-01"), checkOut: new Date("2026-09-01") });
const bookingDetails2 = hotel.bookRoom({guestId: "anh", roomType: roomTypes.SINGLE, checkIn: new Date("2026-08-01"), checkOut: new Date("2026-09-01") });
console.log('rooms available after two booked', hotel.getAvailableRooms({roomType: roomTypes.SINGLE, checkIn: new Date("2026-08-01"), checkOut: new Date("2026-09-01") }));
console.log('room cancelled successfully', hotel.cancelBooking(bookingDetails1.bookingId)); // true
console.log('room cancelled successfully', hotel.cancelBooking(bookingDetails1.bookingId)); // false... already cancelled
console.log('room available after 1 cancelled', hotel.getAvailableRooms({roomType: roomTypes.SINGLE, checkIn: new Date("2026-08-01"), checkOut: new Date("2026-09-01") }));
