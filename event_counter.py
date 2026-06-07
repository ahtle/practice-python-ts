from collections import defaultdict, Counter
import heapq

class EventCounter:
    def __init__(self) -> None:
        self.counts = defaultdict(int)

    def add(self, event: str) -> None:
        self.counts[event] += 1

    def top_k(self, k: int) -> list[str]:
        heap = []
        for event, freq in self.counts.items():
            # heapq is a min heap... smallest will be first to pop
            heapq.heappush(heap, (-freq, event))

        result = []
        for _ in range(k):
            _, event = heapq.heappop(heap)
            result.append(event)
        return result


# class EventCounter:
#     def __init__(self) -> None:
#         self.counts = Counter([])

#     def add(self, event: str) -> None:
#         self.counts.update([event])

#     def top_k(self, k: int) -> list[str]:
#         return self.counts.most_common(k)



ec = EventCounter()

# count: checkout 3, login 2, purchase 1
ec.add("purchase")
ec.add("login")
ec.add("checkout")
ec.add("login")
ec.add("checkout")
ec.add("checkout")

# expected: checkout, login
print(ec.top_k(2))
# expected: checkout, login, purchase
print(ec.top_k(3))
