import re
import os

sql_file = r"C:\Users\rougu\Downloads\dbcvixlcgmfzmz.adding"
output_file = r"C:\Users\rougu\Documents\antigravity\quirky-lavoisier\site_content.md"

if not os.path.exists(sql_file):
    print(f"Error: Could not find {sql_file}")
    exit(1)

print(f"Reading {sql_file}...")

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Try to find all INSERT INTO `dlt_posts` lines
posts_inserts = re.findall(r"INSERT INTO `dlt_posts` \([^)]+\) VALUES\s*(.+);", content, re.IGNORECASE)

if not posts_inserts:
    print("Could not find any dlt_posts inserts. The database might use a different prefix or structure.")
else:
    print(f"Found {len(posts_inserts)} insert statements for posts.")

extracted_posts = []

# This is a very rudimentary regex to grab values inside parentheses that look like a WP post row.
# Values in wp_posts are typically: ID, post_author, post_date, post_date_gmt, post_content, post_title, etc.
# A rough regex to capture string values:
matches = re.finditer(r"\((?:\d+),\s*\d+,\s*'[^']*',\s*'[^']*',\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)',\s*'[^']*',\s*'[^']*',\s*'([^']*)'", content)

for match in matches:
    post_content = match.group(1).replace("''", "'")
    post_title = match.group(2).replace("''", "'")
    post_status = match.group(3)
    
    if post_status == 'publish' and len(post_content) > 50:
        extracted_posts.append({
            'title': post_title,
            'content': post_content
        })

print(f"Extracted {len(extracted_posts)} published posts/pages.")

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("# Extracted Site Content\n\n")
    for idx, post in enumerate(extracted_posts):
        f.write(f"## {post['title']}\n")
        f.write(f"{post['content']}\n")
        f.write("\n---\n\n")

print(f"Extraction complete. Saved to {output_file}")
