# Screenshot Capture and Upload Script

This Python script automates the process of capturing screenshots at regular intervals, saving them locally, and uploading them to a remote server. If the upload fails, the screenshots are moved to a cache directory for later retry.

## Features

- Captures screenshots every 5 seconds.
- Saves screenshots to a specified local directory.
- Attempts to upload screenshots to a remote server.
- Caches failed uploads for later retries.
- Runs as a background service with threading.

## Requirements

- Python 3.x
- `mss` library for capturing screenshots
- `requests` library for making HTTP requests

You can install the necessary libraries using pip:

```bash```
pip install mss requests Pillow
Configuration
Before running the script, update the following constants in the code:

LOCAL_DOWNLOAD_FOLDER: Path to the local folder where screenshots will be saved.
CACHE_FOLDER: Path to the folder where failed uploads will be cached.
SERVER_URL: URL of the server where screenshots will be uploaded. Replace http://172.20.1.22:3000/images/upload with your server's IP address.

## Build EXE

pip install pyinstaller pystray Pillow

pyinstaller --onefile --windowed --icon=icon.ico screenshot_service.py


##  Usage

Clone this repository or download the script file.
Open the script in your preferred code editor.
Update the configuration as needed.
Run the script:
The script will run continuously, capturing and uploading screenshots until interrupted (e.g., by pressing Ctrl+C).
Code Overview
Key Functions
take_screenshot(): Captures a screenshot and attempts to upload it to the server. If the upload fails, the screenshot is moved to the cache folder.

send_screenshot(filename, filepath): Uploads the specified screenshot file to the server and returns a success status.

send_cached_screenshots(): Checks the cache folder for any screenshots that failed to upload and attempts to resend them.

run_service(): Initializes and starts the screenshot capturing and cached upload threads.

## Considerations
Ensure that the script runs on a machine with adequate permissions to access the screen and make network requests.
Monitor system performance, as continuous screenshot capturing may impact resources.
Ensure compliance with privacy and security policies, especially if sensitive information may be captured.
License
This project is licensed under the MIT License. See the LICENSE file for details.