import Image, ImageFilter, numpy, pytesseract

from PIL import ImageEnhance

file_name = "photo_2"
full_file_name = file_name + ".jpg"
# open original image
original_img = Image.open(full_file_name)

img_x, img_y = original_img.size
print "img_x: "
print img_x
print "img_y: "
print img_y
zoom = 1
response_img = original_img.resize((int(img_x*zoom), int(img_y*zoom)), Image.BICUBIC)

# apply blur and low pass filter
response_img = response_img.filter(ImageFilter.Kernel((3, 3), [0,-1,0,-1,1,-1,0,-1,0],None,1))
#img2 = img2.filter(ImageFilter.BLUR);

# apply grayscale filter
response_img = response_img.convert("L")


# create brightness enhancer
brightness_enhancer = ImageEnhance.Brightness(response_img)
# apply brightness enhancement
response_img = brightness_enhancer.enhance(1.5)

# create contrast enhancer
contrast_enhancer = ImageEnhance.Contrast(response_img)
# apply contrast enhancement
response_img = contrast_enhancer.enhance(3)


# ROUND 2, fight!!! Trying to get a better result... Better call Saul


# apply blur and low pass filter
response_img = response_img.filter(ImageFilter.Kernel((3, 3), [0,-1,0,-1,1,-1,0,-1,0],None,1))
#img2 = img2.filter(ImageFilter.BLUR);

# create brightness enhancer
brightness_enhancer = ImageEnhance.Brightness(response_img)
# apply brightness enhancement
response_img = brightness_enhancer.enhance(1.2)

# create contrast enhancer
contrast_enhancer = ImageEnhance.Contrast(response_img)
# apply contrast enhancement
response_img = contrast_enhancer.enhance(3)



response_img.save(file_name + "_02.jpg")


# print pytesseract.image_to_string(response_img, lang='fra')
print pytesseract.image_to_string(response_img)

