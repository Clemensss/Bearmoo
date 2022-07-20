arr = []
def is_ascii(s):
    return all(ord(c) < 128 for c in s)
with open('wortliste.txt', 'r') as f:
    for line in f:
        if len(line) == 6 and is_ascii(line):
            arr.append('"' + line[0:-1].lower() + '",')

with open('german', 'w') as f:
    for wort in arr:
        f.write(wort + '\n')