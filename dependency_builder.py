from collections import defaultdict

# given list of packages, return list of package in order of installation.

packages = {
    "frontend": ["api", "cache"],
    "api": ["db"],
    "db": [],
    "cache": ["db"]
}

def install_order(packages):
    results = []

    # package_name: count of dependencies
    package_to_deps_count = defaultdict(int)
    # dependency to package list
    deps_to_packages = defaultdict(list)
    package_names = set(packages.keys())

    # build graphs
    for name, deps in packages.items():
        package_to_deps_count[name] = len(deps)

        for d in deps:
            deps_to_packages[d].append(name)

    print("package_to_deps_count", package_to_deps_count) # {'frontend': 2, 'api': 1, 'db': 0, 'cache': 1}
    print("deps_to_packages", deps_to_packages) # {'api': ['frontend'], 'cache': ['frontend'], 'db': ['api', 'cache']}

    while package_names: 
        one_processed = False
        # packages with 0 dependencies can be installed
        for p, count in package_to_deps_count.items():
            if count == 0 and p in package_names:
                one_processed = True
                results.append(p)
                package_names.remove(p)
                for name in deps_to_packages[p]:
                    package_to_deps_count[name] -= 1

        if not one_processed:
            break

    return results



# expected return: [db, cache or api, frontend]
res = install_order(packages)
print("res", res)