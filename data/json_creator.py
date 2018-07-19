import csv
import json

reader = csv.reader( open('editorials.csv', 'r'), delimiter=",")
total_rows = sum(1 for _ in reader) - 1
reader = csv.reader( open('editorials.csv', 'r'), delimiter=",")
next(reader)
print total_rows

data = '{"editorials": ['
rows_so_far = 0

for row in reader:
    rows_so_far += 1

    data += '{'
    data += '"date": ' + '"' + row[0] + '", '
    data += '"headline": ' + '"' + row[1] + '", '
    data += '"url": ' + '"' + row[2] + '", '
    if len(row[4]) > 1:
        data += '"keywords": [ "' + row[3] + '", "' + row[4] + '" ]'
    else:
        data += '"keywords": ' + '"' + row[3] + '" '

    if rows_so_far < total_rows:
        data += " },"
    else:
        data += "}"

data += "] }"

with open('data.json', 'w') as f:
    f.write(data + '\n')