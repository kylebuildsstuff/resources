from collections import deque

def array_left_rotation(a, n, k):
    buff = deque(a, maxlen=n)
    for val in range(k):
        buff.append(buff[0])
    return buff

n, k = map(int, input().strip().split(' '))
a = list(map(int, input().strip().split(' ')))
answer = array_left_rotation(a, n, k);
print(*answer, sep=' ')
