import kagglehub
import os
import shutil

# Get the directory of the current Python file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Download latest version
path = kagglehub.dataset_download("avtnshm/bombay-stock-exchange-bse-sensex-index-2005-2024")

# Move downloaded files to the current script directory
for file in os.listdir(path):
    source_file = os.path.join(path, file)
    dest_file = os.path.join(current_dir, file)
    shutil.copy2(source_file, dest_file)

print("Files downloaded to:", current_dir)

# Delete the files from the initial download location
try:
    shutil.rmtree(path)
    print(f"Original downloaded files at {path} have been removed")
except Exception as e:
    print(f"Error removing original files: {e}")