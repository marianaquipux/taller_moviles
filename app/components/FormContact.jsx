import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function FormContact() {
  // Estados para guardar los valores de los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Estados para errores, cargando y habilitación del botón de envío
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Validaciones simples
  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Validar que sea un correo válido
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (!message) {
      newErrors.message = "Message is required.";
      valid = false;
    } else if (message.length < 10) { // Validar la longitud del mensaje
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", `Thank you for your message, ${name}!`);
        // Limpiar los campos del formulario
        setName('');
        setEmail('');
        setMessage('');
      }, 2000); // Simula un envío que dura 2 segundos
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questions or comments? Contact us</Text>

      <TextInput
        style={[styles.input, errors.name ? styles.errorInput : null]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, errors.email ? styles.errorInput : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.message ? styles.errorInput : null]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}

      {/* Mostrar el spinner o el botón de enviar */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
