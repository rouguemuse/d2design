import re

sql_file = r"C:\Users\rougu\Downloads\dbcvixlcgmfzmz.adding"
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

inserts = re.findall(r"INSERT INTO `dlt_posts`.*?VALUES\s*(.*?);", content, re.IGNORECASE | re.DOTALL)

types = set()
for block in inserts:
    rows = re.split(r"\),\s*\(", block.strip("() \n\r\t"))
    for row in rows:
        # Just find the string before the last integer (which is comment_count)
        # Usually it's post_type, post_mime_type, comment_count
        parts = re.findall(r"'([^']*)'", row)
        if len(parts) >= 3:
            post_type = parts[-2]
            title = parts[5] if len(parts) > 5 else 'Unknown'
            status = parts[7] if len(parts) > 7 else 'Unknown'
            types.add(post_type)
            if post_type == 'post':
                print(f"Post: {title}")

print(f"Found post types: {types}")
