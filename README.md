# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# 📱 YummyApplication – Mobile App (React Native + Expo)

---

## 🇹🇷 Uygulama Tanımı / 🇬🇧 App Overview

**🇹🇷 Türkçe:**  
Yummy, aynı işletmeye giden kullanıcıların etkileşim kurabildiği sosyal bir mobil uygulamadır. Kullanıcılar bulundukları mekânlar hakkında yorum yapabilir, anlık durum güncellemeleri paylaşabilir, profil düzenleyebilir ve diğer kullanıcılarla iletişim kurabilir.

**🇬🇧 English:**  
Yummy is a location-based social mobile application that enables users visiting the same place to interact with each other. Users can comment on businesses, share status updates, edit their profiles, and connect with other users in real time.

---

## 📁 🇹🇷 Proje Yapısı / 🇬🇧 Folder Structure

```
app/
├── assets/            # Görsel, ikon, medya dosyaları
├── components/        # Yeniden kullanılabilir bileşenler
├── context/           # Global context yönetimi
├── locales/           # Çoklu dil (i18n) dosyaları
├── models/            # Veri modelleri
├── navigations/       # Navigasyon yapılandırmaları
├── screens/           # Tüm ekranlar
├── services/          # API çağrıları, Firebase işlemleri
├── testScreen/        # Geliştirme/test amaçlı ekranlar
├── utils/             # Yardımcı fonksiyonlar
├── App.js             # Giriş noktası
├── index.tsx          # Uygulama yükleyicisi
```

---

## ⚙️ 🇹🇷 Kullanılan Teknolojiler / 🇬🇧 Tech Stack

| Alan / Layer      | Teknolojiler / Technologies                          |
| ----------------- | ---------------------------------------------------- |
| Framework         | React Native + Expo                                  |
| Dil               | TypeScript                                           |
| Navigasyon        | React Navigation                                     |
| Form Yönetimi     | React Hook Form + Yup                                |
| HTTP              | Axios + Backend API entegrasyonu                     |
| Çoklu Dil Desteği | i18n + AsyncStorage cache                            |
| Auth              | Firebase Authentication (Google + Apple Login)       |
| Depolama          | Google Cloud Storage (profil/fotoğraf yükleme)       |
| Durum Yönetimi    | Context API                                          |
| Görsel Seçici     | Expo ImagePicker                                     |
| Profil Yönetimi   | Kullanıcı bilgilerinin düzenlenmesi ve güncellenmesi |

---

## ✨ 🇹🇷 Temel Özellikler / 🇬🇧 Key Features

- 🔐 Google & Apple ile oturum açma (Firebase üzerinden)
- 🌐 Çoklu dil desteği (i18n ile dinamik çeviri)
- 🧑‍💼 Profil görüntüleme ve güncelleme
- 🖼️ Profil fotoğrafı yükleme (Google Cloud ile entegre)
- 💬 Aynı işletmeye giden kullanıcılarla etkileşim
- 📥 Backend API ile tam senkronizasyon
- 🌓 Tema seçimi (light/dark mode)
- 🔔 Gerçek zamanlı bildirim altyapısı (Firebase FCM)

---

## 🚀 🇹🇷 Kurulum / 🇬🇧 Installation

### Gerekli Bağımlılıklar / Prerequisites:

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Firebase projesi (Auth yapılandırılmış)
- Backend API (hazır ve çalışır durumda)

### Kurulum Adımları / Setup Steps:

```bash
1. Projeyi klonla:
   git clone https://github.com/kullanici/yummy-mobile.git

2. Klasöre geç:
   cd yummy-mobile

3. Paketleri yükle:
   npm install

4. Ortam değişkenlerini ayarla (expo-env.d dosyası)

5. Uygulamayı başlat:
   npx expo start
```

> Uygulama Android/iOS cihazlarda Expo Go uygulaması ile test edilebilir.

---

## 🤝 🇹🇷 Katkı ve Geri Bildirim / 🇬🇧 Contributing

**🇹🇷** Uygulamanın gelişimine katkı sağlamak isterseniz, yeni özellik önerileri için `issue` açabilir veya `pull request` gönderebilirsiniz.  
**🇬🇧** If you'd like to contribute, feel free to open an issue or submit a pull request with your feature ideas or improvements.

---

## 📄 🇹🇷 Lisans / 🇬🇧 License

**🇹🇷** Bu proje açık kaynak değildir. Tüm hakları saklıdır.  
**🇬🇧** This project is not open-source. All rights reserved.
