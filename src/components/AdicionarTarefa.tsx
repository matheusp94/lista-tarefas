import React, { useState } from "react";
import { View, Input, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

const AdicionarTarefa: React.FC = () => {
    // Utiliza o hook useEstadoGlobal para acessar as funções do contexto global de estado
    const { adicionarTarefa } = useEstadoGlobal();
    // Define um estado local para armazenar o valor da nova tarefa
    const [novaTarefa, setNovaTarefa] = useState("");

    // Função chamada ao clicar no botão de adicionar tarefa
    const handleAdicionarTarefa = () => {
        // Verifica se o campo de nova tarefa não está vazio
        if (novaTarefa.trim() !== "") {
            // Chama a função adicionarTarefa do contexto global de estado para adicionar a nova tarefa
            adicionarTarefa(novaTarefa);
            // Limpa o campo de nova tarefa após adicionar a tarefa
            setNovaTarefa("");
        }
    };

    return (
        <View style={{ backgroundColor: '#6EE9AC', paddingVertical: 20, paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    {/* Campo de entrada para o usuário digitar o título da nova tarefa */}
                    <Input
                        placeholder="Add a task"
                        placeholderTextColor="white"
                        value={novaTarefa}
                        onChangeText={setNovaTarefa}
                        fontSize={14}
                        color="white"
                    />
                </View>
                {/* Botão de adicionar tarefa */}
                <IconButton
                    icon={<Ionicons name="add" size={24} color="#F3FFF9" />}
                    colorScheme="light"
                    onPress={handleAdicionarTarefa}
                    style={{ borderRadius: 50, backgroundColor: '#E56F00' }}
                />
            </View>
        </View>
    );
};

export default AdicionarTarefa;