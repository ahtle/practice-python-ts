// Requirements

// The parking lot has three kinds of parking spots:

// Motorcycle
// Car
// Bus

// Vehicles can be:

// Motorcycle
// Car
// Bus

// Rules:

// A motorcycle can park in any spot.
// A car can park in Car or Bus spots.
// A bus requires 5 consecutive Bus spots.


enum VehicleType {
    MOTORCYCLE,
    CAR,
    BUS,
}

interface VehicleLocation {
    spotType: VehicleType,
    spotIndexes: number[]
}

class ParkingLot {
    readonly spots: Record<string, (string | null)[]>;
    vehicalLocationMap = new Map<string, VehicleLocation>();

    constructor(options: { motorcycleSpots: number, carSpots: number, busSpots: number }) {
        const { motorcycleSpots, carSpots, busSpots } = options;
        this.spots = {
            [VehicleType.MOTORCYCLE]: new Array(motorcycleSpots).fill(null),
            [VehicleType.CAR]: new Array(carSpots).fill(null),
            [VehicleType.BUS]: new Array(busSpots).fill(null),
        }
    }

    private _parkOne(vehicleId: string, type: VehicleType): boolean {
        const spots = this.spots[type];
        if (!spots) return false;

        const firstAvailableIndex = spots.findIndex((x) => x === null);
        if (firstAvailableIndex === -1) return false;

        spots[firstAvailableIndex] = vehicleId;
        this.vehicalLocationMap.set(vehicleId, {
            spotType: type,
            spotIndexes: [firstAvailableIndex],
        });

        return true;
    }

    private _parkBus(vehicleId: string): boolean {
        const spots = this.spots[VehicleType.BUS];
        if (!spots || spots.length < 5) return false;

        for (let start = 0; start < spots.length - 5; start++) {
            let canPark = true;

            for (let i = start; i < spots.length - 5; i++) {
                if (spots[i] !== null) {
                    canPark = false;
                    break;
                }
            }

            if (!canPark) {
                continue;
            }

            const indices: number[] = [];

            for (let i = start; i < start + 5; i++) {
                spots[i] = vehicleId;
                indices.push(i);
            }

            this.vehicalLocationMap.set(vehicleId, {
                spotType: VehicleType.BUS,
                spotIndexes: indices,
            });

            return true;
        }

        return false;
    }

    park(vehicleId: string, type: VehicleType): boolean {
        // check if vehicleId already parked
        if (this.vehicalLocationMap.has(vehicleId)) return false;

        switch (type) {
            case VehicleType.MOTORCYCLE:
                return this._parkOne(vehicleId, VehicleType.MOTORCYCLE) 
                    || this._parkOne(vehicleId, VehicleType.CAR) 
                    || this._parkOne(vehicleId, VehicleType.BUS);
            case VehicleType.CAR:
                return this._parkOne(vehicleId, VehicleType.CAR) 
                || this._parkOne(vehicleId, VehicleType.BUS);
            case VehicleType.BUS:
                return this._parkBus(vehicleId);
            default:
                return false;

        }
    }

    leave(vehicleId: string): void {
        const location = this.vehicalLocationMap.get(vehicleId);
        if (!location) return;
        const spots = this.spots[location.spotType];
        if (!spots) return;
        
        const indexes = location.spotIndexes;
        for (let i of indexes) {
            spots[i] = null;
        };
        this.vehicalLocationMap.delete(vehicleId);
    };
}

const p = new ParkingLot({motorcycleSpots: 3, carSpots: 4, busSpots: 10});
console.log(p.park("moto1", VehicleType.MOTORCYCLE)); // true
console.log(p.park("moto1", VehicleType.MOTORCYCLE)); // false
console.log(p.spots[VehicleType.MOTORCYCLE]); // [ 'moto1', null, null ]

console.log(p.park("car1", VehicleType.CAR));
console.log(p.park("car2", VehicleType.CAR));
console.log(p.park("car3", VehicleType.CAR));
console.log(p.spots[VehicleType.CAR]);

console.log(p.park("bus1", VehicleType.BUS)); // true
console.log(p.park("bus2", VehicleType.BUS)); // true
console.log(p.park("bus3", VehicleType.BUS)); // false
console.log(p.spots[VehicleType.BUS]);
console.log(p.vehicalLocationMap);


p.leave("bus1");
console.log(p.spots[VehicleType.BUS]);
console.log(p.vehicalLocationMap);
