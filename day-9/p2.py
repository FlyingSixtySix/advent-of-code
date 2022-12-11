nodes = [[0, 0] for _ in range(10)]

def up(i, parent, next=None):
    parent[1] += 1
    if next is not None:
        if parent[1] - 1 > next[1]:
            next[1] += 1
            # Account for diagnonal movement
            if i > 0:
                next[0] = parent[0]

def down(i, parent, next=None):
    parent[1] -= 1
    if next is not None:
        if parent[1] + 1 < next[1]:
            next[1] -= 1
            # Account for diagnonal movement
            if i > 0:
                next[0] = parent[0]

def left(i, parent, next=None):
    parent[0] -= 1
    if next is not None:
        if parent[0] + 1 < next[0]:
            next[0] -= 1
            # Account for diagnonal movement
            if i > 0:
                next[1] = parent[1]

def right(i, parent, next=None):
    parent[0] += 1
    if next is not None:
        if parent[0] - 1 > next[0]:
            next[0] += 1
            # Account for diagnonal movement
            if i > 0:
                next[1] = parent[1]


sample = '''
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
'''.strip()

# for line in open('input.txt', 'r'):
for line in sample.split('\n'):
    line = line.strip()
    [dir, num] = line.split(' ')
    num = int(num)
    print(dir, num)
    for i in range(num):
        # Update head separately
        if dir == 'U':
            nodes[0][1] += 1
        elif dir == 'D':
            nodes[0][1] -= 1
        elif dir == 'L':
            nodes[0][0] -= 1
        elif dir == 'R':
            nodes[0][0] += 1
        # Update nodes
        for j in range(0, len(nodes)):
            if j == 0:
                curr = nodes[j]
                if dir == 'U':
                    up(i, curr)
                elif dir == 'D':
                    down(i, curr)
                elif dir == 'L':
                    left(i, curr)
                elif dir == 'R':
                    right(i, curr)
            else:
                prev = nodes[j - 1]
                curr = nodes[j]
                if dir == 'U':
                    up(i, curr, prev)
                elif dir == 'D':
                    down(i, curr, prev)
                elif dir == 'L':
                    left(i, curr, prev)
                elif dir == 'R':
                    right(i, curr, prev)


print(nodes)
