import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public orientation = -1;
  private file: File;
  private imageSrc;
  constructor() { };

  ReformatImage(file, callback) {
    const filename = file.name;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (ev) => {
      const img = new Image();
      var base64 = (ev.target as any).result;
      img.src = base64;
      const orientation = this.getOrientation(base64);
      console.log(orientation)
      this.imageSrc = (ev.target as any).result;
      img.onloadend = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        const width = 500;
        const scaleFactor = width / img.width;
        const height = img.height * scaleFactor;
        // set proper canvas dimensions before transform & export
        if (4 < orientation && orientation < 9) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        // transform context before drawing image
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
          case 7: ctx.transform(0, -1, -1, 0, height, width); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
          default: break;
        }
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor)
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], filename, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          this.file = file
        }, 'image/jpeg', 1);
      }
    }
    callback(this.file, this.imageSrc)
  }

  getOrientation(dataURI) {
      var view = new DataView(this.str2ab(dataURI));
      if (view.getUint16(0, false) != 0xFFD8)
      return -2;
      var length = view.byteLength,
        offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) {
           return  -1
          }
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return  (view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return -1;
  };
  str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}

