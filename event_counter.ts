interface GraphType {
    [key: string]: number
}


class EventCounter {
    private graph: GraphType = {};

    public add = (event: string): void => {
        const count = this.graph[event] || 0;
        this.graph[event] = count + 1;
    }

    public topK = (k: number): Array<string> => {
        const eventList: Array<{event: string, count: number}> = [];
        Object.entries(this.graph).forEach(([event, count]) => {
            eventList.push({
                event,
                count,
            });
        })
        eventList.sort((itemA, itemB) => itemB.count - itemA.count);
        const results = eventList.map((item) => item.event);
        return results.slice(0, k);
    } 
}

const ec = new EventCounter()

// count: checkout 3, login 2, purchase 1
ec.add("purchase")
ec.add("login")
ec.add("checkout")
ec.add("login")
ec.add("checkout")
ec.add("checkout")

// expected: checkout, login
console.log(ec.topK(2))

// # expected: checkout, login, purchase
console.log(ec.topK(3))
