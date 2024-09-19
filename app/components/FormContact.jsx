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

  // Estados para errores, cargando y mensaje de éxito
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

        setSuccessMessage(`Thank you for your message, ${name}!`);
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

      {/* Mostrar el mensaje de éxito */}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
    letterSpacing: 1,
  },
  input: {
    height: 55,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#ff3d00",
    marginBottom: 10,
    fontSize: 14,
    fontStyle: "italic",
  },
  errorInput: {
    borderColor: "#ff3d00",
    borderWidth: 2,
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
  successText: {
    color: "#4caf50",
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
