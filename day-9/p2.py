nodes = [[0, 0] for _ in range(10)]

def print_grid():
    max_x = 20
    max_y = 20
    grid = [['.' for _ in range(max_x)] for _ in range(max_y)]

    i = 0
    for node in nodes:
        grid[node[1]][node[0]] = str(i)
        i += 1

    grid = '\n'.join(''.join(x for x in g) for g in grid)
    print(grid)

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

def process(dir, head, tail):
    """
    Processes the node at the specified index.
    """
    # print(head)
    if dir == 'U':
        head[1] += 1
        # Up
        if head[1] - 1 > tail[1]:
            # H
            # .
            # T
            tail[1] += 1
    elif dir == 'D':
        head[1] -= 1
        # Down
        if head[1] + 1 < tail[1]:
            # T
            # .
            # H
            tail[1] -= 1
    elif dir == 'L':
        head[0] -= 1
        # Left
        if head[0] + 1 < tail[0]:
            # H.T
            tail[0] += 1
    elif dir == 'R':
        head[0] += 1
        if head[0] - 1 > tail[0]:
            # T.H
            tail[0] += 1
    elif dir == 'UL':
        head[0] -= 1
        head[1] += 1
    elif dir == 'DL':
        head[0] -= 1
        head[1] -= 1
    elif dir == 'UR':
        head[0] += 1
        head[1] += 1
    elif dir == 'DR':
        head[0] += 1
        head[1] -= 1
    return dir


# for line in open('input.txt', 'r'):
for line in sample.split('\n'):
    line = line.strip()
    [dir, num] = line.split(' ')
    num = int(num)
    print(dir, num)
    # We only need the direction for the head
    # For all nodes (except the head), use the previous node to determine what the current one's position should be (infer direction!)
    for i in range(num):
        if dir == 'U':
            nodes[0][1] += 1
        elif dir == 'D':
            nodes[0][1] -= 1
        elif dir == 'L':
            nodes[0][0] -= 1
        elif dir == 'R':
            nodes[0][0] += 1
    for i in range(1, len(nodes) - 1):
        for j in range(num):
            dir = process(dir, nodes[i - 1], nodes[i])

print_grid()
