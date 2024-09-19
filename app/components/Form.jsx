import React, { useState } from "react";
import {
    View,
    TextInput,
    Alert,
    Text,
    TouchableOpacity
} from "react-native";

export default function ContactForm() {
    // Estados para guardar los valores de los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [menssage, setMenssage] = useState('');
    
    // Estados para errores, cargando y envio
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [enableSend, setEnableSend] =  useState(true);

    // Validaciones simples
    const validate = () => {
        let valid = true;
        const newErrors = { name: "", email: "", menssage: ""};

        if (!name) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!email) {
            newErrors.email = "Email is required";
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) { //Validar que seas un correo valido
            newErrors.email = "Enter a valid email";
            valid = false;
        }
        
        if (!menssage) {
            newErrors.menssage = "Menssage is required";
            valid = false
        }

        setErrors(newErrors)
        return valid;
    }

    // Función para manejar el envío del formulario
    const handleSubmit = () => {
        if (validate()) {
        Alert.alert(
            "Success",
            `Name: ${name}, Email: ${email}, menssage: ${menssage}`
        );
    }
  };

  // Define visualización de la app
  return (
    <View>
        <Text>¿Dudas o sugerencias? Contactanos</Text>

        <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}/>
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}/>
        {errors.email ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <TextInput
        placeholder="Menssage"
        value={menssage}
        onChangeText={setMenssage}/>
        {error.menssage ? <Text>{errors.name}</Text> : null }

        {/* Botón para enviar el formulario */}
        <TouchableOpacity onPress={handleSubmit}>
            <Text>Menssage send with success ¡Thanks {name}!</Text>
        </TouchableOpacity>

    </View>
  );
}
