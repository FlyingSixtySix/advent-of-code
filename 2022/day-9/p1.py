pos_H = [0, 0]
pos_T = [0, 0]

unique_tail_movements = []

def up(i):
    pos_H[1] += 1
    if pos_H[1] - 1 > pos_T[1]:
        pos_T[1] += 1
        # Account for diagnonal movement
        if i > 0:
            pos_T[0] = pos_H[0]
    if pos_T[:] not in unique_tail_movements:
        unique_tail_movements.append(pos_T[:])

def down(i):
    pos_H[1] -= 1
    if pos_H[1] + 1 < pos_T[1]:
        pos_T[1] -= 1
        # Account for diagnonal movement
        if i > 0:
            pos_T[0] = pos_H[0]
    if pos_T[:] not in unique_tail_movements:
        unique_tail_movements.append(pos_T[:])

def left(i):
    pos_H[0] -= 1
    if pos_H[0] + 1 < pos_T[0]:
        pos_T[0] -= 1
        # Account for diagnonal movement
        if i > 0:
            pos_T[1] = pos_H[1]
    if pos_T[:] not in unique_tail_movements:
        unique_tail_movements.append(pos_T[:])

def right(i):
    pos_H[0] += 1
    if pos_H[0] - 1 > pos_T[0]:
        pos_T[0] += 1
        # Account for diagnonal movement
        if i > 0:
            pos_T[1] = pos_H[1]
    if pos_T[:] not in unique_tail_movements:
        unique_tail_movements.append(pos_T[:])

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
        if dir == 'U':
            up(i)
        elif dir == 'D':
            down(i)
        elif dir == 'L':
            left(i)
        elif dir == 'R':
            right(i)
        print('H', (pos_H[0], pos_H[1],), 'T', (pos_T[0], pos_T[1],))

print(len(unique_tail_movements))
