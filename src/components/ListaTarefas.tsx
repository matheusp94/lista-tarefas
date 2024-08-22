import { Ionicons } from '@expo/vector-icons';
import { Box, FlatList, IconButton, Input, Text } from 'native-base';
import React from "react";
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

// Definindo as propriedades que o componente TarefaItem irá receber
interface TarefaItemProps {
    id: number;
    titulo: string;
}

// Componente TarefaItem que renderiza cada item da lista de tarefas
const TarefaItem: React.FC<TarefaItemProps> = ({ id, titulo }) => {
    // Obtendo as funções editarTarefa e excluirTarefa do contexto global
    const { editarTarefa, excluirTarefa } = useEstadoGlobal();

    // Definindo os estados locais para controlar a edição do título da tarefa
    const [editando, setEditando] = React.useState(false);
    const [novoTitulo, setNovoTitulo] = React.useState(titulo);

    // Função para alternar entre o modo de edição e visualização do título da tarefa
    const handleEditar = () => {
        if (editando) {
            editarTarefa(id, novoTitulo); // Chamando a função editarTarefa com o novo título
        }
        setEditando(!editando); // Alternando o estado de edição
    };

    return (
        <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.200"
            p={4}
            my={2}
            mx={2}
            flexDirection="row" // Ajuste do layout para linha
            justifyContent="space-between" // Alinhando os itens à direita
            alignItems="center" // Alinhando os itens verticalmente
            bg="gray.200" // Definindo a cor de fundo como cinza
            p={4} // Adicionando um padding interno de 4
            my={2} // Adicionando uma margem vertical de 2
            mx={2} // Adicionando uma margem horizontal de 2
        >
            {editando ? (
                <Input
                    flex={3}
                    value={novoTitulo}
                    onChangeText={setNovoTitulo}
                />
            ) : (
                <Text flex={3}>{titulo}</Text>
            )}
            <IconButton
                icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#F3FFF9" />}
                colorScheme="light"
                onPress={handleEditar}
                style={{ borderRadius: 50, backgroundColor: '#E56F00', marginLeft: 4 }}
            />
            <IconButton
                icon={<Ionicons name="trash" size={14} color="#F3FFF8" />}
                colorScheme="light"
                onPress={() => excluirTarefa(id)}
                style={{ borderRadius: 50, backgroundColor: 'red', marginLeft: 4 }}
            />
        </Box>
    );
};

// Componente ListaTarefas que exibe a lista de tarefas utilizando um componente FlatList
const ListaTarefas: React.FC = () => {
    const { tarefas } = useEstadoGlobal();

    return (
        <FlatList
            data={tarefas}
            renderItem={({ item }) => <TarefaItem id={item.id} titulo={item.titulo} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
};

export default ListaTarefas;