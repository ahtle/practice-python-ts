from collections import defaultdict


# join accounts that have one matching email. Can use first name found.
accounts = [
    ["John", "a@gmail.com", "b@gmail.com"],
    ["John2", "b@gmail.com", "c@gmail.com", "d@gmail.com"],
    ["Mary", "mary@gmail.com"]
]

def accounts_merge(accounts):
    # Build graph
    graph = defaultdict(list)

    # Map email -> username
    email_to_name = {}

    for account in accounts:
        name = account[0]
        emails = account[1:]

        for email in emails:
            email_to_name[email] = name

        # Connect first email to all others
        first_email = emails[0]
        for email in emails[1:]:
            graph[first_email].append(email)
            graph[email].append(first_email)

    print('graph', graph)
    print('email_to_name', email_to_name)

    visited = set()
    result = []

    def dfs(email, component):
        print(f"dfs: {email}, {component}")
        visited.add(email)
        component.append(email)

        for neighbor in graph[email]:
            if neighbor not in visited:
                dfs(neighbor, component)

    # Find connected components
    for email in email_to_name:
        if email not in visited:
            component = []
            dfs(email, component)
            result.append({
                email_to_name[email]: component
            })

    return result


merged = accounts_merge(accounts=accounts)
print("merged", merged)