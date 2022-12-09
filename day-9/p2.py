head = [0, 0]
tail = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
]

def up(i, parent, next):
    parent[1] += 1
    new_dir = ''
    if parent[1] - 1 > next[1]:
        next[1] += 1
        new_dir = 'U'
        # Account for diagnonal movement
        if i > 0:
            next[0] = parent[0]
    return new_dir, next

def down(i, parent, next):
    parent[1] -= 1
    new_dir = ''
    if parent[1] + 1 < next[1]:
        next[1] -= 1
        new_dir = 'D'
        # Account for diagnonal movement
        if i > 0:
            next[0] = parent[0]
    return new_dir, next

def left(i, parent, next):
    parent[0] -= 1
    new_dir = ''
    if parent[0] + 1 < next[0]:
        next[0] -= 1
        new_dir = 'L'
        # Account for diagnonal movement
        if i > 0:
            next[1] = parent[1]
    return new_dir, next

def right(i, parent, next):
    parent[0] += 1
    new_dir = ''
    if parent[0] - 1 > next[0]:
        next[0] += 1
        new_dir = 'R'
        # Account for diagnonal movement
        if i > 0:
            next[1] = parent[1]
    return new_dir, next

def process(dir, i, new_tail):
    if dir == 'U':
        return up(i, head, new_tail)
    elif dir == 'D':
        return down(i, head, new_tail)
    elif dir == 'L':
        return left(i, head, new_tail)
    elif dir == 'R':
        return right(i, head, new_tail)
    return '', new_tail


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
        new_tail = tail[0]
        for j in range(len(tail)):
            dir, new_tail = process(dir, i - j, new_tail)


print(head, tail)
