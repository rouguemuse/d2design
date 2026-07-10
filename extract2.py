import os
import re

sql_file = r"C:\Users\rougu\Downloads\dbcvixlcgmfzmz.adding"
output_file = r"C:\Users\rougu\Documents\antigravity\quirky-lavoisier\site_content.md"

print(f"Reading {sql_file}...")

extracted_posts = []

# State machine for parsing SQL inserts
in_posts_insert = False

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if "INSERT INTO `dlt_posts`" in line:
            in_posts_insert = True
            continue
        elif in_posts_insert and line.startswith("INSERT INTO"):
            in_posts_insert = False
            
        if in_posts_insert and line.startswith("("):
            # Very rough regex to pull out post_content (field 5), post_title (field 6), post_status (field 8), post_type (field 21)
            # Since fields can contain commas and quotes, this is tricky. We'll use a split strategy based on standard WP dump format.
            # Usually it looks like: (id, author, 'date', 'gmt', 'content', 'title', 'excerpt', 'status', ...
            
            # Find the title first by looking for 'publish', 'page'
            if "'publish'" in line and ("'page'" in line or "'post'" in line) and "revision" not in line:
                # Let's extract raw text and clean it up
                # We can strip HTML tags using regex to just get the copy
                clean_text = re.sub(r'<[^>]+>', ' ', line)
                clean_text = re.sub(r'\[/?elementor.*?\]', ' ', clean_text)
                
                # Extract title roughly
                parts = line.split("', '")
                if len(parts) > 5:
                    title = parts[5].replace("''", "'")
                    content_raw = parts[4]
                    
                    # Remove elementor JSON and styling
                    if '"widgetType"' not in content_raw:
                        content_clean = re.sub(r'<[^>]+>', '\n', content_raw)
                        
                        if len(content_clean) > 50:
                            extracted_posts.append({
                                'title': title,
                                'content': content_clean[:1000] + "...\n" # Truncate for now to see what we get
                            })

print(f"Extracted {len(extracted_posts)} published posts/pages.")

with open(output_file, 'w', encoding='utf-8') as out:
    out.write("# Extracted Site Content\n\n")
    for post in extracted_posts:
        out.write(f"## {post['title']}\n")
        out.write(f"{post['content']}\n")
        out.write("\n---\n\n")

print(f"Saved to {output_file}")
