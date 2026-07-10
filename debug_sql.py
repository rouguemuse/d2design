import os

sql_file = r"C:\Users\rougu\Downloads\dbcvixlcgmfzmz.adding"
debug_file = r"C:\Users\rougu\Documents\antigravity\quirky-lavoisier\debug.txt"

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if "INSERT INTO `dlt_posts`" in line:
            with open(debug_file, 'w', encoding='utf-8') as out:
                out.write(line[:2000])
            break
print("Done")
