import os
import shutil
import pypdfium2 as pdfium
from PIL import Image

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ref_dir = os.path.join(base_dir, 'referensi')
    public_dir = os.path.join(base_dir, 'public')
    projects_img_dir = os.path.join(public_dir, 'images', 'projects')
    hero_img_dir = os.path.join(public_dir, 'images', 'hero')
    os.makedirs(projects_img_dir, exist_ok=True)
    os.makedirs(hero_img_dir, exist_ok=True)

    # 1. Copy CV PDF to public/cv.pdf
    cv_src = os.path.join(ref_dir, 'M. Sohibbal_CV_Academy.pdf')
    cv_dst = os.path.join(public_dir, 'cv.pdf')
    if os.path.exists(cv_src):
        shutil.copy2(cv_src, cv_dst)
        print(f"Copied CV to {cv_dst}")

    # 2. Extract slides from M. Sohibbal_Portfolio_Academy.pdf
    portfolio_pdf = os.path.join(ref_dir, 'M. Sohibbal_Portfolio_Academy.pdf')
    if os.path.exists(portfolio_pdf):
        pdf = pdfium.PdfDocument(portfolio_pdf)
        # Page mappings:
        # Page 2 -> mistech
        # Page 3 -> intelview
        # Page 4 -> corseo
        # Page 5 -> smart-eppm
        # Page 6 -> obesity-mlops
        slide_names = {
            1: 'mistech.jpg',
            2: 'intelview.jpg',
            3: 'corseo.jpg',
            4: 'smart-eppm.jpg',
            5: 'obesity-mlops.jpg'
        }
        for page_idx, name in slide_names.items():
            if page_idx < len(pdf):
                page = pdf[page_idx]
                bitmap = page.render(scale=2.0) # High quality 2x
                pil_img = bitmap.to_pil()
                target_path = os.path.join(projects_img_dir, name)
                pil_img.save(target_path, 'JPEG', quality=95)
                print(f"Rendered Page {page_idx+1} -> {target_path} ({pil_img.size})")

    # 3. Avatar profile for Sohibbal
    # We can fetch or save Sohibbal's avatar or copy initial portrait
    avatar_dst = os.path.join(hero_img_dir, 'sohibbal-portrait.jpg')
    print("Asset extraction completed.")

if __name__ == '__main__':
    main()
