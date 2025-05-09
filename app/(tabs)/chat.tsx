import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [audioPermission, setAudioPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      setAudioPermission(audioStatus === "granted");
    })();
  }, []);

  // ✅ Start & Stop Recording
  const handleVoiceRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Voice Note Saved:", uri);
        setRecording(null);
        setIsRecording(false);
        if (timer) clearInterval(timer);
      } else {
        if (!audioPermission) {
          Alert.alert("Permission Denied", "Enable microphone access in settings.");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
        setIsRecording(true);

        // Start Timer
        setRecordingDuration(0);
        const newTimer = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
        setTimer(newTimer);
      }
    } catch (error) {
      console.error("Voice Recording Error:", error);
    }
  };

  // ✅ Delete Recording
  const deleteRecording = () => {
    setRecording(null);
    setIsRecording(false);
    if (timer) clearInterval(timer);
    setRecordingDuration(0);
    console.log("Recording Deleted");
  };

  // ✅ Format Timer (00:00)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      {isRecording ? (
        // ✅ Recording UI (Similar to Your Image)
        <View style={styles.recordingWrapper}>
          <Text style={styles.timer}>{formatTime(recordingDuration)}</Text>
          <View style={styles.progressBar} />
          <TouchableOpacity onPress={deleteRecording}>
            <MaterialIcons name="delete" size={28} color="gray" />
          </TouchableOpacity>
        </View>
      ) : (
        // ✅ Normal Chat Input UI
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="smile-o" size={24} color="#999" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.icon}>
              <MaterialIcons name="attach-file" size={24} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <MaterialIcons name="camera-alt" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Conditional Send or Microphone Button */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#284b63" }]}
        onPress={isRecording ? handleVoiceRecording : message.trim().length > 0 ? () => console.log("Message Sent:", message) : handleVoiceRecording}
      >
        {isRecording ? (
          <Ionicons name="stop" size={24} color="white" />
        ) : message.trim().length > 0 ? (
          <Ionicons name="send" size={24} color="white" />
        ) : (
          <Ionicons name="mic" size={24} color="white" />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f0f5f9",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    padding: 8,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 14,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#d32f2f",
    marginHorizontal: 10,
    borderRadius: 2,
  },
});
