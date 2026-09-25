from PIL import Image
import sys
import os

try:
    img_path = 'public/logo.jpg'
    out_path = 'public/logo.png'
    
    # Open the image
    img = Image.open(img_path)
    img = img.convert('RGBA')
    
    datas = img.getdata()
    newData = []
    
    # Simple thresholding: if pixel is close to white (background), make it transparent
    for item in datas:
        # Check if the pixel is mostly white (adjust threshold 220 as needed)
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(out_path, 'PNG')
    print("Logo converted to PNG with transparent background.")
except Exception as e:
    print(f"Error: {e}")
