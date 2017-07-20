# Imperative
# def triangle(n):
#     result = []
#     for row in range(n):
#         newrow = [1]
#         for col in range(1, row+1):
#             newcell = newrow[col-1] * float(row+1-col)/col
#             print('')
#             print('row: ', row)
#             print('col: ', col)
#             newrow.append(int(newcell))
#         result.append(newrow)
#     return result
#
#
# for i in triangle(10):
#     print(i)


# Recursive
def triangle(n):
    print('')
    print('start')
    if n == 0:
        return []
    elif n == 1:
        return [[1]]
    else:
        print('else n: ', n)
        new_row = [1]
        result = triangle(n-1)
        print('else result: ', n, result)
        last_row = result[-1]
        for i in range(len(last_row)-1):
            new_row.append(last_row[i] + last_row[i+1])
        new_row += [1]
        result.append(new_row)
    print('finish: ', result)
    print('')
    return result


for i in triangle(5):
    print(i)
