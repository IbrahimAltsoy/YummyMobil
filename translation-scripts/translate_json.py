import json
import os
import re
import asyncio
import aiofiles
from googletrans import Translator

# 📌 **Google Translate API kullanımı**
translator = Translator()

# 📌 **Dosya yolları**
base_path = "D:/Projelerim/Dotnet/yummyApp/yummyApplication/yummyApp/app/locales"
tr_json_path = os.path.join(base_path, "tr.json")
en_json_path = os.path.join(base_path, "en.json")

# 📌 **Proje dosyalarının olduğu klasör**
project_path = "D:/Projelerim/Dotnet/yummyApp/yummyApplication/yummyApp/app"

# 📌 **Dosyaları oku veya oluştur**
def load_json(file_path):
    if not os.path.exists(file_path):
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump({}, f, ensure_ascii=False, indent=2)
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

tr_data = load_json(tr_json_path)
en_data = load_json(en_json_path)

# 📌 **React Native proje dosyalarını tara ve eksik çevirileri bul**
pattern = re.compile(r't\("([^"]+)"\)')
found_keys = set(tr_data.keys())
new_keys = set()

# 📌 **Tüm JavaScript/TypeScript dosyalarını tara ve stringleri bul**
def extract_strings_from_code():
    extracted_strings = set()
    for root, dirs, files in os.walk(project_path):
        for file in files:
            if file.endswith(".js") or file.endswith(".jsx") or file.endswith(".tsx"):
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    content = f.read()
                    # `t("...")` içindeki metinleri yakala
                    matches = pattern.findall(content)
                    extracted_strings.update(matches)
                    # Tüm string sabitlerini yakalamak için basit regex
                    other_strings = re.findall(r'"(.*?)"', content)
                    extracted_strings.update(other_strings)
    return extracted_strings

extracted_strings = extract_strings_from_code()

for key in extracted_strings:
    if key not in found_keys:
        tr_data[key] = key.replace("_", " ").capitalize()
        new_keys.add(key)

# 📌 **Güncellenmiş `tr.json` dosyasını kaydet**
with open(tr_json_path, "w", encoding="utf-8") as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)

print(f"✅ {len(new_keys)} yeni kelime `tr.json` dosyasına eklendi!")

# 📌 **Google Translate API ile çeviri yapan fonksiyon**
async def translate_with_google(text, src_lang="tr", dest_lang="en"):
    try:
        translation = translator.translate(text, src=src_lang, dest=dest_lang).text
        print(f"✅ Çeviri başarılı: {text} -> {translation}")
        return translation
    except Exception as e:
        print(f"⚠️ Çeviri hatası ({text}): {e}")
        return None

# 📌 **Asenkron olarak tüm çevirileri yap**
async def translate_all():
    tasks = []
    keys_to_translate = [key for key in tr_data.keys() if key not in en_data or en_data[key] == key]
    
    if not keys_to_translate:
        print("✅ Tüm çeviriler zaten tamamlandı!")
        return
    
    for key in keys_to_translate:
        tasks.append(translate_with_google(tr_data[key], src_lang="tr", dest_lang="en"))
    
    results = await asyncio.gather(*tasks)
    
    for i, key in enumerate(keys_to_translate):
        if results[i] is not None:  # Eğer çeviri başarılıysa kaydet
            en_data[key] = results[i]
    
    async with aiofiles.open(en_json_path, "w", encoding="utf-8") as f:
        await f.write(json.dumps(en_data, ensure_ascii=False, indent=2))
    
    print(f"✅ `{len(keys_to_translate)}` kelime İngilizceye çevrildi ve `en.json` dosyasına kaydedildi!")

# 📌 **Ana fonksiyonu çalıştır**
if __name__ == "__main__":
    asyncio.run(translate_all())
