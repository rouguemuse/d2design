import os

sql_file = r"C:\Users\rougu\Downloads\dbcvixlcgmfzmz.adding"
debug_file = r"C:\Users\rougu\Documents\antigravity\quirky-lavoisier\debug2.txt"

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    found = False
    lines_to_grab = 0
    buffer = ""
    for line in f:
        if "INSERT INTO `dlt_posts`" in line:
            found = True
            lines_to_grab = 5
        if found:
            buffer += line
            lines_to_grab -= 1
            if lines_to_grab <= 0:
                with open(debug_file, 'w', encoding='utf-8') as out:
                    out.write(buffer)
                break
print("Done")
