# Get the nth element in the Fibonacci sequence (0,1,1,2,3,5,8,13…).(The next number in the Fibonacci sequence is found by adding up the two numbers before it.)
# Example:
# Fibonacci(1) = 1
# Fibonacci(7) = 13


# (0,1,1,2,3,5,8,13…)

# def fibonacci(n):
#     return fibonacci(n-1)+fibonacci(n-2)


def solution(n):
    if n:
        the_list = [0, 1]
        for i in range(2, n + 1):
            the_list.append(the_list[i - 1] + the_list[i - 2])
        return the_list[n]

print(solution(4))
