from collections import defaultdict, deque

class RateLimiter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.requests = defaultdict(deque)

    def allow_request(self, user_id: str, timestamp: int) -> bool:

        user_requests = self.requests[user_id]

        # remove requests older than window_seconds
        while user_requests and timestamp - user_requests[0] > self.window_seconds:
            user_requests.popleft()

        # check if request exceeds limit
        if len(user_requests) >= self.limit:
            return False

        # add request to deque
        self.requests[user_id].append(timestamp)
        return True



rl = RateLimiter(3, 10)
print(rl.allow_request("alice", 1))   # True
print(rl.allow_request("alice", 2))   # True
print(rl.allow_request("alice", 3))   # True
print(rl.allow_request("alice", 9))   # False
print(rl.allow_request("alice", 12))  # True