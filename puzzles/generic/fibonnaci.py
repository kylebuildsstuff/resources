# def solution(n):
#     if n == 0 or n == 1:
#         return n
#     return solution(n - 1) + solution(n - 2)
#
#
# print(solution(7))


def solution(n):
    sequence = [0, 1]
    for num in range(2, n + 1):
        sequence.append(sequence[num - 1] + sequence[num - 2])
    return sequence[-1]


print(solution(7))
