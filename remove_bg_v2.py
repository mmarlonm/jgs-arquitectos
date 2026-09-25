from PIL import Image

try:
    img = Image.open('public/logo.jpg').convert('RGBA')
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # Calcular luminosidad del pixel
        # Para remover un fondo BLANCO y dejar lo NEGRO (u oscuro) intacto pero sin bordes dentados
        luma = (item[0] + item[1] + item[2]) / 3.0
        
        # El Alpha será inverso a la luminosidad (Blanco = 0 de opacidad, Negro = 255)
        # Hacemos que los colores oscuros sean totalmente opacos más rápidamente
        # y los grises claros sean semi-transparentes.
        if luma > 245:
            # Es fondo blanco
            alpha = 0
        else:
            # Suavizado para grises/anti-aliasing
            alpha = int(255 - luma)
            # Para evitar que el color se vea lavado, normalizamos el pixel oscuro hacia negro
            # o lo mantenemos. Si el logo era negro, forzar negro es mejor:
            item = (0, 0, 0, alpha)
            
        newData.append((item[0], item[1], item[2], alpha))
        
    img.putdata(newData)
    img.save('public/logo.png', 'PNG')
    print("Background removed cleanly with luma-based antialiasing.")
except Exception as e:
    print(f"Error: {e}")
