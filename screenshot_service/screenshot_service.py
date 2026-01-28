import time
import threading
import mss
import requests
from PIL import Image
from io import BytesIO

SERVER_URL = 'http://172.20.1.23:5174/images/upload'  # Replace with your server's IP address

def take_screenshot():
    with mss.mss() as sct:
        while True:
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            screenshot_filename = f"screenshot_{timestamp}.jpg"  # Save as JPG
            
            # Capture the full screen
            img = sct.grab(sct.monitors[1])
            img = Image.frombytes('RGB', img.size, img.bgra, 'raw', 'BGRX')

            # Resize the image to 800x600
            img = img.resize((800, 600), Image.LANCZOS)

            # Convert image to bytes with compression
            img_byte_arr = BytesIO()
            img.save(img_byte_arr, format='JPEG', quality=80, optimize=True)  # Save as JPEG with quality and optimization
            img_byte_arr.seek(0)  # Move to the beginning of the BytesIO buffer

            # Try to send the screenshot directly
            if not send_screenshot(screenshot_filename, img_byte_arr):
                print(f"Failed to send {screenshot_filename}.")

            time.sleep(5)  # Wait for 5 seconds before taking the next screenshot

def send_screenshot(filename, img_byte_arr):
    try:
        # Prepare the file to send
        files = {'file': (filename, img_byte_arr, 'image/jpeg')}
        response = requests.post(SERVER_URL, files=files)
        if response.status_code in (200, 201):
            print(f"Sent {filename} to server.")
            return True
        else:
            print(f"Failed to send {filename}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Error sending {filename}: {e}")
        return False

def run_service():
    screenshot_thread = threading.Thread(target=take_screenshot)
    screenshot_thread.daemon = True
    screenshot_thread.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Service stopped.")

if __name__ == "__main__":
    run_service()
