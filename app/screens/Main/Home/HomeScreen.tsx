import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./Home.Style";
import AuthContext from "../../../context/AuthContext";
import HeaderSection from "../../../testScreen/HeaderSection";
import CategoryFilter from "../../../testScreen/CategoryFilter";
import CommentCard from "../../../testScreen/CommentCard";

// Navigation prop'unun tipi
interface Props {
  navigation: {
    openDrawer: () => void;
  };
}
const fakeComments = [
  {
    id: 1,
    user: {
      name: "Neri Bayat",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    business: "Cafe Coffee",
    date: "2024-12-20",
    rating: 4,
    content: "Kahve çok lezzetliydi, ortam da oldukça samimi.",
    likes: 25,
    replies: [
      {
        id: 1,
        user: {
          name: "Ayşe Demir",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        content: "Katılıyorum, ben de çok memnun kaldım.",
      },
    ],
  },
  // Diğer yorumlar...
  {
    id: 2,
    user: {
      name: "Mehmet Kaya",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    business: "Restoran XYZ",
    date: "2024-11-25",
    rating: 3,
    content: "Yemekler ortalamaydı, servis biraz yavaştı.",
    likes: 10,
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Burcu Ustael",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    business: "Corner Coffee",
    date: "2024-11-25",
    rating: 2,
    content: "Kahve şahane yalnız çay biraz soğuk gelmişti.",
    likes: 17,
    replies: [],
  },
  {
    id: 4,
    user: {
      name: "Zeynep Doğan",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    business: "BirBar ",
    date: "2024-11-25",
    rating: 5,
    content: "Bira soğuk ve hesap çok iyi.",
    likes: 13,
    replies: [],
  },
  {
    id: 5,
    user: {
      name: "Erdal Doğan",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    business: "Van Good Coffee",
    date: "2024-11-25",
    rating: 4,
    content: "Fiyatlara göre kaliteli bir mekandır",
    likes: 33,
    replies: [],
  },
  {
    id: 5,
    user: {
      name: "Ersin Yılmaz",
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    },
    business: "Köşk Bar",
    date: "2024-11-25",
    rating: 5,
    content: "Bira soğuk ve hesap çok iyi.",
    likes: 29,
    replies: [],
  },
];
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  // Yorum ekleme modalinde kullanılacak state'ler
  const [newComment, setNewComment] = useState("");

  // Modalı açma/kapama fonksiyonu
  const toggleCommentModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };
  const handleCommentSubmit = () => {
    // Yeni yorum nesnesi oluştur
    const newCommentItem = {
      id: Date.now(), // veya benzersiz bir ID oluşturma yöntemi
      user: {
        name: "Ben", // Burayı kullanıcı adı ile değiştirmek için AuthContext kullanabilirsiniz
        avatar: "https://example.com/avatar.jpg",
      },
      business: selectedCategory,
      date: new Date().toISOString(),
      rating: 5,
      content: newComment,
      likes: 0,
      replies: [],
    };

    // Yorum listesine ekle
    // setComments([...comments, newCommentItem]);

    // Formu temizle
    setNewComment("");

    // Modalı kapat
    setIsCommentModalVisible(false);
  };
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    console.log("Seçilen kategori:", category); // Listeyi buna göre filtrele
  };

  return (
    <View style={styles.container}>
      <HeaderSection onNearbyPress={() => {}} onSearchPress={() => {}} />
      {/* <CategoryFilter onCategorySelect={handleCategorySelect} /> */}
      <View style={styles.filterAndButtonContainer}>
        <CategoryFilter onCategorySelect={handleCategorySelect} />
        <TouchableOpacity
          onPress={toggleCommentModal}
          style={styles.commentButton}
        >
          <Text style={styles.buttonText}>Yorum Yaz</Text>
        </TouchableOpacity>
        {isCommentModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isCommentModalVisible}
            onRequestClose={toggleCommentModal}
          >
            <View style={styles.modalView}>
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Yorumunuzu yazın..."
                style={styles.textInput}
              />
              <TouchableOpacity onPress={handleCommentSubmit}>
                <Text style={styles.submitButton}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
      <FlatList
        data={fakeComments}
        renderItem={({ item }) => <CommentCard comment={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* <CommentSection selectedCategory={selectedCategory} /> */}
    </View>
  );
};

export default HomeScreen;

{
  /* <TouchableOpacity
onPress={() => navigation.openDrawer()} // Burada menüyü açıyoruz
style={styles.menuButton}
>
<Icon name="menu" size={30} color="yellow" />
</TouchableOpacity> */
}
